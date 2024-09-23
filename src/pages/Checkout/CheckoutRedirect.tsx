import { useCreateOrder, useReIncreasePreQuantity } from "@/api/orderApi";
import { usePayment } from "@/api/paymentApi";
import ItemNotFound from "@/components/ItemNotFound";
import { CardTitle } from "@/components/ui/card";
import { useCart } from "@/hooks/useCart";
import MetaTag from "@/components/MetaTag";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const CheckoutRedirect = () => {
  const { mutateReIncreasePreQuantity } = useReIncreasePreQuantity();
  const { cartItems, reducedItems, clearCart } = useCart();

  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const paymentId = queryParams.get("paymentId");
  const code = queryParams.get("code");
  const message = queryParams.get("message");

  const { payment, isError, isSuccess } = usePayment(
    paymentId as string,
    cartItems
  );

  const { mutateCreateOrder, orderData, isErrorOrder, isSuccessOrder } =
    useCreateOrder();

  //이 페이지에선 cartItems이 바뀔 일이 없으므로 eslint 무시하도록 하겠음
  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    if (isSuccess && payment && payment.status === "PAID") {
      const newOrder = {
        customer_id: payment.customer.id,
        name: payment.orderName,
        payment_id: payment.id,
        total_amount: payment.amount.total,
      };
      mutateCreateOrder({ newOrder, cartItems });
      clearCart();
    }
  }, [isSuccess, payment, clearCart, mutateCreateOrder]);
  //clearCart 함수 내부에서 cartItems 배열을 초기화 하고 있기 때문에
  //cartItems를 디펜던시에 포함하면 무한렌더링 발생하므로 뺌, 종속성일 필요도 없고

  useEffect(() => {
    if (isError) {
      mutateReIncreasePreQuantity(reducedItems); // 결제 실패 시 재고 복구
      navigate("/checkout/order/fail", { replace: true });
    }
  }, [isError, reducedItems, mutateReIncreasePreQuantity, navigate]);

  useEffect(() => {
    if (isErrorOrder) {
      navigate("/checkout/order/fail", { replace: true });
    }
  }, [navigate, isErrorOrder]);

  useEffect(() => {
    if (isSuccessOrder) {
      navigate(`/checkout/order/success/${orderData}`, { replace: true });
    }
  }, [navigate, isSuccessOrder, orderData]);

  if (code && message) {
    return (
      <section className="flex justify-center items-center w-full h-full">
        <MetaTag title="결제 오류" description="결제 오류 페이지입니다." />
        <ItemNotFound description={message} />
      </section>
    );
  }

  return (
    <section className="flex justify-center items-center w-full h-full">
      <MetaTag
        title="주문 결제"
        description="주문 결제 페이지입니다. 장바구니에 담은 상품을 확인하고, 안전하게 결제를 진행하세요."
      />
      <CardTitle>결제 중입니다...</CardTitle>
    </section>
  );
};

export default CheckoutRedirect;
