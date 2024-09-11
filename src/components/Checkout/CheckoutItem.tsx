import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { CardDescription, CardTitle } from "@/components/ui/card";
import { Item } from "@/context/CartContext";

interface CheckoutItemProps {
  item: Item;
}

const CheckoutItem = ({ item }: CheckoutItemProps) => {
  const productPrice = (item.size_quantity * item.price).toLocaleString();

  return (
    <section
      aria-label="주문 상품"
      className="flex flex-row justify-start w-full space-x-5"
    >
      <Avatar
        aria-label="주문 상품 사진"
        className="w-24 h-24 rounded-none border-[1px] bg-white"
      >
        <AvatarImage
          src={item.image}
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
        className="flex flex-col w-full space-y-2"
      >
        <CardTitle className="text-sm">{item.name || "상품명"}</CardTitle>
        <div className="flex flex-row space-x-2 items-center text-sm text-muted-foreground">
          <CardDescription>{item.color || "컬러"}</CardDescription>
          <Separator orientation="vertical" className="bg-gray-400 h-[12px]" />
          <CardDescription>{item.size}</CardDescription>
          <Separator orientation="vertical" className="bg-gray-400 h-[12px]" />
          <CardDescription>{item.size_quantity} 개</CardDescription>
        </div>
        <CardTitle className="text-sm">{productPrice || "가격"} 원</CardTitle>
      </div>
    </section>
  );
};

export default CheckoutItem;
