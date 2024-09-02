import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, UseFormProps, UseFormReturn } from "react-hook-form";
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

const categories = [
  { topCategory: null, label: "상의", value: "상의" },
  { topCategory: "상의", label: "탑&티셔츠", value: "탑&티셔츠" },
  { topCategory: "상의", label: "집업&자켓", value: "집업&자켓" },
  { topCategory: "상의", label: "맨투맨&후디", value: "맨투맨&후디" },
  //
  { topCategory: null, label: "스포츠 브라", value: "스포츠 브라" },
  { topCategory: "스포츠 브라", label: "저강도 운동", value: "저강도 운동" },
  { topCategory: "스포츠 브라", label: "중강도 운동", value: "중강도 운동" },
  { topCategory: "스포츠 브라", label: "고강도 운동", value: "고강도 운동" },
  //
  { topCategory: null, label: "하의", value: "하의" },
  { topCategory: "하의", label: "쇼츠", value: "쇼츠" },
  { topCategory: "하의", label: "레깅스", value: "레깅스" },
  { topCategory: "하의", label: "팬츠&조거", value: "팬츠&조거" },
] as const;

function CategoryComboBox(
  form: UseFormReturn<z.infer<typeof productFormSchema>>
) {
  return (
    <FormField
      control={form.control}
      name="category"
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel>상품 카테고리(종류)</FormLabel>
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
                    ? categories.find(
                        (category) => category.value === field.value
                      )?.label
                    : "카테고리 선택하기"}
                  <Icon className="ml-2 h-4 w-4 shrink-0 opacity-50">
                    {chevronUpDownIcon}
                  </Icon>
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
              <Command>
                <CommandInput
                  placeholder="카테고리 검색하기..."
                  className="h-9"
                />
                <CommandList>
                  <CommandEmpty>카테고리를 찾을 수 없습니다.</CommandEmpty>
                  <CommandGroup>
                    {categories.map((category) => (
                      <CommandItem
                        value={category.label}
                        key={category.value}
                        onSelect={() => {
                          form.setValue("category", category.value);
                        }}
                        disabled={category.topCategory === null}
                        className={cn(
                          category.topCategory === null
                            ? "font-bold text-white bg-gray-500"
                            : "cursor-pointer"
                        )}
                      >
                        {category.label}
                        <Icon
                          className={cn(
                            "ml-auto size-4",
                            category.value === field.value
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
export default CategoryComboBox;
