import supabase from "@/shared/supabaseClient";
import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

//타입
import { SignupUsersRequest } from "@/types/user.types";
import { AuthApiError } from "@supabase/supabase-js";
import useFormError from "@/hooks/useFormError";

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

  if (error) {
    throw error;
  }

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
    onSuccess: (data) => {
      console.log(data);
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

// export const useDeleteUser = () => {
//   const navigate = useNavigate();
//   const queryClient = useQueryClient();

//   const {
//     mutate: mutateDeleteUser,
//     isPending,
//     isError,
//     isSuccess,
//   } = useMutation({
//     mutationFn: async () => {
//       //회원 탈퇴시 보통은 myId 넣는데 이미 설정되어 있다고 하니 프론트에선 할 필요 없음
//       const response = await api.delete(`users`);
//       return response.data;
//     },
//     onSuccess: ({ message }) => {
//       if (message === "User deleted successfully") {
//         queryClient.invalidateQueries({ queryKey: ["users"] }); // 전체 사용자 쿼리 무효화
//         queryClient.invalidateQueries({ queryKey: ["auth"] }); // 로그인한 사용자 정보 쿼리 무효화
//         localStorage.removeItem("isLoggedIn"); //로그아웃에서 이미 처리
//         console.log("로컬스토리지 삭제");
//         navigate("/", { replace: true }); //히스토리 스택 대체
//         queryClient.clear(); //상태 초기화
//       }
//     },
//     onError: (error: AxiosError) => {
//       return error;
//     },
//     retry: 0, //한번만 실행
//   });

//   return { mutateDeleteUser, isError, isPending, isSuccess };
// };

// ////////////////////////////////////////////////////////////
// //회원 수정
// export const useUpdateUser = () => {
//   const navigate = useNavigate();
//   const queryClient = useQueryClient();

//   const {
//     mutate: mutateUpdateUser,
//     isPending,
//     isError,
//     isSuccess,
//   } = useMutation({
//     mutationFn: async (updateUser) => {
//       const response = await api.put(`users`, updateUser, {
//         //   headers: {
//         //     "Content-Type": "multipart/form-data",
//         //   },
//       });
//       return response.data;
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["users"] }); //전체 보드
//       queryClient.invalidateQueries({ queryKey: ["auth"] }); // 로그인한 사용자 정보 쿼리 무효화
//       navigate(`/my`, { replace: true }); //히스토리 스택 대체
//     },
//     onError: (error: AxiosError) => {
//       return error;
//     },
//   });

//   return { mutateUpdateUser, isError, isPending, isSuccess };
// };

// //////////////////////////////////////////////////////////////////////

// export interface UserProfile {
//   id: number;
//   email: string;
//   name: string;
// }

// export interface UseMeResponse {
//   me: UserProfile | undefined;
//   isPending: boolean;
//   isError: boolean;
//   isSuccess: boolean;
// }

// //로그인한 사용자 정보
// export const useMe = (isLoggedIn: boolean): UseMeResponse => {
//   const {
//     data: me,
//     isPending,
//     isError,
//     isSuccess,
//   } = useQuery({
//     queryKey: ["auth"], //로그인, 로그아웃이랑 같은 키
//     queryFn: async () => {
//       const response = await api.get("users/me");
//       return response.data;
//     },
//     enabled: isLoggedIn, // 로그인 상태일 때만 쿼리를 활성화
//     staleTime: 1000 * 60 * 60, // 1시간 동안 데이터를 신선하게 유지
//     gcTime: 1000 * 60 * 60 * 24, // 24시간 동안 캐시에 데이터 유지
//   });

//   return { me, isPending, isError, isSuccess };
// };
