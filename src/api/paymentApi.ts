import { Item } from "@/context/CartContext";
import { CustomerInfo, OrderProductType } from "@/pages/Checkout/Checkout";
import * as PortOne from "@portone/browser-sdk/v2";
import { useQuery } from "@tanstack/react-query";

const MY_STORE_ID = import.meta.env.VITE_PORTONE_MY_STORE_ID;
const CHANNEL_KEY = import.meta.env.VITE_PORTONE_CHANNEL_KEY;
const PORTONE_API_SECRET = import.meta.env.VITE_PORTONE_API_SECRET;

/**
 * 결제 함수
 * 카카오페이 채널 설정 및 파라미터
 * https://developers.portone.io/opi/ko/integration/pg/v2/kakaopay?v=v2
 * @param customerInfo
 * @param products
 * @returns
 */
export const pay = async (
  customerInfo: CustomerInfo,
  products: OrderProductType[]
) => {
  const totalPriceOrderItems = products.reduce(
    (total, item) => total + item.amount,
    0
  );
  const shippingCharge = totalPriceOrderItems > 30000 ? 0 : 2500;
  const totalPrice = totalPriceOrderItems + shippingCharge;

  const orderNameSetting =
    products.length === 1
      ? products[0].name
      : `${products[0].name} 외 ${products.length - 1}건`;

  const response = await PortOne.requestPayment({
    storeId: MY_STORE_ID,
    channelKey: CHANNEL_KEY,
    paymentId: `payment-${crypto.randomUUID()}`, //주문번호
    orderName: orderNameSetting,
    totalAmount: totalPrice,
    currency: "CURRENCY_KRW",
    payMethod: "EASY_PAY", //간편결제
    windowType: {
      //카카오 세팅
      pc: "IFRAME",
      mobile: "REDIRECTION",
    },
    redirectUrl: `${window.location.origin}/checkout/payment-redirect`, //모바일 환경에서 실행됨
    customer: {
      customerId: customerInfo.customerId,
      fullName: customerInfo.fullName,
      phoneNumber: customerInfo.phoneNumber,
      email: customerInfo.email,
      address: {
        addressLine1: customerInfo.address.addressLine1,
        addressLine2: "",
      },
      zipcode: customerInfo.zipcode,
    },
    products,
    bypass: {
      kakaopay: { custom_message: `[F4H] 결제 진행 중입니다.` },
    },
  });

  const queryParams = new URLSearchParams({
    paymentId: response?.paymentId || "",
    code: response?.code || "",
    message: response?.message || "",
  }).toString();

  return { response, queryParams };
};

export const getPayment = async (paymentId: string) => {
  const response = await fetch(
    `https://api.portone.io/payments/${encodeURIComponent(paymentId)}`,
    {
      headers: { Authorization: `PortOne ${PORTONE_API_SECRET}` },
    }
  );

  if (!response.ok) throw new Error(`response: ${await response.json()}`);

  const payment = await response.json();

  return payment;
};

// 결제 완료 위한 결제내역 조회
export const verifyPayment = async (paymentId: string, cartItems: Item[]) => {
  // 1. 포트원 결제내역 단건조회 API 호출
  try {
    const payment = await getPayment(paymentId);

    // 2. 고객사 내부 주문 데이터의 가격과 실제 지불된 금액을 비교
    const totalPriceOrderItems = cartItems.reduce(
      (total, item) => total + item.size_quantity * item.price,
      0
    );
    const shippingCharge = totalPriceOrderItems > 30000 ? 0 : 2500;
    const totalPrice = totalPriceOrderItems + shippingCharge;

    if (totalPrice === payment.amount.total) {
      switch (payment.status) {
        case "PAID": {
          return payment;
        }
      }
    } else {
      throw new Error(`결제 금액이 불일치하여 위변조 시도가 의심됩니다.`);
    }
  } catch (error) {
    return error;
  }
};

export const usePayment = (paymentId: string, cartItems: Item[]) => {
  const {
    data: payment,
    isPending,
    isError,
    isSuccess,
  } = useQuery({
    queryKey: ["payment", paymentId],
    queryFn: () => verifyPayment(paymentId, cartItems),
    enabled: !!paymentId, // id가 있을 때만 쿼리를 실행
  });

  return { payment, isPending, isError, isSuccess };
};
