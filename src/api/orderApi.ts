import { Enums } from "@/types/database.types";
import { getPayment } from "@/api/paymentApi";
import { Item } from "@/context/CartContext";
// import useFormError from "@/hooks/useFormError";
import supabase from "@/shared/supabaseClient";
import {
  CancelOrderRequest,
  DashboardItemsByBrandIdResponse,
  GetOrderByOrderIdDataResponse,
  OrderRequest,
  OrdersByBrandIdResponse,
  OrdersByUserIdResponse,
  ReIncreaseCanceledItemsRequest,
  UpdateOrderItemStatusRequest,
} from "@/types/order.types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { PreReducedItem } from "@/components/Checkout/CheckoutMethodForm";
import { toast } from "@/hooks/use-toast";
import { getAuthUser } from "@/api/userApi";

//재고 조회
const getQuantity = async (productSizesId: string) => {
  const { data, error } = await supabase
    .from("product_sizes")
    .select("stock_quantity")
    .eq("id", productSizesId)
    .single(); // 단일 항목 조회

  if (error) throw new Error("재고 수량을 조회할 수 없습니다.");

  return data;
};

//재고 수량 업데이트
const updateQuantity = async (productSizesId: string, reducedStock: number) => {
  const { data, error } = await supabase
    .from("product_sizes")
    .update({
      stock_quantity: reducedStock,
    })
    .eq("id", productSizesId)
    .select();

  if (error) throw new Error("재고 수량을 업데이트 할 수 없습니다.");

  return data;
};

//------------------------------------------------------------------------------
//재고 우선 감소
export const reducePreQuantities = async (updateData: PreReducedItem[]) => {
  const reducePreQuantity = async (
    productSizesId: string,
    orderQuantity: number
  ) => {
    // 0. 인증된 사용자
    await getAuthUser();

    // 1.현재 재고 수량 먼저 조회
    const productSizeData = await getQuantity(productSizesId);

    // 2. 재고를 차감한 값 업데이트
    const currentStock = productSizeData?.stock_quantity;
    const reducedStock = currentStock - orderQuantity;
    if (reducedStock < 0) throw new Error("재고 수량이 부족합니다.");
    const data = await updateQuantity(productSizesId, reducedStock);

    return data;
  };

  //병렬 처리
  const reducePreQuantityPromises = updateData.map(async (item) => {
    reducePreQuantity(item.productSizesId, item.orderQuantity);
  });

  await Promise.all(reducePreQuantityPromises);
};

export const useReducePreQuantity = () => {
  const queryClient = useQueryClient();

  const {
    mutate: mutateReducePreQuantity,
    isPending,
    isError,
    isSuccess,
  } = useMutation({
    mutationFn: reducePreQuantities,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pre-quantity"] });
    },
    onError: (error) => {
      toast({
        title: "재고 수량 에러 발생",
        description: `${error.message}`,
        variant: "destructive",
      });
    },
  });

  return {
    mutateReducePreQuantity,
    isError,
    isPending,
    isSuccess,
  };
};

//-----------------------------------------------------------------------------

//재고 감소 취소
export const reIncreasePreQuantities = async (updateData: PreReducedItem[]) => {
  const reIncreasePreQuantity = async (
    productSizesId: string,
    orderQuantity: number
  ) => {
    // 0. 인증된 사용자
    await getAuthUser();

    // 1.현재 재고 수량을 먼저 조회
    const productSizeData = await getQuantity(productSizesId);

    // 2. 재고를 차감한 값을 업데이트
    const currentStock = productSizeData?.stock_quantity;
    const reducedStock = currentStock + orderQuantity;
    const data = await updateQuantity(productSizesId, reducedStock);

    return data;
  };

  //병렬 처리
  const reIncreasePreQuantityPromises = updateData.map(async (item) => {
    reIncreasePreQuantity(item.productSizesId, item.orderQuantity);
  });

  await Promise.all(reIncreasePreQuantityPromises);
};

export const useReIncreasePreQuantity = () => {
  const queryClient = useQueryClient();

  const {
    mutate: mutateReIncreasePreQuantity,
    isPending,
    isError,
    isSuccess,
  } = useMutation({
    mutationFn: reIncreasePreQuantities,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pre-quantity"] });
    },
    onError: (error) => {
      toast({
        title: "재고 수량 에러 발생",
        description: `${error.message}`,
        variant: "destructive",
      });
    },
  });

  return {
    mutateReIncreasePreQuantity,
    isError,
    isPending,
    isSuccess,
  };
};

