import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { Enums } from "@/types/database.types";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

interface CheckoutItemProps {
  image: string;
  name: string;
  color: string;
  size: Enums<"product_size">;
  size_quantity: number;
  price: number;
  productId?: string;
  brandName?: string;
}

const CheckoutItem = ({
  image,
  name,
  color,
  size,
  size_quantity,
  price,
  productId,
  brandName,
}: CheckoutItemProps) => {
  const productPrice = (size_quantity * price).toLocaleString();
  const navigate = useNavigate();

  return (
    <CardContent
      aria-label="주문 상품"
      className={cn(
        "p-0 m-0 flex flex-row justify-start w-full space-x-5",
        productId &&
          "p-2 cursor-pointer transition duration-150 ease-linear hover:bg-muted"
      )}
      onClick={() => {
        if (productId) navigate(`/product/${productId}`);
      }}
    >
      <Avatar
        aria-label="주문 상품 사진"
        className="w-24 h-24 rounded-none border-[1px] bg-white"
      >
        <AvatarImage
          src={image}
          alt="상품 대표 사진"
          className="object-cover"
        />
        <AvatarFallback className="rounded-none">
          <Avatar className="w-full h-full rounded-none bg-white-200" />
          <Skeleton className="w-full h-full rounded-none" />
        </AvatarFallback>
      </Avatar>
      <div
        aria-label="주문 상품 정보"
        className="flex flex-col w-full space-y-1"
      >
        {brandName && (
          <CardTitle className="text-sm">{brandName || "브랜드명"}</CardTitle>
        )}
        <CardTitle className="text-sm">{name || "상품명"}</CardTitle>
        <div className="flex flex-row space-x-2 items-center text-sm text-muted-foreground">
          <CardDescription>{color || "컬러"}</CardDescription>
          <Separator orientation="vertical" className="bg-gray-400 h-[12px]" />
          <CardDescription>{size}</CardDescription>
          <Separator orientation="vertical" className="bg-gray-400 h-[12px]" />
          <CardDescription>{size_quantity} 개</CardDescription>
        </div>
        <CardTitle className="text-sm">{productPrice || "가격"} 원</CardTitle>
      </div>
    </CardContent>
  );
};

export default CheckoutItem;
