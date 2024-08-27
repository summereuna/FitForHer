import { Database, Enums } from "@/types/database.types";

export type UserRole = Enums<"user_role">;

export type Users = Database["public"]["Tables"]["users"]["Row"];

export type SignupUserRequired = Omit<
  Users,
  "id" | "created_at" | "updated_at" | "is_active"
>;

export interface SignupUsersRequest
  extends Omit<SignupUserRequired, "role" | "social_type"> {
  role: Enums<"user_role">; //default: "customer"
  social_type?: string; //default: "email"
  password: string;
}