//------------------------------------------------------------------
//주문
const createOrder = async ({
  newOrder,
  cartItems,
}: {
  newOrder: OrderRequest;
  cartItems: Item[];
}) => {
  await getAuthUser();

  const { data: orderData, error: orderError } = await supabase
    .from("orders")
    .insert(newOrder)
    .select()
    .single();

  if (orderError)
    throw new Error(
      "주문 처리 중 오류가 발생했습니다, 다시 시도해 주세요. 같은 문제가 계속 될 경우 관리자에게 문의해 주세요."
    );
  const orderId = orderData.id;

  const createOrderItem = async (item: Item) => {
    const { data: orderItemData, error: orderItemError } = await supabase
      .from("order_items")
      .insert({
        order_id: orderId,
        product_id: item.id,
        quantity: item.size_quantity,
        price: item.price,
        size_id: item.product_sizes_id,
      })
      .select()
      .single();

    if (orderItemError)
      throw new Error(
        "주문 내 상품 처리 중 오류가 발생했습니다, 다시 시도해 주세요. 같은 문제가 계속 될 경우 관리자에게 문의해 주세요."
      );
    return orderItemData;
  };

  //병렬 처리
  const createOrderItemPromises = cartItems.map((item) =>
    createOrderItem(item)
  );

  await Promise.all(createOrderItemPromises);

  return orderId;
};

export const useCreateOrder = () => {
  const queryClient = useQueryClient();

  const {
    mutate: mutateCreateOrder,
    data: orderData,
    isPending: isPendingOrder,
    isError: isErrorOrder,
    isSuccess: isSuccessOrder,
  } = useMutation({
    mutationFn: createOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["order"] });
    },
    onError: (error) => {
      toast({
        title: "주문 처리 중 문제 발생",
        description: `${error.message}`,
        variant: "destructive",
      });
    },
  });

  return {
    mutateCreateOrder,
    orderData,
    isPendingOrder,
    isErrorOrder,
    isSuccessOrder,
  };
};

//----------------------------------------------------------
//주문내역
const getOrdersByUserId = async (
  myId: string
): Promise<OrdersByUserIdResponse> => {
  await getAuthUser();

  const { data, error } = await supabase
    .from("orders")
    .select(
      `id,
      created_at,
      name,
      order_status,
      total_amount,
      order_items ( products ( brands (name), product_images ( * )))`
    )
    .eq("customer_id", myId)
    .order("created_at", { ascending: false });

  if (error) throw error;

  return data;
};

export const useOrdersByUserId = (myId: string) => {
  const {
    data: myOrdersData,
    isPending,
    isError,
    isSuccess,
  } = useQuery({
    queryKey: ["orders", myId],
    queryFn: () => getOrdersByUserId(myId),
    enabled: !!myId, // id가 있을 때만 쿼리를 실행
  });

  return { myOrdersData, isPending, isError, isSuccess };
};

//----------------------------------------------------------
//주문 상세
const getOrderbyOrderId = async (
  orderId: string
): Promise<GetOrderByOrderIdDataResponse> => {
  await getAuthUser();

  const { data: orderData, error } = await supabase
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
    .eq("id", orderId)
    .order("created_at", { ascending: false })
    .single();

  if (error) throw error;

  const paymentId = orderData.payment_id;
  const payment = await getPayment(paymentId);

  const data: GetOrderByOrderIdDataResponse = { orderData, payment };
  return data;
};

export const useOrdersByOrderId = (orderId: string) => {
  const { data, isPending, isError, isSuccess } = useQuery({
    queryKey: ["orders", orderId],
    queryFn: () => getOrderbyOrderId(orderId),
    enabled: !!orderId, // id가 있을 때만 쿼리를 실행
  });

  return { data, isPending, isError, isSuccess };
};

//----------------------------------------------------------
//----------------------------------------------------------
// 구매자: status 수정 (주문 취소!!)
const cancelOrder = async (newStatusData: CancelOrderRequest) => {
  const { orderId, newStatus } = newStatusData;
  await getAuthUser();

  //newStatus 상태에 따라 바뀌게
  const { data: orderData, error: orderError } = await supabase
    .from("orders")
    .update({
      order_status: newStatus,
    })
    .eq("id", orderId)
    .select()
    .single();

  if (orderError)
    throw new Error(
      "주문 취소 처리 중 오류가 발생했습니다, 다시 시도해 주세요. 같은 문제가 계속 될 경우 관리자에게 문의해 주세요."
    );

  //newStatus가 주문취소인 경우, order_items 테이블도 주문 취소되게 하기
  const { data: orderItemsData, error } = await supabase
    .from("order_items")
    .update({
      status: newStatus as Enums<"order_item_status">,
    })
    .eq("order_id", orderId)
    .select();

  if (error)
    throw new Error(
      "주문 취소 처리 중 오류가 발생했습니다, 다시 시도해 주세요. 같은 문제가 계속 될 경우 관리자에게 문의해 주세요."
    );

  //주문 취소된 items에 대해 재고 복구
  const reIncreaseCanceledItems = async ({
    productSizesId,
    orderQuantity,
  }: ReIncreaseCanceledItemsRequest) => {
    // 1.현재 재고 수량을 먼저 조회
    const productSizeData = await getQuantity(productSizesId);

    // 2. 재고를 복구한 값으로 업데이트
    const currentStock = productSizeData?.stock_quantity;
    const reducedStock = currentStock + orderQuantity;
    await updateQuantity(productSizesId, reducedStock);
  };

  //재고 복구해야할 아이템 목록
  //병렬 처리
  const reIncreaseOrderItemPromises = orderItemsData.map((item) =>
    reIncreaseCanceledItems({
      productSizesId: item.size_id,
      orderQuantity: item.quantity,
    })
  );

  await Promise.all(reIncreaseOrderItemPromises);

  return { order: orderData, order_items: orderItemsData };
};

