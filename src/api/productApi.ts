// import useFormError from "@/hooks/useFormError";
import supabase from "@/shared/supabaseClient";
import {
  BrandProductByIdQueryRelations,
  BrandProductsWithRelations,
  InsertSizesRequired,
  UpdateProductRequest,
  UploadProductRequest,
} from "@/types/product.types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { getAuthUser } from "@/api/userApi";
import { toast } from "@/hooks/use-toast";

const uploadProductImages = async (files: File[]) => {
  const user = await getAuthUser();
  const userId = user?.id;

  //스토리지에 올리기
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

    if (uploadError)
      throw new Error(`파일을 업로드하는 중 오류가 발생했습니다.`);

    //스토리지에서 public url 가져오기
    const { data } = await supabase.storage
      .from("images")
      .getPublicUrl(uploadFile.path);

    const publicUrl = data.publicUrl;
    return publicUrl;
  });

  //병렬처리
  try {
    const imageUrls = await Promise.all(uploadPromises);
    return imageUrls; //업로드된 모든 파일의 public url 배열로 반환
  } catch (error) {
    if (error) throw new Error(`파일을 업로드하는 중 오류가 발생했습니다.`);
  }
};

export const useUploadProductImages = () => {
  const queryClient = useQueryClient();

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
        queryClient.invalidateQueries({ queryKey: ["products"] });
      }
    },
    onError: (error) => {
      toast({
        title: "파일 업로드 중 문제 발생",
        description: `${error.message}`,
        variant: "destructive",
      });
    },
  });

  return {
    mutateUploadProductImages,
    isError,
    isPendingProductImages,
    isSuccessProductImages,
    responseProductImagesUrl,
    // errorMessage,
  };
};

////////////////////////////////////////////////////////////////////
//1. 프로덕트 생성
//2. product_id 생성 되면 -> 사이즈 생성
//3. product_id 생성 되면 -> 스토리지 옮기고 프로덕트 이미지 테이블 생성

const uploadProduct = async (productRequestData: UploadProductRequest) => {
  const user = await getAuthUser();
  const authId = user.id;

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

  //0. 카테고리 아이디 가져오기
  const { data: categoryData, error: categoryError } = await supabase
    .from("sub_categories")
    .select("id")
    .eq("name", `${categoryName}`)
    .single();

  if (categoryError)
    throw new Error(
      `상품을 등록하는 중 카테고리 조회 오류가 발생했습니다. 관리자에게 문의해 주세요.`
    );
  const category_id = categoryData.id;

  //1. 프로덕트 생성
  const { data: productData, error } = await supabase
    .from("products")
    .insert({ brand_id, category_id, color, description, name, price })
    .select()
    .single();
  //기본적으로 수버페이스는 모든 행 배열로 반환하기 때문에 단일 객체로 받기 위해 single()

  if (error)
    throw new Error(
      `상품을 등록하는 중 오류가 발생했습니다. 관리자에게 문의해 주세요.`
    );

  /////////////////////////////////////////////////////////////
  //2. product_id 생성 되면 -> 사이즈 생성 병렬 처리
  const product_id = productData.id;

  //사이즈 업로드 함수
  const uploadProductSizes = async (
    size: InsertSizesRequired,
    product_id: string
  ) => {
    const { error } = await supabase.from("product_sizes").insert({
      size: size.size,
      stock_quantity: size.stock_quantity,
      product_id,
    });

    if (error)
      throw new Error(
        `상품을 등록하는 중 사이즈 및 재고 업로드 오류가 발생했습니다. 관리자에게 문의해 주세요.`
      );
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

    if (imageMoveError)
      throw new Error(
        `상품을 등록하는 중 상품 사진 업로드 오류가 발생했습니다. 관리자에게 문의해 주세요.`
      );
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
    if (error)
      throw new Error(
        `상품을 등록하는 중 상품 사진 업로드 오류가 발생했습니다. 관리자에게 문의해 주세요.`
      );
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
  const navigate = useNavigate();

  const {
    mutate: mutateUploadProduct,
    isPending: isPendingProduct,
    isError,
    isSuccess: isSuccessProduct,
    data: responseProductData,
  } = useMutation({
    mutationFn: uploadProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      navigate("/dashboard/product");
    },
    onError: (error) => {
      toast({
        title: "상품 등록 중 문제 발생",
        description: `${error.message}`,
        variant: "destructive",
      });
    },
  });

  return {
    mutateUploadProduct,
    isError,
    isPendingProduct,
    isSuccessProduct,
    responseProductData,
    // errorMessage,
  };
};

