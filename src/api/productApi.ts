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

////////////////////////////////////////////////////////////////////
//1. 프로덕트 생성
//2. product_id 생성 되면 -> 사이즈 생성
//3. product_id 생성 되면 -> 스토리지 옮기고 프로덕트 이미지 테이블 생성

const uploadProduct = async (productRequestData: UploadProductRequest) => {
  // 현재 로그인된 사용자 정보 가져오기
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();
  if (userError) throw userError;

  if (!user) throw new Error("인증되지 않은 사용자 입니다.");
  const authId = user.id;

  /////////////////////////////////////////////////////////

  const {
    brand_id,
    category_id: categoryName,
    color,
    description,
    name,
    price,
    sizes,
    product_images,
  } = productRequestData;

  /////////////////////////////////////////////////////////////
  //0. 카테고리 아이디 가져오기
  const { data: categoryData, error: categoryError } = await supabase
    .from("categories")
    .select("id")
    .eq("name", `${categoryName}`)
    .single();

  if (categoryError) throw categoryError;
  const category_id = categoryData.id;
  //1. 프로덕트 생성
  const { data: productData, error } = await supabase
    .from("products")
    .insert({ brand_id, category_id, color, description, name, price })
    .select()
    .single();
  //기본적으로 수버페이스는 모든 행 배열로 반환하기 때문에 단일 객체로 받기 위해 single()

  if (error) throw error;

  /////////////////////////////////////////////////////////////
  //2. product_id 생성 되면 -> 사이즈 생성 병렬 처리
  const product_id = productData.id;

  //사이즈 업로드 함수
  const uploadProductSizes = async (
    size: InsertSizesRequired,
    product_id: string
  ) => {
    const { error } = await supabase
      .from("product_sizes")
      .insert({
        size: size.size,
        stock_quantity: size.stock_quantity,
        product_id,
      })
      .select();

    if (error) throw error;
    return;
  };

  //병렬 처리
  const uploadSizesPromises = sizes.map(async (size: InsertSizesRequired) => {
    uploadProductSizes(size, product_id);
  });

  await Promise.all(uploadSizesPromises);

  //////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////
  //3. product_id 생성 되면 -> 스토리지 옮기고 프로덕트 이미지 테이블 생성
  //스토리지 옮기기
  const moveFileToProductImgFolder = async (index: number) => {
    const { error: imageMoveError } = await supabase.storage
      .from("images")
      .move(
        `${authId}/temporary/product_img_${index}`,
        `${authId}/product_imgs/${product_id}/product_img_${index}`
      );

    if (imageMoveError) throw imageMoveError;

    ///////////////////////////////////////////////////////////////////////
    // storage bucket에서 삭제
    // const { error: imageRemoveError } = await supabase.storage
    //   .from("images")
    //   .remove([`${authId}/temporary/product_img_${index}`]);
    // if (imageRemoveError) throw imageRemoveError;

    ///////////////////////////////////////////////////////////////////////
  };

  const moveFileToProductImgFolderPromises = product_images.map(
    async (_, index) => {
      moveFileToProductImgFolder(index);
    }
  );

  await Promise.all(moveFileToProductImgFolderPromises);

  ///////////////////////////////////////////////////////////////////////

  //이미지 테이블 생성
  const uploadProductImage = async (product_id: string, index: number) => {
    //🌈 퍼블릭 url 얻기
    const { data } = await supabase.storage
      .from("images")
      .getPublicUrl(
        `${authId}/product_imgs/${product_id}/product_img_${index}`
      );

    const image_url = data.publicUrl;

    // 이미지 테이블 생성
    const { error } = await supabase
      .from("product_images")
      .insert({ product_id, image_url });
    if (error) throw error;
  };

  //이미지 테이블 생성하기 => 병렬 처리
  const uploadProductImagesPromises = product_images.map(async (_, index) => {
    uploadProductImage(product_id, index);
  });

  await Promise.all(uploadProductImagesPromises);

  ///////////////////////////////////////////////////////////////////////
  //다 되면 프로덕트 데이터 반환
  return productData;
};

///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////

export const useUploadProduct = () => {
  const queryClient = useQueryClient();

  const { errorMessage, setErrorMessage } = useFormError();

  const {
    mutate: mutateUploadProduct,
    isPending: isPendingProduct,
    isError,
    isSuccess: isSuccessProduct,
    data: responseProductData,
  } = useMutation({
    mutationFn: uploadProduct,
    onSuccess: (data) => {
      console.log("onSuccess:", data);
      queryClient.invalidateQueries({ queryKey: ["products"] });
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
    mutateUploadProduct,
    isError,
    isPendingProduct,
    isSuccessProduct,
    responseProductData,
    errorMessage,
  };
};
