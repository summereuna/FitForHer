import { Database, Enums } from "@/types/database.types";

export type UserRole = Enums<"user_role">;

export type Brands = Database["public"]["Tables"]["brands"]["Row"];

export type BrandRegistrationRequest = Omit<
  Brands,
  | "seller_id"
  | "id"
  | "created_at"
  | "updated_at"
  | "is_active"
  | "logo_url"
  | "description"
  | "official_website"
>;

export type BrandUpdateRequest = Omit<
  Brands,
  "created_at" | "updated_at" | "is_active" | "seller_id"
>;
