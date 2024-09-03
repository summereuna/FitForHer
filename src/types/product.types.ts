import { Database, Tables } from "@/types/database.types";

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

// export type InsertProductImagesRequest = Omit<
//   ProductImages,
//   "id" | "created_at" | "updated_at" | "is_active"
// >;

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
// export interface InsertSizesRequest {
//   sizes: InsertSizesRequired[];
// }

//////////////////////////////////////
// 카테고리
// parent가 null일 수 있는 최상위 카테고리 타입
// type TopCategory = {
//   name: string;
//   parent: {
//     name: null; // 최상위 카테고리의 parent는 null
//   };
// };

// // parent가 있는 두 번째 레벨 카테고리 타입
// type SubCategory = {
//   name: string;
//   parent: {
//     name: string;
//   };
// };

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
