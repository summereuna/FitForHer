import { FC } from "react";
import { useFieldArray, UseFormReturn } from "react-hook-form";
import { z } from "zod";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import SizeComboBox from "./SizeComboBox"; // SizeComboBox 컴포넌트 import
import { productFormSchema } from "@/schemas/productFormSchema";
import { Icon } from "@/components/Icon";
import { xIcon } from "@/shared/icons";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface SizesSelectProps {
  form: UseFormReturn<z.infer<typeof productFormSchema>>;
}

const SizesSelect: FC<SizesSelectProps> = ({ form }) => {
  const { fields, append, remove } = useFieldArray({
    name: "sizes",
    control: form.control,
  });

  return (
    <div className="flex flex-col space-y-3">
      <FormLabel>상품 사이즈별 재고 수량</FormLabel>
      <FormDescription className="mb-3">
        {`상품 사이즈별 재고 수량을 등록하세요. 단일 사이즈 상품은 FREE 사이즈를 선택하세요.`}
      </FormDescription>
      {fields.map((field, index) => (
        <div key={field.id} className="flex flex-row items-center space-x-3">
          <div className="w-full flex flex-row space-x-3">
            <SizeComboBox form={form} index={index} />
            <FormField
              control={form.control}
              name={`sizes.${index}.stock_quantity`}
              render={({ field }) => (
                <FormItem>
                  {/* <FormLabel className={index !== 0 ? "sr-only" : ""}>
                    재고 수량
                  </FormLabel> */}
                  <FormControl>
                    <div className="relative w-[200px]">
                      <Input
                        type="number"
                        placeholder="재고 수량"
                        {...field}
                        onChange={(e) => field.onChange(e.target.valueAsNumber)}
                        // onChange={(e) => {
                        //   const value = e.target.valueAsNumber;
                        //   // NaN 체크 및 값 업데이트
                        //   if (!isNaN(value)) {
                        //     field.onChange(value);
                        //   }
                        // }}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              aria-label="사이즈 삭제 버튼"
              type="button"
              variant="outline"
              onClick={() => remove(index)}
              className="p-2"
            >
              <Icon className="size-6 text-gray-400 transition duration-250 ease-linear hover:text-black">
                {xIcon}
              </Icon>
            </Button>
          </div>
        </div>
      ))}
      <div className="space-x-3">
        <Button
          aria-label="사이즈 추가 버튼"
          type="button"
          variant="outline"
          size="sm"
          onClick={() => append({ size: "FREE", stock_quantity: 100 })}
        >
          사이즈 추가하기
        </Button>
        <Button
          aria-label="사이즈 전체 삭제 버튼"
          type="button"
          variant="outline"
          size="sm"
          onClick={() => form.resetField("sizes")}
        >
          전체 삭제하기
        </Button>
      </div>
    </div>
  );
};

export default SizesSelect;
