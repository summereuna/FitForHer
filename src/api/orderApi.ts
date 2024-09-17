import { getPayment } from "@/api/paymentApi";
import { Item } from "@/context/CartContext";
import useFormError from "@/hooks/useFormError";
import { PreReducedItem } from "@/pages/Checkout/Checkout";
import supabase from "@/shared/supabaseClient";
import {
  GetOrderByOrderIdDataResponse,
  OrderRequest,
  OrdersByUserIdResponse,
} from "@/types/order.types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

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
      order_items ( id, quantity,
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
