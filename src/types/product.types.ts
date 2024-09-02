import { Database, Enums } from "@/types/database.types";

//프로덕트
export type Products = Database["public"]["Tables"]["products"]["Row"];
export type InsertProduct = Database["public"]["Tables"]["products"]["Insert"];

//프로덕트 이미지
export type ProductImages =
  Database["public"]["Tables"]["product_images"]["Row"];
export type InsertProductImagesRequest =
  Database["public"]["Tables"]["product_images"]["Insert"];

// export type InsertProductImagesRequest = Omit<
//   ProductImages,
//   "id" | "created_at" | "updated_at" | "is_active"
// >;

//프로덕트 사이즈
export type ProductSizes = Database["public"]["Tables"]["product_sizes"]["Row"];
export type InsertProductSize =
  Database["public"]["Tables"]["product_sizes"]["Insert"];

export type InsertSizesRequired = Omit<
  ProductSizes,
  "id" | "is_active" | "product_id" | "seller_id"
>;
// export interface InsertSizesRequest {
//   sizes: InsertSizesRequired[];
// }

//////////////////////////////////////
export interface UploadProductRequest
  extends Omit<
    InsertProduct,
    "id" | "created_at" | "updated_at" | "is_active" | "seller_id"
  > {
  sizes: InsertSizesRequired[];
  product_images: string[];
}
//////////////////////////////////////

//프로덕트 QnA
export type ProductQnA =
  Database["public"]["Tables"]["product_questions"]["Row"];
