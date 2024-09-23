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
import { categories } from "@/shared/data/categories";

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
                  aria-label="카테고리 종류 선택"
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
