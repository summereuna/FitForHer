import supabase from "@/shared/supabaseClient";
import { Database, Tables } from "@/types/database.types";
import { QueryData } from "@supabase/supabase-js";

//프로덕트
export type Products = Tables<"products">;
export type InsertProduct = Database["public"]["Tables"]["products"]["Insert"];
export type UpdateProduct = Database["public"]["Tables"]["products"]["Update"];

//프로덕트 이미지
export type ProductImages = Tables<"product_images">;
export type InsertProductImagesRequest =
  Database["public"]["Tables"]["product_images"]["Insert"];
export type UpdateProductImages =
  Database["public"]["Tables"]["product_images"]["Update"];

//프로덕트 사이즈
export type ProductSizes = Tables<"product_sizes">;
export type InsertProductSize =
  Database["public"]["Tables"]["product_sizes"]["Insert"];
export type UpdateProductSize =
  Database["public"]["Tables"]["product_sizes"]["Update"];

export type InsertSizesRequired = Omit<
  ProductSizes,
  "id" | "is_active" | "product_id" | "seller_id"
>;

//////////////////////////////////////
export interface UploadProductRequest
  extends Omit<
    InsertProduct,
    "id" | "created_at" | "updated_at" | "is_active" | "seller_id"
  > {
  sizes: InsertSizesRequired[];
  product_images: string[];
}

export interface UpdateProductRequest
  extends Omit<
    Products,
    "created_at" | "is_active" | "seller_id" | "updated_at" | "brand_id"
  > {
  sizes: InsertSizesRequired[];
  product_images: string[];
  category_name: string;
}

//프로덕트 QnA
export type ProductQnA = Tables<"product_questions">;

//셀러 상품 조회
const productsQuery = supabase
  .from("products")
  .select(
    `*,
    product_sizes( size, stock_quantity ),
    product_images( image_url ),
    sub_categories (
      *,
      categories (
        name
      )
    )`
  )
  .order("created_at", { ascending: false });

export type BrandProductsWithRelations = QueryData<typeof productsQuery>;

//업데이트할 셀러 상품 조회
const brandProductByIdQuery = supabase
  .from("products")
  .select(
    `*, product_sizes( size, stock_quantity ), product_images( image_url ), sub_categories( name )`
  )
  .single();

// 'productsQuery'에 대한 타입 생성
export type BrandProductByIdQueryRelations = QueryData<
  typeof brandProductByIdQuery
>;
