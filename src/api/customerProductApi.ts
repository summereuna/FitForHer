import supabase from "@/shared/supabaseClient";
import {
  ProductDetailWithRelations,
  RelatedProduct,
} from "@/types/customerProduct.types";
import { useQuery } from "@tanstack/react-query";

const getProductDetail = async (
  productId: string
): Promise<ProductDetailWithRelations> => {
  const { data, error } = await supabase
    .from("products")
    .select(
      `*,
        product_sizes( id, size, stock_quantity ),
        product_images( image_url ),
        sub_categories (
          name,
          categories ( name )
        ),
        brands( * ),
        product_questions( * )
        `
    )
    .filter("is_active", "eq", true)
    .eq("id", productId)
    .order("size", {
      referencedTable: "product_sizes",
      ascending: true,
    })
    // .order("created_at", {
    //   referencedTable: "product_questions",
    //   ascending: false,
    // })
    .single(); //카테고리 배열안에 든거 다 가져오기

  if (error) throw console.log("상품 상세 에러", error);

  return data;
};

export const useProductDetail = (productId: string) => {
  const { data, isPending, isError, isSuccess } = useQuery({
    queryKey: ["products-detail", productId],
    queryFn: () => getProductDetail(productId),
    enabled: !!productId,
  });

  return { data, isPending, isError, isSuccess };
};

//-------------------------------------------------------------
//추천 상품
const getRelatedProductDetail = async (
  subCategoryName: string,
  id: string
): Promise<RelatedProduct[]> => {
  const { data, error } = await supabase
    .from("products")
    .select(
      `*,
        product_sizes( id, size, stock_quantity ),
        product_images( image_url ),
        sub_categories!inner (
          name,
          categories ( name )
        ),
        brands( * ),
        product_questions( * )
        `
    )
    .filter("is_active", "eq", true)
    .eq("sub_categories.name", subCategoryName)
    .neq("id", id)
    .order("size", {
      referencedTable: "product_sizes",
      ascending: true,
    });

  if (error) throw console.log("연관 상품 조회 에러", error);

  return data;
};

export const useRelatedProductDetail = (
  subCategoryName: string,
  id: string
) => {
  const { data, isPending, isError, isSuccess } = useQuery({
    queryKey: ["products-detail", subCategoryName, id],
    queryFn: () => getRelatedProductDetail(subCategoryName, id),
    enabled: !!subCategoryName,
  });

  return { data, isPending, isError, isSuccess };
};
