import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { searchIcon } from "@/shared/icons";
import { Icon } from "@/components/Icon";

const SearchFormSchema = z.object({
  keyword: z.string().min(1, {
    message: "검색어를 입력하세요.",
  }),
});

export function SearchBar() {
  const form = useForm<z.infer<typeof SearchFormSchema>>({
    resolver: zodResolver(SearchFormSchema),
    defaultValues: {
      keyword: "",
    },
  });

  function onSubmit(keyword: z.infer<typeof SearchFormSchema>) {
    console.log(`${keyword.keyword}`);
    form.reset();
    // toast({
    //   title: "You submitted the following values:",
    //   description: (
    //     <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
    //       <code className="text-white">{JSON.stringify(data, null, 2)}</code>
    //     </pre>
    //   ),
    // });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="relative w-full flex flex-row"
      >
        <FormField
          control={form.control}
          name="keyword"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <Input placeholder={"검색"} {...field} />
              </FormControl>
              {/* <div className="absolute top-[2px] left-3"> */}
              {/* <FormMessage /> */}
              {/* </div> */}
            </FormItem>
          )}
        />
        <button
          type="submit"
          className="absolute right-2 top-2 text-gray-400 transition duration-200 ease-in-out hover:text-black focus-visible:text-black "
        >
          <Icon className="size-6">{searchIcon}</Icon>
        </button>
      </form>
    </Form>
  );
}
