import { Enums } from "@/types/database.types";
import { getPayment } from "@/api/paymentApi";
import { Item } from "@/context/CartContext";
import useFormError from "@/hooks/useFormError";
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

//재고 우선 감소
export const reducePreQuantities = async (updateData: PreReducedItem[]) => {
  const reducePreQuantity = async (
    productSizesId: string,
    orderQuantity: number
  ) => {
    // 0. 인증된 사용자
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();
    if (userError) throw userError;
    if (!user) throw new Error("인증되지 않은 사용자 입니다.");

    // 1.현재 재고 수량을 먼저 조회
    const { data: productSizeData, error: selectError } = await supabase
      .from("product_sizes")
      .select("stock_quantity")
      .eq("id", productSizesId)
      .single(); // 단일 항목 조회

    if (selectError) throw selectError;

    // 2. 재고를 차감한 값을 업데이트
    const currentStock = productSizeData?.stock_quantity;
    const reducedStock = currentStock - orderQuantity;

    if (reducedStock < 0) throw new Error("재고 수량이 부족합니다.");

    const { data, error } = await supabase
      .from("product_sizes")
      .update({
        stock_quantity: reducedStock,
      })
      .eq("id", productSizesId)
      .select();

    if (error) throw error;

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
  const { errorMessage, setErrorMessage } = useFormError();

  const {
    mutate: mutateReducePreQuantity,
    isPending,
    isError,
    isSuccess,
  } = useMutation({
    mutationFn: reducePreQuantities,
    onSuccess: (data) => {
      console.log(data);
      queryClient.invalidateQueries({ queryKey: ["pre-quantity"] });
    },
    onError: (error) => {
      console.log(error);
      // switch (error.code) {
      //   case "user_already_exists":
      //     setErrorMessage("이미 가입한 사용자입니다.");
      //     break;
      //   case "weak_password":
      //     setErrorMessage("비밀번호가 너무 약합니다.");
      //     break;
      //   default:
      //     setErrorMessage("회원가입에 실패했습니다. 다시 시도해 주세요.");
      //     break;
      // }
      // return errorMessage;
    },
  });

  return {
    mutateReducePreQuantity,
    isError,
    isPending,
    isSuccess,
    errorMessage,
  };
};

//-----------------------------------------------------------------------------

const reIncreaseQuantity = async (
  productSizesId: string,
  reducedStock: number
) => {
  const { data, error } = await supabase
    .from("product_sizes")
    .update({
      stock_quantity: reducedStock,
    })
    .eq("id", productSizesId)
    .select();

  if (error) throw error;

  return data;
};

//재고 감소 취소
export const reIncreasePreQuantities = async (updateData: PreReducedItem[]) => {
  const reIncreasePreQuantity = async (
    productSizesId: string,
    orderQuantity: number
  ) => {
    // 0. 인증된 사용자
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();
    if (userError) throw userError;
    if (!user) throw new Error("인증되지 않은 사용자 입니다.");

    // 1.현재 재고 수량을 먼저 조회
    const { data: productSizeData, error: selectError } = await supabase
      .from("product_sizes")
      .select("stock_quantity")
      .eq("id", productSizesId)
      .single(); // 단일 항목 조회

    if (selectError) throw selectError;

    // 2. 재고를 차감한 값을 업데이트
    const currentStock = productSizeData?.stock_quantity;
    const reducedStock = currentStock + orderQuantity;

    const data = await reIncreaseQuantity(productSizesId, reducedStock);
    // const { data, error } = await supabase
    //   .from("product_sizes")
    //   .update({
    //     stock_quantity: reducedStock,
    //   })
    //   .eq("id", productSizesId)
    //   .select();

    // if (error) throw error;

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
  const { errorMessage, setErrorMessage } = useFormError();

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
      console.log(error);
      // switch (error.code) {
      //   case "user_already_exists":
      //     setErrorMessage("이미 가입한 사용자입니다.");
      //     break;
      //   case "weak_password":
      //     setErrorMessage("비밀번호가 너무 약합니다.");
      //     break;
      //   default:
      //     setErrorMessage("회원가입에 실패했습니다. 다시 시도해 주세요.");
      //     break;
      // }
      // return errorMessage;
    },
  });

  return {
    mutateReIncreasePreQuantity,
    isError,
    isPending,
    isSuccess,
    errorMessage,
  };
};

//------------------------------------------------------------------
const createOrder = async ({
  newOrder,
  cartItems,
}: {
  newOrder: OrderRequest;
  cartItems: Item[];
}) => {
  console.log("✅", newOrder);
  const { data: orderData, error: orderError } = await supabase
    .from("orders")
    .insert(newOrder)
    .select()
    .single();

  if (orderError) throw orderError;
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

    if (orderItemError) throw orderItemError;
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
  const { errorMessage, setErrorMessage } = useFormError();

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
      console.log(error);
      // switch (error.code) {
      //   case "user_already_exists":
      //     setErrorMessage("이미 가입한 사용자입니다.");
      //     break;
      //   case "weak_password":
      //     setErrorMessage("비밀번호가 너무 약합니다.");
      //     break;
      //   default:
      //     setErrorMessage("회원가입에 실패했습니다. 다시 시도해 주세요.");
      //     break;
      // }
      // return errorMessage;
    },
  });

  return {
    mutateCreateOrder,
    orderData,
    isPendingOrder,
    isErrorOrder,
    isSuccessOrder,
    errorMessage,
  };
};