export const useCancelOrder = () => {
  const queryClient = useQueryClient();

  const {
    mutate: mutateCancelOrder,
    isPending,
    isError,
    isSuccess,
  } = useMutation({
    mutationFn: cancelOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
    onError: (error) => {
      toast({
        title: "주문 취소 처리 중 문제 발생",
        description: `${error.message}`,
        variant: "destructive",
      });
    },
  });

  return {
    mutateCancelOrder,
    isPending,
    isError,
    isSuccess,
  };
};

//----------------------------------------------------------
//----------------------------------------------------------
//판매자: 판매 관리 조회
const getOrdersByBrandId = async (
  brandId: string
): Promise<OrdersByBrandIdResponse> => {
  await getAuthUser();

  const { data, error } = await supabase
    .from("order_items")
    .select(
      `*,
      product_sizes ( size ),
      orders ( * ),
      products!inner ( *, product_images ( * ))`
    )
    .eq("products.brand_id", brandId)
    .order("created_at", { ascending: false });

  if (error) throw error;

  return data;
};

export const useOrdersByBrandId = (brandId: string) => {
  const {
    data: brandOrderItemsData,
    isPending,
    isError,
    isSuccess,
  } = useQuery({
    queryKey: ["orderItems", brandId],
    queryFn: () => getOrdersByBrandId(brandId),
    enabled: !!brandId, // id가 있을 때만 쿼리를 실행
  });

  return { brandOrderItemsData, isPending, isError, isSuccess };
};

//----------------------------------------------------------
//판매자: 대시보드 조회(판매된 상품-주문완료인 것만 조회)
const getDashboardItemsByBrandId = async (
  brandId: string
): Promise<DashboardItemsByBrandIdResponse> => {
  await getAuthUser();

  const { data, error } = await supabase
    .from("order_items")
    .select(
      `id, order_id, price, quantity, status,
      product_sizes ( size ),
      orders ( * ),
      products!inner ( *, product_images ( * ), sub_categories ( name, categories (name) ))`
    )
    .eq("products.brand_id", brandId)
    .neq("status", "order_cancelled") //주문 취소된 건은 빼고 가져오기
    .order("created_at", { ascending: false });

  if (error) throw error;

  return data;
};

export const useDashboardItemsByBrandId = (brandId: string) => {
  const {
    data: dashboardItemsData,
    isPending,
    isError,
    isSuccess,
  } = useQuery({
    queryKey: ["dashboardItems", brandId],
    queryFn: () => getDashboardItemsByBrandId(brandId),
    enabled: !!brandId, // id가 있을 때만 쿼리를 실행
  });

  return { dashboardItemsData, isPending, isError, isSuccess };
};

//----------------------------------------------------------
// 판매자: status 수정

const updateOrderItemStatus = async (
  newStatusData: UpdateOrderItemStatusRequest
) => {
  const { orderItemId, newStatus } = newStatusData;

  //newStatus 상태에 따라 바뀌게
  const { data, error } = await supabase
    .from("order_items")
    .update({
      status: newStatus,
    })
    .eq("id", orderItemId)
    .select();

  if (error)
    throw new Error(
      "판매 상품의 상태 변경 중 오류가 발생했습니다, 다시 시도해 주세요. 같은 문제가 계속 될 경우 관리자에게 문의해 주세요."
    );

  return data;
};

export const useUpdateOrderItemStatus = () => {
  const queryClient = useQueryClient();

  const {
    mutate: mutateUpdateOrderItemStatus,
    isPending,
    isError,
    isSuccess,
  } = useMutation({
    mutationFn: updateOrderItemStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orderItems"] });
    },
    onError: (error) => {
      toast({
        title: "판매 상품의 상태 변경 중 문제 발생",
        description: `${error.message}`,
        variant: "destructive",
      });
    },
  });

  return {
    mutateUpdateOrderItemStatus,
    isPending,
    isError,
    isSuccess,
  };
};
