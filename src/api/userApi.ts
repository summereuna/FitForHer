import supabase from "@/shared/supabaseClient";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

//타입
import { SignupUsersRequest } from "@/types/user.types";
import { AuthApiError } from "@supabase/supabase-js";
import useFormError from "@/hooks/useFormError";
import { toast } from "@/hooks/use-toast";

//사용자 인증
export const getAuthUser = async () => {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) throw new Error("사용자 정보를 가져올 수 없습니다.");
  if (!user) throw new Error("인증되지 않은 사용자 입니다.");

  return user;
};

const signupFunction = async (newUser: SignupUsersRequest) => {
  const { email, password, name, role, social_type } = newUser;

  // 사용자 등록 및 메타데이터 전송
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { name, role, social_type }, // 사용자 메타데이터에 추가 정보 포함
    },
  });

  if (error) throw error;

  return data;
};

//회원가입
export const useCreateUser = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { errorMessage, setErrorMessage } = useFormError();

  const {
    mutate: mutateCreateUser,
    isPending,
    isError,
    isSuccess,
  } = useMutation({
    mutationFn: signupFunction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      navigate("/login");
    },
    onError: (error: AuthApiError) => {
      switch (error.code) {
        case "user_already_exists":
          setErrorMessage("이미 가입한 사용자입니다.");
          break;
        case "weak_password":
          setErrorMessage("비밀번호가 너무 약합니다.");
          break;
        default:
          setErrorMessage("회원가입에 실패했습니다. 다시 시도해 주세요.");
          break;
      }
      return errorMessage;
    },
  });

  return {
    mutateCreateUser,
    isError,
    isPending,
    isSuccess,
    errorMessage,
  };
};

//----------------------------------------------------------------------------------------------------
const logicalRemoveUser = async (userId: string) => {
  //const { data, error } = await supabase.auth.admin.deleteUser(userId);

  //회원 탈퇴시 논리적 삭제만
  const { error } = await supabase
    .from("users")
    .update({ is_active: false })
    .eq("id", userId);

  if (error)
    throw new Error(
      `회원 탈퇴 중 오류가 발생했습니다, 다시 시도해 보세요. 같은 문제가 계속 될 경우 관리자에게 문의해 주세요.`
    );

  const { error: signOutError } = await supabase.auth.signOut();
  if (signOutError)
    throw new Error(
      `회원 탈퇴 중 오류가 발생했습니다, 다시 시도해 보세요. 같은 문제가 계속 될 경우 관리자에게 문의해 주세요.`
    );
};

export const useDeleteUser = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    mutate: mutateDeleteUser,
    isPending,
    isError,
    isSuccess,
  } = useMutation({
    mutationFn: logicalRemoveUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] }); // 전체 사용자 쿼리 무효화
      navigate("/", { replace: true }); //히스토리 스택 대체
      queryClient.clear(); //상태 초기화

      toast({
        title: "회원 탈퇴 성공",
        description: `언제든 돌아오세요!`,
      });
    },
    onError: (error) => {
      toast({
        title: "회원 탈퇴 중 문제 발생",
        description: `${error.message}`,
        variant: "destructive",
      });
    },
    retry: 0, //한번만 실행
  });

  return { mutateDeleteUser, isError, isPending, isSuccess };
};

//논리적 탈퇴한 회원인지 조회
export const getIsDeleteUser = async (email: string) => {
  //회원 탈퇴시 논리적 삭제만
  const { data, error } = await supabase
    .from("users")
    .select("is_active")
    .eq("email", email)
    .single();

  //계정 없음
  if (!data) throw new Error(`입력하신 정보가 올바르지 않습니다.`);

  if (error)
    throw new Error(
      `회원을 조회하는 중 오류가 발생했습니다. 관리자에게 문의하세요.`
    );

  return data;
};
