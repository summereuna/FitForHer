import supabase from "@/shared/supabaseClient";
import { SubCategoryProductsWithRelations } from "@/types/category.types";
import { useQuery } from "@tanstack/react-query";

// //셀러 상품 조회
const getCategoryProducts = async (
  subCategoryName: string,
  sortBy: "newest" | "low-price" | "high-price"
): Promise<SubCategoryProductsWithRelations> => {
  let orderColumn = "created_at";
  let ascending = false;

  if (sortBy === "low-price") {
    orderColumn = "price";
    ascending = true; // 가격순으로 오름차순 정렬 (저렴한 순서)
  } else if (sortBy === "high-price") {
    orderColumn = "price";
    ascending = false; // 가격순으로 내림차순 정렬 (비싼 순서)
  } else if (sortBy === "newest") {
    orderColumn = "created_at";
    ascending = false; // 최신순으로 내림차순 정렬
  }

  const { data, error } = await supabase
    .from("sub_categories")
    .select(
      `name,
        categories(
            name
        ),
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
    `
    )
    .eq("name", subCategoryName)
    .filter("products.is_active", "eq", true)
    .order(orderColumn, {
      referencedTable: "products",
      ascending,
    })
    .single(); //카테고리 배열안에 든거 다 가져오기

  if (error) throw console.log("쿼리 잘못됌", error);

  return data;
};

export const useSubCategoryProducts = (
  subCategoryName: string,
  sortBy: "newest" | "low-price" | "high-price" = "newest"
) => {
  const { data, isPending, isError, isSuccess } = useQuery({
    queryKey: ["products-categories-sub", subCategoryName, sortBy],
    queryFn: () => getCategoryProducts(subCategoryName, sortBy),
    enabled: !!subCategoryName,
  });

  return { data, isPending, isError, isSuccess };
};
