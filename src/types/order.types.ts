import supabase from "@/shared/supabaseClient";
import { Database, Enums } from "@/types/database.types";
import { QueryData } from "@supabase/supabase-js";

export type Orders = Database["public"]["Tables"]["orders"]["Row"];
export type OrderRequest = Database["public"]["Tables"]["orders"]["Insert"];

//------------------------------------

const ordersByUserIdResponse = supabase
  .from("orders")
  .select(
    `id,
    created_at,
    name,
    order_status,
    total_amount,
    order_items ( products ( brands (name), product_images ( * )))`
  )
  .order("created_at", { ascending: false });

export type OrdersByUserIdResponse = QueryData<typeof ordersByUserIdResponse>;

//------------------------------------

const ordersByOrderIdResponse = supabase
  .from("orders")
  .select(
    `id,
    payment_id,
    created_at,
    order_status,
    total_amount,
    order_items ( id, quantity, status,
    products ( id, name, color, price, brands (name), product_images ( * )), product_sizes ( size ))`
  )
  .order("created_at", { ascending: false })
  .single();

export type OrdersByOrderIdResponse = QueryData<typeof ordersByOrderIdResponse>;

export interface GetOrderByOrderIdDataResponse {
  orderData: OrdersByOrderIdResponse;
  payment: any;
}

//------------------------------------

const ordersByBrandIdResponse = supabase
  .from("order_items")
  .select(
    `*,
    product_sizes ( size ),
    orders ( * ),
    products!inner ( *, brands!inner ( id ), product_images ( * ))`
  )
  .order("created_at", { ascending: false });

export type OrdersByBrandIdResponse = QueryData<typeof ordersByBrandIdResponse>;

//------------------------------------

export interface ReIncreaseCanceledItemsRequest {
  productSizesId: string;
  orderQuantity: number;
}

export interface CancelOrderRequest {
  orderId: string;
  newStatus: Enums<"order_status">;
}

//------------------------------------

export interface UpdateOrderItemStatusRequest {
  orderItemId: string;
  newStatus: Enums<"order_item_status">;
}
