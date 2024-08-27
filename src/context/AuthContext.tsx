import supabase from "@/shared/supabaseClient";
import { LoginUserRequest } from "@/types/auth.types";
import { Provider, Session, User, WeakPassword } from "@supabase/supabase-js";
import { createContext, useState, useEffect } from "react";

interface AuthContextProps {
  session: Session | null;
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

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_OUT") {
        setSession(null);
      } else if (session) {
        setSession(session);
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

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;

    return data;
  };

  //로그아웃
  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  };

  // // 에러 메시지 커스터마이징 함수
  // const getCustomErrorMessage = (error: AuthApiError): string => {
  //   // Supabase 에러 코드에 따라 커스텀 메시지 설정
  //   switch (error.code) {
  //     case "400":
  //       return "잘못된 로그인 정보입니다.";
  //     case "401":
  //       return "로그인 인증에 실패했습니다.";
  //     case "429":
  //       return "로그인 시도가 너무 많습니다. 잠시 후 다시 시도해 주세요.";
  //     // 기타 에러 코드에 대한 메시지 설정
  //     default:
  //       return "로그인 중 문제가 발생했습니다. 나중에 다시 시도해 주세요.";
  //   }
  // };
  return (
    <AuthContext.Provider
      value={{ session, loginWithSocial, loginWithEmail, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
