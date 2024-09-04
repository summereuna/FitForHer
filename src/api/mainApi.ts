import supabase from "@/shared/supabaseClient";
import { QueryData } from "@supabase/supabase-js";
import { useQuery } from "@tanstack/react-query";

// //셀러 상품 조회
const categoryProductsQuery = supabase
  .from("categories")
  .select(
    `*,
  sub_categories(
    name,
    products (
        *,
        product_sizes( size, stock_quantity ),
        product_images( image_url ),
        category_id ( * )
    )
  )`
  )
  .single();

// // 'productsQuery'에 대한 타입 생성
export type CategoryProductsWithRelations = QueryData<
  typeof categoryProductsQuery
>;

const getCategoryProducts = async (
  categoryName: string
): Promise<CategoryProductsWithRelations> => {
  const { data, error } = await supabase
    .from("categories")
    .select(
      `*,
      sub_categories(
        name,
        products (
            *,
            product_sizes( size, stock_quantity ),
            product_images( image_url ),
            category_id ( * )
        )
      )`
    )
    .eq("name", categoryName)
    .single(); //카테고리 배열안에 든거 다 가져오기

  if (error) throw error;

  return data;
};

export const useCategoryProducts = (categoryName: string) => {
  const { data, isPending, isError, isSuccess } = useQuery({
    queryKey: ["products-categories", categoryName],
    queryFn: () => getCategoryProducts(categoryName),
    enabled: !!categoryName,
  });

  return { data, isPending, isError, isSuccess };
};