//---------------------------------------------------------------------------------
//셀러 상품 조회
const getBrandProducts = async (
  seller_id: string
): Promise<BrandProductsWithRelations> => {
  await getAuthUser();

  //seller_id 가 작성한 것만 가져오기
  const { data, error } = await supabase
    .from("products")
    .select(
      `*,
      product_sizes( size, stock_quantity ),
      product_images( image_url ),
      sub_categories (
        *,
        categories (
          name
        )
      )`
    )
    .eq("seller_id", seller_id)
    .order("created_at", { ascending: false });

  if (error) throw error;

  return data;
};

export const useBrandProducts = (seller_id: string) => {
  const {
    data: brandProductsData,
    isPending,
    isError,
    isSuccess,
  } = useQuery({
    queryKey: ["products"],
    queryFn: () => getBrandProducts(seller_id),
    enabled: !!seller_id, // id가 있을 때만 쿼리를 실행
  });

  return { brandProductsData, isPending, isError, isSuccess };
};

//////////////////////////////////////////////////////////
//업데이트할 셀러 상품 조회
const getBrandProductById = async (
  productId: string
): Promise<BrandProductByIdQueryRelations> => {
  await getAuthUser();

  const { data, error } = await supabase
    .from("products")
    .select(
      `*, product_sizes( size, stock_quantity ), product_images( image_url ), sub_categories( name )`
    )
    .eq("id", productId)
    .single();

  if (error) throw error;

  return data;
};

export const useBrandProductById = (productId: string) => {
  const {
    data: brandProductData,
    isPending,
    isError,
    isSuccess,
  } = useQuery({
    queryKey: ["products", productId],
    queryFn: () => getBrandProductById(productId),
    enabled: !!productId,
  });

  return { brandProductData, isPending, isError, isSuccess };
};

