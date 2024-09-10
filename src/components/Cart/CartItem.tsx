import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { CardDescription, CardTitle } from "@/components/ui/card";
import { Item } from "@/context/CartContext";
import { Icon } from "@/components/Icon";
import { xIcon } from "@/shared/icons";
import { Input } from "@/components/ui/input";
import { useState } from "react";

interface CartItemProps {
  item: Item;
  onUpdateCartItem: (newItem: Item) => void;
  onDeleteCartItem: (productId: string, size: string) => void;
}

const CartItem = ({
  item,
  onUpdateCartItem,
  onDeleteCartItem,
}: CartItemProps) => {
  const [quantity, setQuantity] = useState(item.size_quantity);

  const changeQuantity = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = +e.target.value;
    setQuantity(newQuantity);

    const newQuantityItem = { ...item, size_quantity: newQuantity };
    onUpdateCartItem(newQuantityItem);
  };

  const productPrice = (quantity * item.price).toLocaleString();

  return (
    <section
      aria-label="카트 상품"
      className="p-5 flex flex-row justify-start w-full space-x-5 transition duration-200 ease-linear hover:bg-muted"
    >
      <Avatar
        aria-label="카트 상품 사진"
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
        aria-label="카트 상품 정보"
        className="flex flex-col w-full space-y-2"
      >
        <CardTitle className="text-sm">{item.name || "상품명"}</CardTitle>
        <div className="flex flex-row space-x-2 items-center text-sm text-muted-foreground">
          <CardDescription>{item.color || "컬러"}</CardDescription>
          <Separator orientation="vertical" className="bg-gray-400 h-[12px]" />
          <CardDescription>{item.size} </CardDescription>
          <Separator orientation="vertical" className="bg-gray-400 h-[12px]" />
          <div className="flex flex-row items-center space-x-2">
            <Input
              type="number"
              value={quantity}
              className="w-12 h-8 p-1 flex"
              onChange={changeQuantity}
              min={1}
              max={5}
            />
            <CardDescription>개</CardDescription>
          </div>
        </div>
        <CardTitle className="text-sm">{productPrice || "가격"} 원</CardTitle>
      </div>
      <button
        onClick={() => onDeleteCartItem(item.id, item.size)}
        className="size-5 rounded-full transition duration-200 ease-linear hover:bg-muted-foreground hover:text-white"
      >
        <Icon className="size-5">{xIcon}</Icon>
      </button>
    </section>
  );
};

export default CartItem;
