import supabase from "@/shared/supabaseClient";
import { QueryData } from "@supabase/supabase-js";

const categoryProductsQuery = supabase
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
  .single();

// // 'productsQuery'에 대한 타입 생성
export type CategoryProductsWithRelations = QueryData<
  typeof categoryProductsQuery
>;

type MainCategory = CategoryProductsWithRelations["sub_categories"][number];

export type MainProduct = MainCategory["products"][number];