////////////////////////////////////////////////////////
//업데이트
const updateBrandProducts = async (
  updatedProductRequestData: UpdateProductRequest
) => {
  const user = await getAuthUser();
  const authId = user.id;

  const {
    // category_id,
    category_name,
    color,
    description,
    id: product_id,
    name,
    price,
    // updated_at,
    sizes,
    product_images,
  } = updatedProductRequestData;

  //0. 카테고리 name으로 가져온 아이디 프로덕트 업데이트 시 넣기
  const { data: categoryData, error: categoryError } = await supabase
    .from("sub_categories")
    .select("id")
    .eq("name", `${category_name}`)
    .single();

  if (categoryError)
    throw new Error(
      `상품을 수정하는 중 카테고리 조회 오류가 발생했습니다. 관리자에게 문의해 주세요.`
    );

  const category_id = categoryData.id;

  //1. 프로덕트 업데이트
  const { error: productError } = await supabase
    .from("products")
    .update({ color, description, name, price, category_id })
    .eq("id", product_id);
  if (productError)
    throw new Error(
      `상품을 수정하는 중 오류가 발생했습니다. 관리자에게 문의해 주세요.`
    );

  //2. 사이즈 업데이트
  //2-1. 기존 사이즈 삭제
  const { error: removeSizesError } = await supabase
    .from("product_sizes")
    .delete()
    .eq("product_id", product_id);
  if (removeSizesError)
    throw new Error(
      `사이즈 및 재고 삭제 중 오류가 발생했습니다. 관리자에게 문의해 주세요.`
    );

  //2-2. 새로 사이즈 생성
  const insertProductSizes = async (
    size: InsertSizesRequired,
    product_id: string
  ) => {
    const { error: sizeError } = await supabase.from("product_sizes").insert({
      size: size.size,
      stock_quantity: size.stock_quantity,
      product_id,
    });
    if (sizeError)
      throw new Error(
        `사이즈 및 재고 생성 중 오류가 발생했습니다. 관리자에게 문의해 주세요.`
      );

    return;
  };

  //병렬 처리
  const insertSizesPromises = sizes.map(async (size: InsertSizesRequired) => {
    insertProductSizes(size, product_id);
  });

  await Promise.all(insertSizesPromises);

  //3. 새로운 이미지 있는지 확인
  const { data, error } = await supabase.storage
    .from("images")
    .list(`${authId}/temporary`);
  if (error) throw error;
  //새로운 이미지 파일 없으면 얼리 리턴
  if (!data) return;

  //새로운 이미지 파일 있으면 진행
  const isExistNewFiles = !!(data.length > 1);

  //여기가 진짜 이미지 없는 경우 얼리 리턴으로 마무리
  if (!isExistNewFiles) return;

  ///////////////////////////////////////////////////////////////
  //새로운 이미지 있다면

  //4. 기존 이미지 테이블에서 데이터 삭제
  const { error: removePrevImagesError } = await supabase
    .from("product_images")
    .delete()
    .eq("product_id", product_id);
  if (removePrevImagesError)
    throw new Error(
      `기존 상품 사진 삭제 중 오류가 발생했습니다. 관리자에게 문의해 주세요.`
    );

  //5. product_id 폴더에 든 기존 파일 스토리지에서 삭제
  //5-1. 기존 파일 몇개인지 확인하기
  const { data: prevImageFiles, error: prevImageFilesError } =
    await supabase.storage
      .from("images")
      .list(`${authId}/product_imgs/${product_id}`);

  if (prevImageFilesError)
    throw new Error(
      `기존 상품 사진 파일 개수 확인 중 오류가 발생했습니다. 관리자에게 문의해 주세요.`
    );

  //5-2. 기존 파일 삭제
  const removePrevFiles = async (index: number) => {
    const { error: imageRemoveError } = await supabase.storage
      .from("images")
      .remove([`${authId}/product_imgs/${product_id}/product_img_${index}`]);
    if (imageRemoveError)
      throw new Error(
        `기존 상품 사진 파일 삭제 중 오류가 발생했습니다. 관리자에게 문의해 주세요.`
      );
  };

  const removePrevFilesPromises = prevImageFiles!.map(async (_, index) => {
    removePrevFiles(index);
  });

  await Promise.all(removePrevFilesPromises);

  //6. 새 이미지 파일 product_id 폴더로 옮기기
  const moveFileToProductImgFolder = async (index: number) => {
    const { error: imageMoveError } = await supabase.storage
      .from("images")
      .move(
        `${authId}/temporary/product_img_${index}`,
        `${authId}/product_imgs/${product_id}/product_img_${index}`
      );

    if (imageMoveError)
      throw new Error(
        `새로운 상품 사진 파일 처리 중 오류가 발생했습니다. 관리자에게 문의해 주세요.`
      );
  };

  const moveFileToProductImgFolderPromises = product_images.map(
    async (_, index) => {
      moveFileToProductImgFolder(index);
    }
  );

  await Promise.all(moveFileToProductImgFolderPromises);

  //7. 이미지 테이블 새로 생성
  const updateProductImage = async (product_id: string, index: number) => {
    //🌈 퍼블릭 url 얻기
    const { data } = await supabase.storage.from("images").getPublicUrl(
      `${authId}/product_imgs/${product_id}/product_img_${index}?t=${new Date().getTime()}` //업데이트 시 쿼리 무효화 위해 타임스탬프 추가
    );

    const image_url = data.publicUrl;

    // 이미지 테이블 생성
    const { error: insertImageError } = await supabase
      .from("product_images")
      .insert({ product_id, image_url });
    if (insertImageError)
      throw new Error(
        `새로운 상품 사진 업로드 중 오류가 발생했습니다. 관리자에게 문의해 주세요.`
      );
  };

  //이미지 테이블 생성하기 => 병렬 처리
  const updateProductImagesPromises = product_images.map(async (_, index) => {
    updateProductImage(product_id, index);
  });

  await Promise.all(updateProductImagesPromises);
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const {
    mutate: mutateUpdateProduct,
    isPending: isPendingUpdateProduct,
    isError,
    isSuccess: isSuccessUpdateProduct,
  } = useMutation({
    mutationFn: updateBrandProducts,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      navigate("/dashboard/product");
    },
    onError: (error) => {
      toast({
        title: "상품 수정 중 문제 발생",
        description: `${error.message}`,
        variant: "destructive",
      });
    },
  });

  return {
    mutateUpdateProduct,
    isError,
    isPendingUpdateProduct,
    isSuccessUpdateProduct,
  };
};

//////////////////////////////////////////////////////////////////////
// 프로덕트 논리적 삭제
const changeActiveProduct = async (product_id: string) => {
  const { error: productError } = await supabase
    .from("products")
    .update({ is_active: false })
    .eq("id", product_id);
  if (productError)
    throw new Error(
      `상품 삭제 중 오류가 발생했습니다. 관리자에게 문의해 주세요.`
    );
};

export const useChangeActiveProduct = () => {
  const queryClient = useQueryClient();

  const {
    mutate: mutateChangeActiveProduct,
    isPending: isPendingChangeActiveProduct,
    isError,
    isSuccess: isSuccessChangeActiveProduct,
  } = useMutation({
    mutationFn: changeActiveProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (error) => {
      toast({
        title: "상품 삭제 중 문제 발생",
        description: `${error.message}`,
        variant: "destructive",
      });
    },
  });

  return {
    mutateChangeActiveProduct,
    isError,
    isPendingChangeActiveProduct,
    isSuccessChangeActiveProduct,
  };
};
