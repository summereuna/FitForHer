import { useOrder, useReIncreasePreQuantity } from "@/api/orderApi";
import { usePayment } from "@/api/paymentApi";
import ItemNotFound from "@/components/ItemNotFound";
import { CardTitle } from "@/components/ui/card";
import { useCart } from "@/hooks/useCart";
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
    useOrder();

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
  }, [isSuccess, payment, clearCart, mutateCreateOrder]); //cartItems 이거 넣음 무한렌더링 발생함

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
        <ItemNotFound description={message} />
      </section>
    );
  }

  return (
    <section className="flex justify-center items-center w-full h-full">
      <CardTitle>결제 중입니다...</CardTitle>
    </section>
  );
};

export default CheckoutRedirect;
