import { getIsDeleteUser } from "@/api/userApi";
import { toast } from "@/hooks/use-toast";
import supabase from "@/shared/supabaseClient";
import { LoginUserRequest } from "@/types/auth.types";
import { Enums } from "@/types/database.types";
import { Provider, Session, User, WeakPassword } from "@supabase/supabase-js";
import { createContext, useState, useEffect } from "react";

interface AuthContextProps {
  session: Session | null;
  authId: string | undefined;
  isLoggedIn: boolean;
  isSessionLoading: boolean;
  userRole: Enums<"user_role"> | null;
  loginWithSocial: (
    provider: Provider
  ) => Promise<{ provider: Provider; url: string }>;
  loginWithEmail: (
    loginData: LoginUserRequest
  ) => Promise<{ user: User; session: Session; weakPassword?: WeakPassword }>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextProps | undefined>(
  undefined
);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [session, setSession] = useState<Session | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSessionLoading, setIsSessionLoading] = useState(true);
  const [userRole, setUserRole] = useState<Enums<"user_role"> | null>(null);

  useEffect(() => {
    // 페이지 새로고침 시 현재 세션 초기화시켜서 정보 안날아가게 하기
    setIsSessionLoading(true);
    const initSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession(); //로컬스토리지에 있는 세션객체
      setSession(session ?? null);
      setUserRole(session?.user.user_metadata.role);
      setIsSessionLoading(false);
    };

    initSession();

    //세션 변경 감지 및 세션 상태 업데이트
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_OUT") {
        setSession(null);
        setIsLoggedIn(false);
        setUserRole(null); // 로그아웃 시 userRole도 null로 설정
      } else if (event === "SIGNED_IN") {
        setSession(session);
        setIsLoggedIn(true);
        setUserRole(session?.user.user_metadata.role); // 로그인 시 userRole 설정
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  //소셜 로그인
  const loginWithSocial = async (provider: Provider) => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: provider,
      options: {
        queryParams: {
          access_type: "offline",
          prompt: "consent",
        },
      },
    });

    if (error) throw error;

    return data;
  };

  // 이메일 로그인
  const loginWithEmail = async (loginData: LoginUserRequest) => {
    const { email, password } = loginData;

    try {
      const { is_active } = await getIsDeleteUser(email);

      //탈퇴한 회원
      if (!is_active) throw new Error(`입력하신 정보가 올바르지 않습니다.`);

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      //비밀번호 틀림
      if (error) throw new Error(`입력하신 정보가 올바르지 않습니다.`);

      return data;
    } catch (error) {
      const err = error as Error;
      toast({
        title: "로그인 실패",
        description: `${err.message}`,
        variant: "destructive",
      });

      return Promise.reject(err);
    }
  };

  //로그아웃
  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  };

  const authId = session?.user.id;

  return (
    <AuthContext.Provider
      value={{
        session,
        authId,
        isLoggedIn,
        isSessionLoading,
        userRole,
        loginWithSocial,
        loginWithEmail,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
