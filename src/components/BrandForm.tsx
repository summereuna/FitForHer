import {
  useCreateBrand,
  useUpdateBrand,
  useUploadBrandLogo,
} from "@/api/brandApi";
import { Icon } from "@/components/Icon";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
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
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { BrandFormSchema } from "@/schemas/brandSchema";
import { xIcon } from "@/shared/icons";
import { Brands } from "@/types/brand.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";

type BrandFormValues = z.infer<typeof BrandFormSchema>;

interface BrandFormProps {
  brandData?: Brands | null;
}

function BrandForm({ brandData }: BrandFormProps) {
  const { mutateCreateBrand } = useCreateBrand();
  const { mutateUpdateBrand } = useUpdateBrand();
  const { mutateUploadBrandLogo, isSuccessBrandLogo, responseBrandLogoUrl } =
    useUploadBrandLogo();

  const defaultValues: Partial<BrandFormValues> = {
    name: "",
    description: "",
    logo_url: "",
    // web_key: "",
    official_website: [{ value: "" }],
  };

  const form = useForm<BrandFormValues>({
    resolver: zodResolver(BrandFormSchema),
    defaultValues,
    mode: "onChange",
  });

  const { fields, append, remove } = useFieldArray({
    name: "official_website",
    control: form.control,
  });

  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const fileUrl = URL.createObjectURL(file);
      setImagePreview(fileUrl);

      mutateUploadBrandLogo(file);
    }
  };

  function onSubmit(data: BrandFormValues) {
    if (brandData) {
      const updateBrandData = {
        id: brandData.id, //업데이트시 기존 아이디 필수
        name: data.name,
        description: data.description || null, // undefined이면 null로
        logo_url: data.logo_url || null,
        official_website: data.official_website || null,
      };
      return mutateUpdateBrand(updateBrandData);
    }
    const newBrandData = {
      name: data.name,
    };
    mutateCreateBrand(newBrandData);

    // toast({
    //   title: "You submitted the following values:",
    //   description: (
    //     <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
    //       <code className="text-white">{JSON.stringify(data, null, 2)}</code>
    //     </pre>
    //   ),
    // });
  }

  useEffect(() => {
    if (brandData) {
      const data = {
        name: brandData.name,
        description: brandData.description || "",
        logo_url: brandData.logo_url || "",
        official_website:
          (brandData.official_website as { value?: string }[]) || [],
      };
      // console.log(brandData);
      setImagePreview(brandData.logo_url);

      form.reset(data);
    }
  }, [brandData, form]);

  useEffect(() => {
    if (isSuccessBrandLogo) {
      // 이미지 업로드 성공 후 가져와서 form에 넣기
      form.setValue("logo_url", responseBrandLogoUrl);
    }
  }, [isSuccessBrandLogo, responseBrandLogoUrl, form]);

  useEffect(() => {
    // 컴포넌트 언마운트 시 URL 해제
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>브랜드 이름</FormLabel>
              <FormControl>
                <Input placeholder="브랜드 이름을 입력하세요." {...field} />
              </FormControl>
              <FormDescription>브랜드 이름을 입력하세요.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {brandData && (
          <div className="space-y-8">
            <FormField
              control={form.control}
              name="logo_url"
              render={() => (
                <FormItem>
                  <FormLabel>브랜드 로고</FormLabel>

                  <div className="flex flex-row space-x-5 items-center">
                    <Avatar className="size-20 rounded-xl border-[1px] bg-white">
                      {imagePreview && (
                        <AvatarImage
                          src={imagePreview}
                          alt="브랜드 로고"
                          className="object-cover"
                        />
                      )}
                      <AvatarFallback className="rounded-xl">
                        <Avatar className="size-20 rounded-xl bg-white-200 border-[1px]" />
                        <Skeleton className="size-20 rounded-xl" />
                      </AvatarFallback>
                    </Avatar>
                    <FormControl>
                      <Input
                        type="file"
                        accept="image/*"
                        className="max-w-52"
                        onChange={handleFileChange}
                        // {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </div>
                  <FormDescription>
                    {`브랜드 로고를 업로드하세요. 등록된 로고는 판매 페이지에 표시됩니다.`}
                  </FormDescription>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>브랜드 설명</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="브랜드에 대한 설명을 입력하세요."
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    판매 페이지에 표시될 브랜드에 대한 설명을 입력하세요.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div>
              <FormLabel>홈페이지</FormLabel>
              <FormDescription className="mb-3">
                {`공식 홈페이지, 유튜브, 블로그, 소셜 미디어를 등록할 수 있어요.\n등록된 주소는 판매 페이지에 표시됩니다.`}
              </FormDescription>

              {fields.map((field, index) => (
                <div
                  key={index}
                  className="flex flex-row items-center space-x-3"
                >
                  {/* <div aria-label="사이트 종류" className="w-32">
                    <FormField
                      control={form.control}
                      name="web_key"
                      render={({ field }) => (
                        <FormItem>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="웹사이트를 선택하세요." />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="official">
                                공식 사이트
                              </SelectItem>
                              <SelectItem value="youtube">
                                유투브 채널
                              </SelectItem>
                              <SelectItem value="instagram">
                                인스타그램
                              </SelectItem>
                              <SelectItem value="x">X</SelectItem>
                            </SelectContent>
                          </Select>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div> */}
                  <div aria-label="웹 사이트" className="w-full">
                    <FormField
                      control={form.control}
                      key={field.id}
                      name={`official_website.${index}.value`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel
                            className={cn(index !== 0 && "sr-only")}
                          ></FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input placeholder="URL 주소" {...field} />
                              <button
                                aria-label="url 삭제 버튼"
                                onClick={() => remove(index)}
                              >
                                <Icon className="size-6 absolute top-2 right-2 text-gray-400 transition duration-250 ease-linear hover:text-black">
                                  {xIcon}
                                </Icon>
                              </button>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              ))}
              <div className="space-x-3">
                <Button
                  aria-label="url 등록 버튼"
                  type="button"
                  variant="outline"
                  size="sm"
                  className="mt-2"
                  onClick={() => append({ value: "" })}
                >
                  URL 등록하기
                </Button>
                <Button
                  aria-label="url 전체 삭제 버튼"
                  type="button"
                  variant="outline"
                  size="sm"
                  className="mt-2"
                  onClick={() => remove()}
                >
                  URL 전체 삭제하기
                </Button>
              </div>
            </div>
          </div>
        )}
        <Button type="submit">{brandData ? "수정하기" : "등록하기"}</Button>
      </form>
    </Form>
  );
}

export default BrandForm;
