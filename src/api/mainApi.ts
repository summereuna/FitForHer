import supabase from "@/shared/supabaseClient";
import { CategoryProductsWithRelations } from "@/types/main.types";
import { useQuery } from "@tanstack/react-query";

// SELECT 메인 페이지 전체 상품 조회
const getCategoryProducts = async (
  categoryName: string
): Promise<CategoryProductsWithRelations> => {
  const { data, error } = await supabase
    .from("products")
    .select(
      `*,
    product_sizes( size, stock_quantity ),
    product_images( image_url ),
    sub_categories!inner ( *, categories!inner ( name ) ),
    brands( name )
    `
    )
    .eq("sub_categories.categories.name", categoryName)
    .filter("is_active", "eq", true)
    .order("created_at", {
      ascending: false,
    });

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
