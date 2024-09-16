import { useReducePreQuantity, useReIncreasePreQuantity } from "@/api/orderApi";
import { pay } from "@/api/paymentApi";
import CheckoutItems from "@/components/Checkout/CheckoutItems";
import CheckoutMethodForm from "@/components/Checkout/CheckoutMethodForm";
import ShippingForm from "@/components/Checkout/ShippingForm";
import { CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/hooks/useCart";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export type OrderProductType = {
  id: string;
  name: string;
  amount: number;
  quantity: number;
};

export type ShippingDataType = {
  order_status: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  postal_code: string;
};

export type CustomerInfo = {
  customerId: string;
  fullName: string;
  phoneNumber: string;
  email: string;
  address: {
    addressLine1: string;
    addressLine2: string;
  };
  zipcode: string;
};

export type CheckoutStage = "shipping" | "checkout";

const Checkout = () => {
  const navigate = useNavigate();
  const [stage, setStage] = useState<CheckoutStage>("shipping");
  const [shippingData, setShippingData] = useState<ShippingDataType>();

  //shipping 에서 다음 단계로
  const handleSubmitShippingData = (
    stage: CheckoutStage,
    shippingData: ShippingDataType
  ) => {
    //단계 변경
    setStage(stage);
    setShippingData(shippingData);
  };

  const handlePay = async (
    customerInfo: CustomerInfo,
    products: OrderProductType[]
  ) => {
    try {
      const { queryParams } = await pay(customerInfo, products);
      // clearCart(); //여기서 하니까 나중에 비교를 못함

      if (queryParams) {
        navigate(`/checkout/payment-redirect?${queryParams}`);
      }
    } catch (error) {
      console.error("결제 처리 중 오류 발생:", error);
    }
  };

  // useEffect(() => {
  //   // localStorage에서 stage 정보를 불러옴
  //   // const savedStage = localStorage.getItem("orderStage");

  //   if (savedStage === "shipping" || savedStage === "checkout") {
  //     setStage(savedStage);
  //   } else {
  //     //처음 진입시 기본 값 shipping으로 설정
  //     localStorage.setItem("orderStage", "shipping");
  //   }
  // }, []);

  return (
    <section className="grid grid-cols-1 gap-y-5 lg:gap-y-0 lg:grid-cols-3 lg:space-x-10">
      <section className="flex flex-col items-center col-span-2 order-2 lg:order-1 space-y-5">
        <div className="flex flex-col w-full space-y-5">
          <div
            aria-label="헤더"
            className="flex flex-row items-center space-x-3 p-0"
          >
            <CardTitle
              className={cn(
                "text-2xl p-0",
                stage === "shipping" ? "text-black" : "text-gray-300"
              )}
            >
              배송정보
            </CardTitle>
          </div>
          <Separator orientation="horizontal" />
          {stage === "shipping" && (
            <ShippingForm onSubmitShippingData={handleSubmitShippingData} />
          )}

          <div
            aria-label="헤더"
            className="flex flex-row items-center space-x-3 p-0"
          >
            <CardTitle
              className={cn(
                "text-2xl p-0",
                stage === "checkout" ? "text-black" : "text-gray-300"
              )}
            >
              결제
            </CardTitle>
          </div>
          <Separator orientation="horizontal" />
          {stage === "checkout" && (
            <CheckoutMethodForm onPay={handlePay} shippingData={shippingData} />
          )}
        </div>
      </section>
      <section className="col-span-1 order-1 lg:order-2">
        <CheckoutItems />
      </section>
    </section>
  );
};

export default Checkout;
