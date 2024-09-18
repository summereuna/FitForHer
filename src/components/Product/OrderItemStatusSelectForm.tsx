// import { toast } from "@/components/hooks/use-toast"
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Enums } from "@/types/database.types";
import { UpdateOrderItemStatusRequest } from "@/types/order.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface Status {
  label: Enums<"order_item_status">;
  value: string;
}

interface OrderItemStatusSelectFormProps {
  dbStatus: Enums<"order_item_status">;
  statusList: readonly Status[];
  onChangeStatus: ({
    orderItemId,
    newStatus,
  }: UpdateOrderItemStatusRequest) => void;
  orderItemId: string;
}

const FormSchema = z.object({
  status: z.enum([
    "shipment_pending",
    "shipment_progressing",
    "shipment_complete",
    "order_confirmed",
    "order_cancelled",
  ]),
});

const OrderItemStatusSelectForm = ({
  dbStatus,
  statusList,
  onChangeStatus,
  orderItemId,
}: OrderItemStatusSelectFormProps) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    //console.log(data);
    if (!data) return;
    if (!orderItemId) return;
    const updatedData = { orderItemId, newStatus: data.status };
    onChangeStatus(updatedData);
    // toast({
    //   title: "You submitted the following values:",
    //   description: (
    //     <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
    //       <code className="text-white">{JSON.stringify(data, null, 2)}</code>
    //     </pre>
    //   ),
    // })
  }

  useEffect(() => {
    if (dbStatus) {
      form.setValue("status", dbStatus);
      console.log("기본 세팅");
    }
  }, [dbStatus, form]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem className="w-[100px]">
              <Select
                onValueChange={(value) => {
                  field.onChange(value);
                  form.handleSubmit(onSubmit)(); // 자동으로 폼 제출
                }}
                value={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder={form.getValues("status")} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="min-w-[50px]">
                  {statusList.map((status) => (
                    <SelectItem key={status.label} value={status.label}>
                      {status.value}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};

export default OrderItemStatusSelectForm;
