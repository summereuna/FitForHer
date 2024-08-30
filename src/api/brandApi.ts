import useFormError from "@/hooks/useFormError";
import supabase from "@/shared/supabaseClient";
import {
  BrandRegistrationRequest,
  BrandUpdateRequest,
} from "@/types/brand.types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const createBrands = async (newBrandData: BrandRegistrationRequest) => {
  const { name } = newBrandData;

  // 현재 로그인된 사용자 정보 가져오기
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) throw userError;

  if (!user) throw new Error("인증되지 않은 사용자 입니다.");

  const { data, error } = await supabase
    .from("brands")
    .insert({ name, seller_id: user.id })
    .select();

  if (error) throw error;
  return data;
};

export const useCreateBrand = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { errorMessage, setErrorMessage } = useFormError();

  const {
    mutate: mutateCreateBrand,
    isPending,
    isError,
    isSuccess,
  } = useMutation({
    mutationFn: createBrands,
    onSuccess: ({ id, name }) => {
      queryClient.invalidateQueries({ queryKey: ["brands"] });

      if (id) {
        navigate("/dashboard/setting");
      }
    },
    onError: (error) => {
      console.log(error);
      // switch (error.code) {
      //   case "user_already_exists":
      //     setErrorMessage("이미 가입한 사용자입니다.");
      //     break;
      //   case "weak_password":
      //     setErrorMessage("비밀번호가 너무 약합니다.");
      //     break;
      //   default:
      //     setErrorMessage("회원가입에 실패했습니다. 다시 시도해 주세요.");
      //     break;
      // }
      // return errorMessage;
    },
  });

  return {
    mutateCreateBrand,
    isError,
    isPending,
    isSuccess,
    errorMessage,
  };
};

//select brands to public
const getBrandBySellerId = async (seller_id: string) => {
  const { data, error } = await supabase
    .from("brands")
    .select("*")
    .eq("seller_id", seller_id)
    .maybeSingle();
  if (error) throw error;

  return data;
};

export const useBrand = (seller_id: string) => {
  const {
    data: brandData,
    isPending,
    isError,
    isSuccess,
  } = useQuery({
    queryKey: ["brands"],
    queryFn: () => getBrandBySellerId(seller_id),
    enabled: !!seller_id, // id가 있을 때만 쿼리를 실행
    staleTime: Infinity, // fresh 유지
  });

  return { brandData, isPending, isError, isSuccess };
};

const updateBrands = async (updatedBrandData: BrandUpdateRequest) => {
  // 인증
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) throw userError;
  if (!user) throw new Error("인증되지 않은 사용자 입니다.");

  const { data, error } = await supabase
    .from("brands")
    .update(updatedBrandData)
    .eq("id", updatedBrandData.id)
    .select("*");

  if (error) throw error;
  return data;
};

export const useUpdateBrand = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { errorMessage, setErrorMessage } = useFormError();

  const {
    mutate: mutateUpdateBrand,
    isPending,
    isError,
    isSuccess,
  } = useMutation({
    mutationFn: updateBrands,
    onSuccess: (data) => {
      if (data) {
        console.log("✅", data);
        queryClient.invalidateQueries({ queryKey: ["brands"] });

        navigate("/dashboard/setting");
      }
    },
    onError: (error) => {
      console.log(error);
      // switch (error.code) {
      //   case "user_already_exists":
      //     setErrorMessage("이미 가입한 사용자입니다.");
      //     break;
      //   case "weak_password":
      //     setErrorMessage("비밀번호가 너무 약합니다.");
      //     break;
      //   default:
      //     setErrorMessage("회원가입에 실패했습니다. 다시 시도해 주세요.");
      //     break;
      // }
      // return errorMessage;
    },
  });

  return {
    mutateUpdateBrand,
    isError,
    isPending,
    isSuccess,
    errorMessage,
  };
};

const upsertBrandLogo = async (file: File) => {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) throw userError;

  if (!user) throw new Error("인증되지 않은 사용자 입니다.");

  //스토리지에 올리기
  // const brandId = brandData.id;
  const userId = user?.id;
  const fileName = "logo";
  const filePath = `${userId}/${fileName}`;

  const { data: uploadFile, error: uploadError } = await supabase.storage
    .from("images")
    .upload(filePath, file, {
      cacheControl: "3600", //스토리지 쪽 캐시 삭제해줘야 파일 리플레이스 싱크 맞음
      upsert: true,
    });

  if (uploadError) {
    throw uploadError;
  } else if (uploadFile) {
    //스토리지에서 url 가져오기
    const { data } = await supabase.storage
      .from("images")
      .getPublicUrl(uploadFile.path);

    const logo_url = `${data.publicUrl}?t=${new Date().getTime()}`; // 캐시 무효화용 타임스탬프 추가
    return logo_url;
  }
};

export const useUploadBrandLogo = () => {
  const queryClient = useQueryClient();

  const { errorMessage, setErrorMessage } = useFormError();

  const {
    mutate: mutateUploadBrandLogo,
    isPending: isPendingBrandLogo,
    isError,
    isSuccess: isSuccessBrandLogo,
    data: responseBrandLogoUrl,
  } = useMutation({
    mutationFn: upsertBrandLogo,
    onSuccess: (data) => {
      if (data) {
        queryClient.invalidateQueries({ queryKey: ["brands"] });
      }
    },
    onError: (error) => {
      console.log(error);
      // switch (error.code) {
      //   case "user_already_exists":
      //     setErrorMessage("이미 가입한 사용자입니다.");
      //     break;
      //   case "weak_password":
      //     setErrorMessage("비밀번호가 너무 약합니다.");
      //     break;
      //   default:
      //     setErrorMessage("회원가입에 실패했습니다. 다시 시도해 주세요.");
      //     break;
      // }
      // return errorMessage;
    },
  });

  return {
    mutateUploadBrandLogo,
    isError,
    isPendingBrandLogo,
    isSuccessBrandLogo,
    responseBrandLogoUrl,
    errorMessage,
  };
};
