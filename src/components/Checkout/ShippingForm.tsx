import { Button } from "@/components/ui/button";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Separator } from "@/components/ui/separator";
import { CheckoutStage, ShippingDataType } from "@/pages/Checkout";
import { shippingFormSchema } from "@/schemas/shippingFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

interface ShippingFormProps {
  onSubmitShippingData: (
    stage: CheckoutStage,
    shippingData: ShippingDataType
  ) => void;
}

const ShippingForm = ({ onSubmitShippingData }: ShippingFormProps) => {
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof shippingFormSchema>>({
    resolver: zodResolver(shippingFormSchema),
    defaultValues: {
      order_status: "order_completed",
      name: "",
      email: "",
      phone0: "",
      phone1: "",
      phone2: "",
      address: "",
      postal_code: "",
    },
  });

  const onSubmit = (values: z.infer<typeof shippingFormSchema>) => {
    const shippingData = {
      order_status: values.order_status,
      name: values.name,
      email: values.email,
      phone: values.phone0 + values.phone1 + values.phone2,
      address: values.address,
      postal_code: values.postal_code,
    };

    console.log(shippingData);
    onSubmitShippingData("checkout", shippingData);
  };

  // console.log(form.formState.errors);
  return (
    <CardContent className="flex flex-col p-0 px-5">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="w-24" htmlFor="name">
                  *이름 (2글자 이상)
                </FormLabel>
                <div className="flex flex-col space-y-1">
                  <FormControl>
                    <Input
                      className="w-80"
                      placeholder="이름을 입력하세요."
                      id="name"
                      type="text"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </div>
              </FormItem>
            )}
          />
          <section className="flex flex-col space-y-5 md:space-y-0 md:flex-row md:space-x-10">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="w-24" htmlFor="email">
                    *이메일
                  </FormLabel>
                  <div className="flex flex-col space-y-1">
                    <FormControl>
                      <Input
                        className="w-80"
                        placeholder="이메일을 입력하세요."
                        id="email"
                        type="email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </div>
                </FormItem>
              )}
            />

            <div className="space-y-2">
              <FormLabel className="w-24" htmlFor="phone0">
                *휴대전화번호
              </FormLabel>
              <div className="flex flex-col space-y-1">
                <div className="flex flex-row items-center w-80 space-x-3">
                  <FormField
                    control={form.control}
                    name="phone0"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            className="w-full"
                            id="phone0"
                            minLength={3}
                            maxLength={3}
                            {...field}
                          />
                        </FormControl>
                        {/* <FormMessage className="text-xs" /> */}
                      </FormItem>
                    )}
                  />
                  <Separator className="w-2" />
                  <FormField
                    control={form.control}
                    name="phone1"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            className="w-full"
                            id="phone1"
                            minLength={4}
                            maxLength={4}
                            {...field}
                          />
                        </FormControl>
                        {/* <FormMessage className="text-xs" /> */}
                      </FormItem>
                    )}
                  />
                  <Separator className="w-2" />
                  <FormField
                    control={form.control}
                    name="phone2"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            className="w-full"
                            id="phone2"
                            minLength={4}
                            maxLength={4}
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
                {(form.formState.errors.phone0 ||
                  form.formState.errors.phone1 ||
                  form.formState.errors.phone2) && (
                  <p className="text-xs font-medium text-destructive">
                    {form.formState.errors.phone0?.message ||
                      form.formState.errors.phone1?.message ||
                      form.formState.errors.phone2?.message}
                  </p>
                )}
              </div>
            </div>
          </section>
          <section className="flex flex-col space-y-5 md:space-y-0 md:flex-row md:space-x-10">
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="w-24" htmlFor="address">
                    *주소
                  </FormLabel>
                  <div className="flex flex-col space-y-1">
                    <FormControl>
                      <Input
                        className="w-80"
                        placeholder="주소를 입력하세요."
                        id="address"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="postal_code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="w-24" htmlFor="postal_code">
                    *우편 번호 (5자리)
                  </FormLabel>
                  <div className="flex flex-col space-y-1">
                    <FormControl>
                      <InputOTP maxLength={5} {...field}>
                        <InputOTPGroup>
                          <InputOTPSlot index={0} />
                          <InputOTPSlot index={1} />
                          <InputOTPSlot index={2} />
                          <InputOTPSlot index={3} />
                          <InputOTPSlot index={4} />
                        </InputOTPGroup>
                      </InputOTP>
                    </FormControl>
                    <FormMessage className="text-xs" />
                    {/* <FormMessage>{isError && errorMessage}</FormMessage> */}
                  </div>
                </FormItem>
              )}
            />
          </section>
          <section className="flex flex-row justify-end pt-5">
            <div className="flex gap-5 min-w-40">
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={() => navigate(-1)}
              >
                취소
              </Button>
              <Button type="submit" className="w-full">
                저장 및 계속
              </Button>
              {/* 
                <Alert
                  type={"submit"}
                  variant={"default"}
                  buttonChildren={"가입하기"}
                  title={"회원가입"}
                  description={`으로 가입하시나요?`}
                /> */}
            </div>
          </section>
        </form>
      </Form>
    </CardContent>
  );
};

export default ShippingForm;
