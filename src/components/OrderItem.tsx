import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { CardDescription, CardTitle } from "@/components/ui/card";
import { Enums } from "@/types/database.types";
import { Icon } from "@/components/Icon";
import { chevronRightIcon } from "@/shared/icons";
import { cn, getCreatedTime, getOrderStatusKorean } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

interface OrderItemProps {
  id: string;
  status: Enums<"order_status">;
  created_at: string;
  image: string;
  name: string;
  color?: string;
  size?: Enums<"product_size">;
  size_quantity?: number;
  totalPrice: number;
}

const OrderItem = ({
  id,
  status,
  created_at,
  image,
  name,
  totalPrice,
}: OrderItemProps) => {
  const navigate = useNavigate();
  return (
    <section
      aria-label="주문 상품"
      className="flex flex-col justify-start w-full space-y-2 p-5 cursor-pointer transition duration-150 ease-linear hover:bg-muted"
      onClick={() => navigate(`/my/orders/${id}`)}
    >
      <CardTitle
        className={cn(
          "text-lg",
          status === "order_completed" ? "" : "text-destructive"
        )}
      >
        {getOrderStatusKorean(status)}
      </CardTitle>
      <div className="flex flex-row justify-start w-full space-x-5">
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
          className="flex flex-col w-full justify-between"
        >
          <CardDescription className="text-xs">
            {`${getCreatedTime(created_at)} 결제`}
          </CardDescription>
          <CardTitle className="text-sm">{name || "주문명"}</CardTitle>
          <CardTitle
            className={cn(
              "text-sm",
              status === "order_completed"
                ? ""
                : "line-through text-muted-foreground"
            )}
          >
            {totalPrice.toLocaleString() || "가격"} 원
          </CardTitle>
          <div className="flex flex-row space-x-1 items-center text-sm">
            <CardDescription
              className={cn(
                status === "order_completed"
                  ? "text-blue-500"
                  : "text-destructive"
              )}
            >
              {"주문상세"}
            </CardDescription>
            <Icon
              className={cn(
                "size-3",
                status === "order_completed"
                  ? "text-blue-500"
                  : "text-destructive"
              )}
            >
              {chevronRightIcon}
            </Icon>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrderItem;
