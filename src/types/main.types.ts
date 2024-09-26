import supabase from "@/shared/supabaseClient";
import { QueryData } from "@supabase/supabase-js";

const categoryProductsQuery = supabase
  .from("products")
  .select(
    `*,
      product_sizes( size, stock_quantity ),
      product_images( image_url ),
      sub_categories!inner ( *, categories!inner ( name ) ),
      brands( name )
      `
  )
  .filter("is_active", "eq", true)
  .order("created_at", {
    ascending: false,
  });

// // 'productsQuery'에 대한 타입 생성
export type CategoryProductsWithRelations = QueryData<
  typeof categoryProductsQuery
>;

// type MainCategory = CategoryProductsWithRelations["sub_categories"][number];

// export type MainProduct = MainCategory["products"][number];
