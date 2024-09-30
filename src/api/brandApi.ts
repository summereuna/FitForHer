import { getAuthUser } from "@/api/userApi";
import { toast } from "@/hooks/use-toast";
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
  const user = await getAuthUser();

  const { data, error } = await supabase
    .from("brands")
    .insert({ name, seller_id: user.id })
    .select()
    .single();

  if (error) {
    if (error.code === "23505") {
      throw new Error("이미 사용중인 브랜드 이름입니다.");
    } else {
      throw new Error("브랜드 설정을 업데이트할 수 없습니다.");
    }
  }

  return data;
};

export const useCreateBrand = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    mutate: mutateCreateBrand,
    isPending,
    isError,
    isSuccess,
  } = useMutation({
    mutationFn: createBrands,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["brands"] });

      if (data.id) {
        toast({
          title: "브랜드 등록 성공",
          description: `브랜드를 등록했습니다.`,
        });
        navigate("/dashboard/setting");
      }
    },
    onError: (error) => {
      toast({
        title: "브랜드 등록 실패",
        description: `${error.message}`,
        variant: "destructive",
      });
    },
  });

  return {
    mutateCreateBrand,
    isError,
    isPending,
    isSuccess,
  };
};

const getBrandBySellerId = async (seller_id: string) => {
  const { data, error } = await supabase
    .from("brands")
    .select(
      `*,
      brand_likes( * )
      `
    )
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
    // staleTime: Infinity, // fresh 유지
  });

  return { brandData, isPending, isError, isSuccess };
};

const updateBrands = async (updatedBrandData: BrandUpdateRequest) => {
  await getAuthUser();

  const { data, error } = await supabase
    .from("brands")
    .update(updatedBrandData)
    .eq("id", updatedBrandData.id)
    .select("*")
    .single();

  if (error) {
    if (error.code === "23505") {
      throw new Error("이미 사용중인 브랜드 이름입니다.");
    } else {
      throw new Error("브랜드 설정을 업데이트할 수 없습니다.");
    }
  }

  return data;
};

export const useUpdateBrand = () => {
  const queryClient = useQueryClient();

  const {
    mutate: mutateUpdateBrand,
    isPending,
    isError,
    isSuccess,
  } = useMutation({
    mutationFn: updateBrands,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["brands"] });
      toast({
        title: "브랜드 정보 수정 성공",
        description: `브랜드 정보를 수정했습니다.`,
      });
    },
    onError: (error) => {
      toast({
        title: "브랜드 정보 수정 실패",
        description: `${error.message}`,
        variant: "destructive",
      });
    },
  });

  return {
    mutateUpdateBrand,
    isError,
    isPending,
    isSuccess,
  };
};

const upsertBrandLogo = async (file: File) => {
  const user = await getAuthUser();

  //스토리지에 올리기
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
  });

  return {
    mutateUploadBrandLogo,
    isError,
    isPendingBrandLogo,
    isSuccessBrandLogo,
    responseBrandLogoUrl,
  };
};
