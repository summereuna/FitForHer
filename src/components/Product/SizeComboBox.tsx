import { UseFormReturn } from "react-hook-form";
import { z } from "zod";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  FormControl,
  FormField,
  FormItem,
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
import { sizes } from "@/shared/data/sizes";

interface SizeComboBoxProps {
  form: UseFormReturn<z.infer<typeof productFormSchema>>;
  index: number;
}

function SizeComboBox({ form, index }: SizeComboBoxProps) {
  const sizeFieldName = `sizes.${index}.size` as `sizes.${number}.size`;

  return (
    <FormField
      control={form.control}
      name={sizeFieldName}
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  aria-label="상품 사이즈 선택"
                  variant="outline"
                  role="combobox"
                  className={cn(
                    "w-[200px] justify-between",
                    !field.value && "text-muted-foreground"
                  )}
                >
                  {field.value
                    ? sizes.find((size) => size.value === field.value)?.label
                    : "사이즈 선택하기"}
                  <Icon className="ml-2 h-4 w-4 shrink-0 opacity-50">
                    {chevronUpDownIcon}
                  </Icon>
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
              <Command>
                <CommandList>
                  <CommandGroup>
                    {sizes.map((size) => (
                      <CommandItem
                        value={size.label}
                        key={size.value}
                        onSelect={() => {
                          form.setValue(sizeFieldName, size.value);
                        }}
                        className="cursor-pointer"
                      >
                        {size.label}
                        <Icon
                          className={cn(
                            "ml-auto size-4",
                            size.value === field.value
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
export default SizeComboBox;
