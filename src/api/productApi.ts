import useFormError from "@/hooks/useFormError";
import supabase from "@/shared/supabaseClient";
import {
  InsertSizesRequired,
  UploadProductRequest,
} from "@/types/product.types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const uploadProductImages = async (files: File[]) => {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();
  if (userError) throw userError;
  if (!user) throw new Error("인증되지 않은 사용자 입니다.");

  //스토리지에 올리기
  const userId = user?.id;

  //파일 업로드 병렬 처리 함수
  const uploadPromises = files.map(async (file, index) => {
    const fileName = `product_img_${index}`;
    const filePath = `${userId}/temporary/${fileName}`;

    const { data: uploadFile, error: uploadError } = await supabase.storage
      .from("images")
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: true,
      });

    if (uploadError) {
      throw uploadError;
    }

    // console.log(uploadFile);
    //스토리지에서 public url 가져오기
    const { data } = await supabase.storage
      .from("images")
      .getPublicUrl(uploadFile.path);
    return data.publicUrl;
  });

  //병렬처리
  try {
    const imageUrls = await Promise.all(uploadPromises);
    return imageUrls; //업로드된 모든 파일의 public url 배열로 반환
  } catch (error) {
    throw new Error(`${error}: 파일을 업로드하는 중 오류가 발생했습니다.`);
  }
};

export const useUploadProductImages = () => {
  const queryClient = useQueryClient();

  const { errorMessage, setErrorMessage } = useFormError();

  const {
    mutate: mutateUploadProductImages,
    isPending: isPendingProductImages,
    isError,
    isSuccess: isSuccessProductImages,
    data: responseProductImagesUrl,
  } = useMutation({
    mutationFn: uploadProductImages,
    onSuccess: (data) => {
      if (data) {
        console.log("onSuccess:", data);
        queryClient.invalidateQueries({ queryKey: ["products"] });
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
    mutateUploadProductImages,
    isError,
    isPendingProductImages,
    isSuccessProductImages,
    responseProductImagesUrl,
    errorMessage,
  };
};