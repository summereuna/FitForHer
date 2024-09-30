import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useState } from "react";
import { productFormSchema } from "@/schemas/productFormSchema";
import { useUploadProduct, useUploadProductImages } from "@/api/productApi";
import { cn, sortProductImages } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

import { useBrand } from "@/api/brandApi";
import { useAuth } from "@/hooks/useAuth";

import ColorComboBox from "@/components/Product/ColorComboBox";
import CategoryComboBox from "@/components/Product/CategoryComboBox";
import SizesSelect from "@/components/Product/SizesSelect";
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import {
  BrandProductByIdQueryRelations,
  UpdateProductRequest,
} from "@/types/product.types";

interface ProductFormProps {
  productData?: BrandProductByIdQueryRelations;
  onUpdateData?: (updatedDate: UpdateProductRequest) => void;
}

export function ProductForm({ productData, onUpdateData }: ProductFormProps) {
  const navigate = useNavigate();
  const { authId } = useAuth();
  const { brandData } = useBrand(authId as string);

  const form = useForm<z.infer<typeof productFormSchema>>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      color: "",
      sizes: [{ size: "FREE", stock_quantity: 0 }],
      category: "",
      imageUrls: [],
    },
    mode: "onChange",
  });

  const { mutateUploadProduct, isPendingProduct, isSuccessProduct } =
    useUploadProduct();

  const {
    mutateUploadProductImages,
    isSuccessProductImages,
    responseProductImagesUrl,
  } = useUploadProductImages();

  const [fileList, setFileList] = useState<File[]>([]);
  const [imagePreview, setImagePreview] = useState<string[] | []>([]);

  const handleFilesChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);

    // 기존 업로드된 파일 수와 새로 선택한 파일 수를 합산
    if (fileList.length + selectedFiles.length > 4) {
      alert("파일은 최대 4개까지만 업로드할 수 있습니다.");
      e.target.value = ""; //입력값 초기화
      return;
    }

    // 새로운 파일 리스트로 업데이트
    const newFileList = [...fileList, ...selectedFiles].slice(0, 4);
    setFileList(newFileList);

    // 새로운 파일에 대해서만 URL을 생성하여 프리뷰 업데이트
    const newImagePreviews = newFileList.map((file) =>
      URL.createObjectURL(file)
    );

    setImagePreview(newImagePreviews);

    //파일 리스트 전체 보내기
    mutateUploadProductImages(newFileList);

    // 파일 선택 후 입력 값 초기화
    e.target.value = "";
  };

  useEffect(() => {
    //기존 값 있는 경우 form 채우기
    if (productData) {
      const sortedImageUrls = sortProductImages(
        productData.product_images.map(
          (img: { image_url: string }) => img.image_url
        )
      );
      const data = {
        name: productData.name,
        description: productData.description,
        price: productData.price,
        color: productData.color,
        category: productData.sub_categories?.name,
        imageUrls: sortedImageUrls || [],
        sizes: productData.product_sizes || [
          { size: "FREE", stock_quantity: 0 },
        ],
      };

      setImagePreview(sortedImageUrls);

      form.reset(data);
    }
  }, [productData, form]);

  useEffect(() => {
    if (isSuccessProductImages) {
      // 이미지 업로드 성공 후 가져와서 form에 넣기
      form.setValue("imageUrls", responseProductImagesUrl as string[]);
    }
  }, [isSuccessProductImages, responseProductImagesUrl, form]);

  useEffect(() => {
    return () => {
      if (imagePreview) {
        imagePreview.forEach((preview) => {
          URL.revokeObjectURL(preview);
        });
      }
    };
  }, [imagePreview]);

  function onSubmit(values: z.infer<typeof productFormSchema>) {
    // 브랜드 아이디 넣어야 함
    if (!brandData) return;

    if (!productData) {
      const newProductData = {
        brand_id: brandData.id,
        category_id: values.category,
        color: values.color,
        description: values.description,
        name: values.name,
        price: values.price,
        sizes: values.sizes, //사이즈 테이블
        product_images: values.imageUrls, //이미지 테이블
      };

      mutateUploadProduct(newProductData);

      if (isSuccessProduct) {
        form.reset();
        setFileList([]); // 파일 리스트 초기화
        setImagePreview([]); // 이미지 프리뷰 초기화
      }
    } else {
      //업데이트시
      const updatedProductData = {
        id: productData.id,
        category_id: productData.category_id,
        category_name: values.category,
        color: values.color,
        description: values.description,
        name: values.name,
        price: values.price,
        sizes: values.sizes, //사이즈 테이블
        product_images: values.imageUrls, //이미지 테이블
      };
      onUpdateData?.(updatedProductData);

      form.reset();
      setFileList([]);
      setImagePreview([]);
    }
  }

  const handleCancel = () => {
    form.reset();
    setFileList([]);
    setImagePreview([]);
    navigate(-1);
  };
  return (
    <section>
      {/* className="lg:min-w-[80%]" */}
      <CardHeader className="space-y-4">
        <CardTitle>{!productData ? "상품 등록" : "상품 수정"}</CardTitle>
        <CardDescription>
          {!productData
            ? "판매할 상품을 등록하세요."
            : "상품 정보를 수정하세요."}
        </CardDescription>
        <Separator />
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-5 md:space-y-0 md:space-x-10 md:flex w-full"
          >
            <div aria-label="상품 사진" className="w-full">
              <FormField
                control={form.control}
                name="imageUrls"
                render={() => (
                  <FormItem className="space-y-5">
                    <div className="flex flex-col space-y-3">
                      <FormLabel htmlFor="imageUrls">
                        상품 사진 업로드
                      </FormLabel>
                      <FormDescription>
                        {`상품 사진을 업로드하세요. 최소 1개 이상, 최대 4개까지 업로드가 가능합니다.\n업로드된 사진은 순서대로 판매 페이지에 표시됩니다.\n`}
                      </FormDescription>
                      <FormMessage />
                      <FormControl>
                        <Input
                          id="imageUrls"
                          name="imageUrls"
                          type="file"
                          accept="image/*"
                          className="max-w-52"
                          multiple
                          // hidden
                          onChange={handleFilesChange}
                          disabled={fileList.length >= 4} //4개 되면 아예 비활성화
                        />
                      </FormControl>
                    </div>
                    <Separator />
                    <div
                      aria-label="상품 사진"
                      className="flex flex-row space-x-5 items-center"
                    >
                      {imagePreview.length === 0 && (
                        <div className="flex flex-row flex-wrap gap-5 items-center">
                          <Avatar className="size-52 bg-white-200 border-[1px]" />
                          <Avatar className="size-52 bg-white-200 border-[1px]" />
                          <Avatar className="size-52 bg-white-200 border-[1px]" />
                          <Avatar className="size-52 bg-white-200 border-[1px]" />
                        </div>
                      )}
                      {imagePreview.length > 0 && (
                        <div className="flex flex-row flex-wrap gap-5 justify-center items-center">
                          {imagePreview.map((imgUrl, index) => (
                            <Avatar
                              key={index}
                              className="size-52 border-[1px] bg-white relative"
                            >
                              <AvatarImage
                                src={imgUrl}
                                alt="상품 이미지"
                                className={cn(
                                  "size-52 object-cover object-center",
                                  index === 0 ? "border-black border-2" : ""
                                )}
                              />
                              {index === 0 && (
                                <Badge
                                  variant="outline"
                                  className="absolute top-2 left-2 bg-white opacity-80"
                                >
                                  대표사진
                                </Badge>
                              )}
                              <AvatarFallback>
                                <Skeleton className="size-52" />
                              </AvatarFallback>
                            </Avatar>
                          ))}
                        </div>
                      )}
                    </div>
                  </FormItem>
                )}
              />
            </div>
            <div aria-label="상품 나머지 정보" className="w-full space-y-5">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>상품 이름</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="판매 페이지에 표시될 상품 이름을 입력하세요."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>상품 설명</FormLabel>
                    <FormControl>
                      <Textarea
                        className="resize-none"
                        placeholder="상품에 대한 설명을 입력하세요."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div
                aria-label="상품 옵션 선택"
                className="flex flex-row space-x-3"
              >
                <CategoryComboBox {...form} />
                <ColorComboBox {...form} />
              </div>
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>가격</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="상품의 가격을 입력하세요. (*가격은 0보다 큰 숫자여야 합니다.)"
                        {...field}
                        onChange={(e) => field.onChange(e.target.valueAsNumber)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <SizesSelect form={form} />

              <Separator />
              <FormDescription>
                *같은 상품이더라도 색상이 다르면 상품을 별도로 등록해야 합니다.
              </FormDescription>
              <CardFooter className="flex space-x-3 justify-end">
                <Button
                  aria-label="상품 등록 취소 버튼"
                  variant="outline"
                  type="button"
                  disabled={isPendingProduct}
                  onClick={handleCancel}
                >
                  취소하기
                </Button>
                <Button
                  type="submit"
                  disabled={isPendingProduct}
                  aria-label={
                    !productData ? "상품 등록 버튼" : "상품 수정 버튼"
                  }
                >
                  {!productData ? "등록하기" : "수정하기"}
                </Button>
              </CardFooter>
            </div>
          </form>
        </Form>
      </CardContent>
    </section>
  );
}
