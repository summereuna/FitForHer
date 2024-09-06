import supabase from "@/shared/supabaseClient";
import { QueryData } from "@supabase/supabase-js";

const subCategoryProductsQuery = supabase
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
  .single();

export type SubCategoryProductsWithRelations = QueryData<
  typeof subCategoryProductsQuery
>;
