import { useReducePreQuantity } from "@/api/orderApi";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useAuth } from "@/hooks/useAuth";
import { useCart } from "@/hooks/useCart";
import {
  CustomerInfo,
  OrderProductType,
  ShippingDataType,
} from "@/pages/Checkout/Checkout";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

export type PreReducedItem = {
  productSizesId: string;
  orderQuantity: number;
};

const FormSchema = z.object({
  method: z.enum(["kakao"], {
    required_error: "결제 수단을 선택하세요.",
  }),
});

interface CheckoutMethodForm {
  onPay: (customerInfo: CustomerInfo, products: OrderProductType[]) => void;
  shippingData?: ShippingDataType;
}
const CheckoutMethodForm = ({ onPay, shippingData }: CheckoutMethodForm) => {
  const navigate = useNavigate();
  const { authId } = useAuth();
  const { cartItems, reducedItems } = useCart();
  const { mutateReducePreQuantity } = useReducePreQuantity();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit = (values: z.infer<typeof FormSchema>) => {
    if (!authId) return;
    if (!cartItems) return;
    if (!shippingData) return;

    const customerInfo = {
      customerId: authId,
      fullName: shippingData.name,
      phoneNumber: shippingData.phone,
      email: shippingData.email,
      address: {
        addressLine1: shippingData.address,
        addressLine2: "",
      },
      zipcode: shippingData.postal_code,
      method: values.method,
    };

    const products = cartItems.map((item) => ({
      id: item.id,
      name: item.name,
      amount: item.price * item.size_quantity,
      quantity: item.size_quantity,
    }));

    //재고 우선 감소
    mutateReducePreQuantity(reducedItems);
    //결제 요청
    onPay(customerInfo, products);
  };

  return (
    <CardContent className="flex flex-col p-0 px-5">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="method"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>*결제 종류 선택</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="kakao" />
                      </FormControl>
                      <FormLabel className="font-normal">카카오페이</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <section className="flex flex-row justify-end pt-5">
            <div className="flex gap-5 min-w-40">
              <Button
                variant={"outline"}
                className="w-40"
                type="button"
                onClick={() => navigate(-1)}
              >
                취소
              </Button>
              <Button className="w-40" type="submit">
                결제하기
              </Button>
            </div>
          </section>
        </form>
      </Form>
    </CardContent>
  );
};

export default CheckoutMethodForm;
