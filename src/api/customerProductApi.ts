import supabase from "@/shared/supabaseClient";
import { ProductDetailWithRelations } from "@/types/category.types";
import { useQuery } from "@tanstack/react-query";

const getProductDetail = async (
  productId: string
): Promise<ProductDetailWithRelations> => {
  const { data, error } = await supabase
    .from("products")
    .select(
      `*,
        product_sizes( size, stock_quantity ),
        product_images( image_url ),
        sub_categories (
          name,
          categories ( name )
        ),
        brands( * ),
        product_questions( * )
        `
    )
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
