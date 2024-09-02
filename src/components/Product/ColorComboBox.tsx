import { UseFormReturn } from "react-hook-form";
import { z } from "zod";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Icon } from "@/components/Icon";
import { checkIcon, chevronUpDownIcon } from "@/shared/icons";
import { productFormSchema } from "@/schemas/productFormSchema";

const colors = [
  { label: "검정색", value: "검정색" },
  { label: "회색", value: "회색" },
  { label: "흰색", value: "흰색" },
  { label: "빨간색", value: "빨간색" },
  { label: "주황색", value: "주황색" },
  { label: "노란색", value: "노란색" },
  { label: "베이지", value: "베이지" },
  { label: "초록색", value: "초록색" },
  { label: "카키", value: "카키" },
  { label: "하늘색", value: "하늘색" },
  { label: "파란색", value: "파란색" },
  { label: "남색", value: "남색" },
  { label: "보라색", value: "보라색" },
  { label: "분홍색", value: "분홍색" },
] as const;

function ColorComboBox(form: UseFormReturn<z.infer<typeof productFormSchema>>) {
  return (
    <FormField
      control={form.control}
      name="color"
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel>상품 컬러(색상)</FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant="outline"
                  role="combobox"
                  className={cn(
                    "w-[200px] justify-between",
                    !field.value && "text-muted-foreground"
                  )}
                >
                  {field.value
                    ? colors.find((color) => color.value === field.value)?.label
                    : "컬러 선택하기"}
                  <Icon className="ml-2 h-4 w-4 shrink-0 opacity-50">
                    {chevronUpDownIcon}
                  </Icon>
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
              <Command>
                <CommandInput placeholder="컬러 검색하기..." className="h-9" />
                <CommandList>
                  <CommandEmpty>컬러를 찾을 수 없습니다.</CommandEmpty>
                  <CommandGroup>
                    {colors.map((color) => (
                      <CommandItem
                        value={color.label}
                        key={color.value}
                        onSelect={() => {
                          form.setValue("color", color.value);
                        }}
                        className="cursor-pointer"
                      >
                        {color.label}
                        <Icon
                          className={cn(
                            "ml-auto size-4",
                            color.value === field.value
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        >
                          {checkIcon}
                        </Icon>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>

          <FormMessage />
        </FormItem>
      )}
    />
  );
}
export default ColorComboBox;
