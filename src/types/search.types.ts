import supabase from "@/shared/supabaseClient";
import { QueryData } from "@supabase/supabase-js";

const searchProductResponse = supabase
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
  .single(); //일부러 싱글로 타입 받음 props에서 쓰려고

export type SearchProduct = QueryData<typeof searchProductResponse>;