import supabase from "@/shared/supabaseClient";
import { QueryData } from "@supabase/supabase-js";

const productDetailResponse = supabase
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
  .single();
// .order("created_at", {
//   referencedTable: "reviews",
//   ascending: false,
// })

export type ProductDetailWithRelations = QueryData<
  typeof productDetailResponse
>;

//---------------------------------------------------------------------------
const relatedProductDetailResponse = supabase
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
  .single(); //타입 써야해서 싱글로 받음

export type RelatedProduct = QueryData<typeof relatedProductDetailResponse>;