//----------------------------------------------------------
//주문내역
const getOrdersByUserId = async (
  myId: string
): Promise<OrdersByUserIdResponse> => {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();
  if (userError) throw userError;
  if (!user) throw new Error("인증되지 않은 사용자 입니다.");

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
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();
  if (userError) throw userError;
  if (!user) throw new Error("인증되지 않은 사용자 입니다.");

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

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();
  if (userError) throw userError;
  if (!user) throw new Error("인증되지 않은 사용자 입니다.");

  //newStatus 상태에 따라 바뀌게
  const { data: orderData, error: orderError } = await supabase
    .from("orders")
    .update({
      order_status: newStatus,
    })
    .eq("id", orderId)
    .select()
    .single();

  if (orderError) throw orderError;

  //newStatus가 주문취소인 경우, order_items 테이블도 주문 취소되게 하기
  const { data: orderItemsData, error } = await supabase
    .from("order_items")
    .update({
      status: newStatus as Enums<"order_item_status">,
    })
    .eq("order_id", orderId)
    .select();

  if (error) throw error;

  //주문 취소된 items에 대해 재고 복구
  const reIncreaseCanceledItems = async ({
    productSizesId,
    orderQuantity,
  }: ReIncreaseCanceledItemsRequest) => {
    // 1.현재 재고 수량을 먼저 조회
    const { data: productSizeData, error: getQuantityError } = await supabase
      .from("product_sizes")
      .select("stock_quantity")
      .eq("id", productSizesId)
      .single(); // 단일 항목 조회

    if (getQuantityError) throw getQuantityError;

    // 2. 재고를 복구한 값으로 업데이트
    const currentStock = productSizeData?.stock_quantity;
    const reducedStock = currentStock + orderQuantity;
    await reIncreaseQuantity(productSizesId, reducedStock);
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
  const { errorMessage, setErrorMessage } = useFormError();

  const {
    mutate: mutateCancelOrder,
    isPending,
    isError,
    isSuccess,
  } = useMutation({
    mutationFn: cancelOrder,
    onSuccess: (data) => {
      console.log(data);
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
    onError: (error) => {
      console.log(error);
      // switch (error.code) {
      //   case "user_already_exists":
      //     setErrorMessage("이미 가입한 사용자입니다.");
      //     break;
      //   case "weak_password":
      //     setErrorMessage("비밀번호가 너무 약합니다.");
      //     break;
      //   default:
      //     setErrorMessage("회원가입에 실패했습니다. 다시 시도해 주세요.");
      //     break;
      // }
      // return errorMessage;
    },
  });

  return {
    mutateCancelOrder,
    isPending,
    isError,
    isSuccess,
    errorMessage,
  };
};

//----------------------------------------------------------
//----------------------------------------------------------
//판매자: 판매 관리 조회
const getOrdersByBrandId = async (
  brandId: string
): Promise<OrdersByBrandIdResponse> => {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();
  if (userError) throw userError;
  if (!user) throw new Error("인증되지 않은 사용자 입니다.");

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
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();
  if (userError) throw userError;
  if (!user) throw new Error("인증되지 않은 사용자 입니다.");

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

  if (error) throw error;
  //✅newStatus가 주문취소인 경우, order 테이블도 주문 취소되게 하기..?

  return data;
};

export const useUpdateOrderItemStatus = () => {
  const queryClient = useQueryClient();
  const { errorMessage, setErrorMessage } = useFormError();

  const {
    mutate: mutateUpdateOrderItemStatus,
    isPending,
    isError,
    isSuccess,
  } = useMutation({
    mutationFn: updateOrderItemStatus,
    onSuccess: (data) => {
      console.log(data);
      queryClient.invalidateQueries({ queryKey: ["orderItems"] });
    },
    onError: (error) => {
      console.log(error);
      // switch (error.code) {
      //   case "user_already_exists":
      //     setErrorMessage("이미 가입한 사용자입니다.");
      //     break;
      //   case "weak_password":
      //     setErrorMessage("비밀번호가 너무 약합니다.");
      //     break;
      //   default:
      //     setErrorMessage("회원가입에 실패했습니다. 다시 시도해 주세요.");
      //     break;
      // }
      // return errorMessage;
    },
  });

  return {
    mutateUpdateOrderItemStatus,
    isPending,
    isError,
    isSuccess,
    errorMessage,
  };
};
