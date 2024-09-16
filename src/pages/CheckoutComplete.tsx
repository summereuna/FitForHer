import { useOrder, useReIncreasePreQuantity } from "@/api/orderApi";
import { usePayment } from "@/api/paymentApi";
import CheckoutItem from "@/components/Checkout/CheckoutItem";
import ItemNotFound from "@/components/ItemNotFound";
import { Button } from "@/components/ui/button";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/hooks/useCart";
import { formatPhoneNumber } from "@/lib/utils";
import { OrderRequest } from "@/types/order.types";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const CheckoutComplete = () => {
  const { mutateReIncreasePreQuantity } = useReIncreasePreQuantity();
  const { cartItems, reducedItems, clearCart } = useCart();

  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const paymentId = queryParams.get("paymentId");
  const code = queryParams.get("code");
  const message = queryParams.get("message");

  const { payment, isPending, isError, isSuccess } = usePayment(
    paymentId as string,
    cartItems
  );

  const {
    mutateCreateOrder,
    orderData,
    isPendingOrder,
    isErrorOrder,
    isSuccessOrder,
  } = useOrder();

  useEffect(() => {
    if (isSuccess && payment && payment.status === "PAID") {
      //clearCart(); // 결제 성공 시 장바구니 비우기
    }
  }, [isSuccess, payment, clearCart, cartItems]);

  useEffect(() => {
    if (isError) {
      mutateReIncreasePreQuantity(reducedItems); // 결제 실패 시 재고 복구
    }
  }, [isError, reducedItems]);

  if (isPending) {
    return (
      <section className="flex justify-center items-center w-full h-full">
        <CardTitle>결제 중입니다...</CardTitle>
      </section>
    );
  }

  if (code && message) {
    return (
      <section className="flex justify-center items-center w-full h-full">
        <ItemNotFound description={message} />
      </section>
    );
  }

  if (isError) {
    return (
      <section className="flex justify-center items-center w-full h-full">
        <ItemNotFound description="결제에 실패했습니다." />
      </section>
    );
  }

  if (payment && isSuccess && orderData && isSuccessOrder) {
    return (
      <div className="flex flex-col space-y-10">
        <section className="flex flex-col items-center pt-10 space-y-5">
          <CardTitle>주문을 완료했습니다!</CardTitle>
          <CardDescription className="text-base">
            주문번호: {orderData.orderData.payment_id}
          </CardDescription>
        </section>
        <section className="grid grid-cols-1 gap-y-5 lg:gap-y-0 lg:grid-cols-3 lg:space-x-10">
          <section className="flex flex-col items-center col-span-2 space-y-5">
            <div className="flex flex-col w-full space-y-5">
              {/*  */}
              {/*  */}
              <CardHeader
                aria-label="헤더"
                className="flex flex-row items-center space-x-3 p-0"
              >
                <CardTitle>주문 상품</CardTitle>
              </CardHeader>
              <Separator orientation="horizontal" />
              <CardContent className="flex flex-col p-0 px-5">
                <section
                  aria-label="장바구니 상품 목록"
                  className="overflow-y-auto flex flex-col px-5 space-y-5 pb-5"
                >
                  {/* {orderData.orderItemsData.map((item) => (
                    <CheckoutItem key={`${item.id}`} item={item} />
                  ))} */}
                </section>
              </CardContent>
              <Separator orientation="horizontal" />
              {/*  */}
              {/*  */}
              <CardHeader
                aria-label="헤더"
                className="flex flex-row items-center space-x-3 p-0"
              >
                <CardTitle>배송지</CardTitle>
              </CardHeader>
              <Separator orientation="horizontal" />
              <CardContent className="flex flex-col p-0 px-5 space-y-5">
                {/* 배송지 정보 적기 */}
                <CardDescription>
                  고객이름: {payment.customer.name}
                </CardDescription>
                <CardDescription>
                  전화번호: {formatPhoneNumber(payment.customer.phoneNumber)}
                </CardDescription>
                <CardDescription>
                  이메일: {payment.customer.email}
                </CardDescription>
                <CardDescription>
                  주소 (우편번호): {payment.customer.address.oneLine}(
                  {payment.customer.zipcode})
                </CardDescription>
              </CardContent>
              <Separator orientation="horizontal" />
            </div>
          </section>

          {/*  */}
          {/*  */}
          <section className="col-span-1">
            <section className="flex flex-col p-0 gap-0">
              <CardHeader aria-label="결제 정보" className="space-y-5 p-0">
                <CardTitle className="text-2xl">결제 정보</CardTitle>
                <Separator orientation="horizontal" />
              </CardHeader>
              <CardContent className="flex flex-col p-0">
                <section aria-label="주문 금액" className="p-5 space-y-5">
                  <div className="flex flex-row justify-between">
                    <CardDescription className="text-base font-medium text-black">
                      주문 금액
                    </CardDescription>
                    <CardDescription className="text-base font-medium text-black">
                      총 {orderData.orderData.total_amount.toLocaleString()} 원
                    </CardDescription>
                  </div>
                  <div className="flex flex-row justify-between">
                    <CardDescription>상품 금액</CardDescription>
                    <CardDescription>
                      {orderData.orderData.total_amount > 30000
                        ? orderData.orderData.total_amount.toLocaleString()
                        : (
                            orderData.orderData.total_amount - 2500
                          ).toLocaleString()}
                    </CardDescription>
                  </div>
                  <div className="flex flex-row justify-between">
                    <CardDescription>배송비</CardDescription>
                    <CardDescription>
                      {orderData.orderData.total_amount > 30000
                        ? "무료"
                        : "2,500 원"}
                    </CardDescription>
                  </div>
                  <Separator orientation="horizontal" />
                  <div className="flex flex-row justify-between">
                    <CardDescription className="text-base font-medium text-black">
                      카카오페이 포인트 사용
                    </CardDescription>
                    <CardDescription className="text-base font-medium text-black">
                      {payment.amount.total.toLocaleString()} 원
                    </CardDescription>
                  </div>
                  <div className="flex flex-row justify-between">
                    <CardDescription className="text-base font-medium text-black">
                      총 결제 금액
                    </CardDescription>
                    <CardDescription className="text-base font-medium text-black">
                      총 {payment.amount.total.toLocaleString()} 원
                    </CardDescription>
                  </div>
                </section>
              </CardContent>
              <Separator orientation="horizontal" />
              {/*  */}
              {/*  */}
              <section className="flex flex-row justify-end pt-5">
                <div className="flex gap-5 min-w-40">
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={() => navigate("/my/order")}
                  >
                    구매 내역 보기
                  </Button>
                  <Button
                    type="button"
                    className="w-full"
                    onClick={() => navigate("/")}
                  >
                    확인
                  </Button>
                </div>
              </section>
              {/*  */}
              {/*  */}
            </section>
          </section>
          {/*  */}
          {/*  */}
        </section>
      </div>
    );
  }
};

export default CheckoutComplete;
