import CheckoutItems from "@/components/Checkout/CheckoutItems";
import ShippingForm from "@/components/Checkout/ShippingForm";
import { Button } from "@/components/ui/button";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export type CheckoutStage = "shipping" | "checkout";

const Checkout = () => {
  const navigate = useNavigate();
  const [stage, setStage] = useState<CheckoutStage>("shipping");

  const handleChangeStage = (stage: CheckoutStage) => {
    setStage(stage);
  };
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
            <ShippingForm onChangeStage={handleChangeStage} />
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
            <section>
              <div>2. 결제 종류 선택</div>
              <Separator orientation="horizontal" />
              <div className="flex justify-end">
                <Button className="w-40">결제 하기</Button>
              </div>
            </section>
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
