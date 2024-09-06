import supabase from "@/shared/supabaseClient";
import { CategoryProductsWithRelations } from "@/types/main.types";
import { useQuery } from "@tanstack/react-query";

// //셀러 상품 조회
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
            id,
            is_active,
            name, 
            description,
            price,
            created_at,
            color,
            brands( name ),
            product_sizes( size, stock_quantity ),
            product_images( image_url ),
            sub_categories ( name )
        )
      )`
    )
    .eq("name", categoryName)
    .order("created_at", {
      referencedTable: "sub_categories.products",
      ascending: false,
    })
    .single(); //카테고리 배열안에 든거 다 가져오기

  if (error) throw console.log("쿼리 잘못됌", error);

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
