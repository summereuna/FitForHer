import { useProductDetail } from "@/api/customerProductApi";
import { CartDrawer } from "@/components/Cart/CartDrawer";
import { Icon } from "@/components/Icon";
import RelatedProducts from "@/components/RelatedProducts";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Skeleton } from "@/components/ui/skeleton";
import { useCart } from "@/hooks/useCart";
import {
  getKoreanCategoryName,
  getOnlyRepresentativePhoto,
  sortProductImages,
} from "@/lib/utils";
import { cartFormSchema } from "@/schemas/cartFormSchema";
import { wishIcon } from "@/shared/icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { NavLink, Outlet, useParams } from "react-router-dom";
import { z } from "zod";

function ProductDetail() {
  const { id } = useParams();
  const { data, isSuccess } = useProductDetail(id as string);
  const { addCartItem } = useCart();
  const imageArr = data?.product_images?.map((item) => item.image_url);
  const sortedImages = imageArr && sortProductImages(imageArr!);

  //-------------------------------------------------------------
  const [presentImageIndex, setPresentImageIndex] = useState(0);

  const handlePrevImage = () => {
    if (sortedImages) {
      setPresentImageIndex((prev) =>
        prev === 0 ? sortedImages.length - 1 : prev - 1
      );
    }
  };
  const handleNextImage = () => {
    if (sortedImages) {
      setPresentImageIndex((prev) =>
        prev === sortedImages.length - 1 ? 0 : prev + 1
      );
    }
  };
  //-------------------------------------------------------------

  const [isAddedItem, setIsAddedItem] = useState(false);

  const handleChangeIsAddedItem = useCallback(() => {
    setIsAddedItem(false);
  }, []);

  const form = useForm<z.infer<typeof cartFormSchema>>({
    resolver: zodResolver(cartFormSchema),
    defaultValues: {
      size: "",
      size_quantity: 1,
    },
  });

  const onSubmit = (values: z.infer<typeof cartFormSchema>) => {
    if (!data) return;

    const getSize = data.product_sizes.find(
      (size) => size.size === values.size
    );

    if (!getSize) return;

    const newCartItem = {
      id: data.id,
      name: data.name,
      description: data.description,
      image: getOnlyRepresentativePhoto(data.product_images)!,
      color: data.color,
      price: data.price,
      size: values.size,
      size_quantity: values.size_quantity,
      product_sizes_id: getSize.id,
    };

    if (!newCartItem) return;

    //contextApi로 장바구니에 아이템 추가하기
    addCartItem(newCartItem);
    //버튼 상태 바꾸기
    setIsAddedItem(true);
  };

  //페이지 언마운트시 isAddedItem 상태 클린업
  //같은 라우트 페이지로 이동시에도 적용되도록 id 의존성 배열에 추가
  useEffect(() => {
    return () => {
      setIsAddedItem(false);
    };
  }, [id]);

  // console.log("폼 에러:", form.formState.errors);
  return (
    <div className="flex flex-col space-y-10">
      {isSuccess && data && (
        <section className="flex w-full">
          <div className="w-full flex flex-col md:flex-row space-x-0 space-y-5 md:space-x-10 md:space-y-0">
            <section
              aria-label="상품 사진"
              className="w-full h-full md:h-[40rem] flex flex-row space-x-5"
            >
              <div
                aria-label="상품 사진들"
                className="flex flex-col h-full space-y-5"
              >
                {sortedImages &&
                  sortedImages.map((img, index) => (
                    <div key={index} className="flex size-20">
                      <Avatar className="w-full h-full rounded-none border-[1px] bg-white">
                        <AvatarImage
                          src={img}
                          alt="상품 사진"
                          className="object-cover cursor-pointer"
                          onClick={() => setPresentImageIndex(index)}
                        />
                        <AvatarFallback className="rounded-none">
                          <Avatar className="w-full h-full rounded-none bg-white-200" />
                          <Skeleton className="w-full h-full rounded-none" />
                        </AvatarFallback>
                      </Avatar>
                    </div>
                  ))}

                {/*  */}
              </div>
              <div
                aria-label="상품 대표 사진"
                className="relative w-full h-full"
              >
                <Avatar className="w-full h-full rounded-none border-[1px] bg-white">
                  {sortedImages && (
                    <AvatarImage
                      src={sortedImages[presentImageIndex]}
                      alt="상품 대표 사진"
                      className="object-cover"
                    />
                  )}
                  <AvatarFallback className="rounded-none">
                    <Avatar className="w-full h-full rounded-none bg-white-200" />
                    <Skeleton className="w-full h-full rounded-none" />
                  </AvatarFallback>
                </Avatar>
                <div className="absolute bottom-3 right-3 space-x-2">
                  <Button
                    variant="outline"
                    type="button"
                    onClick={handlePrevImage}
                    className="rounded-full size-9"
                  >
                    <div>
                      <ChevronLeftIcon className="size-5" />
                    </div>
                  </Button>
                  <Button
                    variant="outline"
                    type="button"
                    onClick={handleNextImage}
                    className="rounded-full size-9"
                  >
                    <div>
                      <ChevronRightIcon className="size-5" />
                    </div>
                  </Button>
                </div>
              </div>
            </section>
            {/*  */}
            <section
              aria-label="상품 정보 및 주문"
              className="w-full h-full space-y-10"
            >
              <section
                aria-label="상품 정보"
                className="flex flex-col w-full pt-5 text-sm space-y-3"
              >
                <div className="flex flex-row space-x-2 items-center text-base font-medium">
                  <p>{data.brands?.name || "브랜드"}</p>
                  <Badge
                    variant="outline"
                    className="bg-white opacity-70 text-xs flex justify-center "
                  >
                    {getKoreanCategoryName(
                      data.sub_categories?.name as string
                    ) || "서브 카테고리"}
                  </Badge>
                </div>
                <CardTitle className="text-xl">
                  {data.name || "상품명"}
                </CardTitle>
                <p className="text-base">{data.description || "상품 설명"}</p>
                <p className="text-base">{data.color || "컬러"}</p>

                <CardTitle className="text-xl">
                  {data.price.toLocaleString() || "가격"} 원
                </CardTitle>
              </section>
              {/*  */}
              {/*  */}
              <section className="flex flex-col space-y-5">
                {/*  */}
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="flex flex-col space-y-5"
                  >
                    <FormField
                      control={form.control}
                      name="size"
                      render={({ field }) => (
                        <FormItem className="space-y-1">
                          <FormLabel className="text-base font-medium">
                            사이즈 선택
                          </FormLabel>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value.size}
                              className="flex flex-row space-x-2 items-center text-muted-foreground w-full"
                            >
                              {data.product_sizes?.map((size) => (
                                <FormItem
                                  className="flex items-center"
                                  key={size.size}
                                >
                                  <FormControl>
                                    <RadioGroupItem
                                      value={size.size}
                                      id={size.size}
                                      className="peer sr-only"
                                    />
                                  </FormControl>
                                  <FormLabel
                                    htmlFor={size.size}
                                    className="w-full flex flex-col items-center space-y-2 border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                                  >
                                    <span className="text-base">
                                      {size.size}
                                    </span>
                                    <span className="text-xs flex flex-row justify-center flex-wrap">
                                      <span>남은 수량</span>
                                      <span>({size.stock_quantity})</span>
                                    </span>
                                  </FormLabel>
                                </FormItem>
                              ))}
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    {!isAddedItem && (
                      <Button type="submit" size={"lg"} className="w-full">
                        장바구니 추가
                      </Button>
                    )}
                    {isAddedItem && (
                      <CartDrawer
                        isInNav={false}
                        onChangeIsAddedItem={handleChangeIsAddedItem}
                      />
                    )}
                  </form>
                </Form>
                {/*  */}
                <Button
                  variant={"outline"}
                  size={"lg"}
                  className="w-full space-x-2"
                >
                  <span>위시리스트</span>
                  <Icon className="size-5">{wishIcon}</Icon>
                </Button>
              </section>
            </section>
            {/*  */}
          </div>
        </section>
      )}
      <section className="flex flex-col w-full h-full">
        <nav aria-label="상품 탭">
          <ul className="w-full flex justify-between">
            <div className="w-full">
              <NavLink
                to="review"
                className={({ isActive }) =>
                  `w-full flex justify-center py-2 transition duration-200 ease-in-out ${
                    isActive ? "border-[1px] border-black" : "border-[1px]"
                  }`
                }
              >
                리뷰
              </NavLink>
            </div>
            <div className="w-full">
              <NavLink
                to="qna"
                className={({ isActive }) =>
                  `w-full flex justify-center py-2 transition duration-200 ease-in-out ${
                    isActive ? "border-[1px] border-black" : "border-[1px]"
                  }`
                }
              >
                QnA
              </NavLink>
            </div>
          </ul>
        </nav>
        <section className="w-full h-full border-[1px] border-t-transparent ">
          <Outlet />
        </section>
      </section>
      {isSuccess && data && (
        <section className="flex flex-col space-y-5 pb-5">
          <CardTitle className="text-xl">추천 상품</CardTitle>
          <RelatedProducts
            subCategoryName={data?.sub_categories?.name as string}
          />
        </section>
      )}
    </div>
  );
}

export default ProductDetail;
