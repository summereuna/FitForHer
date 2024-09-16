import { Database } from "@/types/database.types";

export type Orders = Database["public"]["Tables"]["orders"]["Row"];
export type OrderRequest = Database["public"]["Tables"]["orders"]["Insert"];
