import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  cn,
  getOnlyRepresentativePhoto,
  getOrderStatusKorean,
} from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";
import {
  OrdersByBrandIdResponse,
  UpdateOrderItemStatusRequest,
} from "@/types/order.types";
// import TransactionDropdown from "@/components/TransactionDropdown";
import { orderItemStatus } from "@/shared/data/status";
import OrderItemStatusSelectForm from "@/components/Product/OrderItemStatusSelectForm";
import { useUpdateOrderItemStatus } from "@/api/orderApi";

interface TransactionDataTableProps {
  transactionItemData: OrdersByBrandIdResponse;
}

const TransactionDataTable = ({
  transactionItemData,
}: TransactionDataTableProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const handleImageLoad = () => {
    setImageLoaded(true);
  };
  // console.log(transactionItemData);

  const { mutateUpdateOrderItemStatus } = useUpdateOrderItemStatus();

  const handleChangeStatus = (newStatusData: UpdateOrderItemStatusRequest) => {
    mutateUpdateOrderItemStatus(newStatusData);
  };

  return (
    <section>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[85px]">주문상태</TableHead>
            <TableHead className="w-[130px]">처리상태</TableHead>
            <TableHead>상품 사진</TableHead>
            <TableHead className="w-[200px]">상품명</TableHead>
            <TableHead className="w-[200px]">주문번호</TableHead>
            <TableHead>컬러</TableHead>
            <TableHead className="w-[100px]">사이즈/수량</TableHead>
            <TableHead>가격</TableHead>
            <TableHead className="text-right"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactionItemData.map((item) => (
            <TableRow
              key={item.id}
              className={cn(
                !item.is_active
                  ? "pointer-events-none opacity-30 bg-gray-50 cursor-not-allowed select-none"
                  : ""
              )}
            >
              <TableCell
                className={cn(
                  "font-medium",
                  item.status === "order_cancelled" ? "text-destructive" : ""
                )}
              >
                {/* {item.orders && (
                  <OrderItemStatusSelectForm
                    dbStatus={item.orders.order_status}
                    statusList={orderStatus}
                  />
                )} */}
                {item.orders && getOrderStatusKorean(item.orders.order_status)}
              </TableCell>
              <TableCell className="font-medium">
                <OrderItemStatusSelectForm
                  dbStatus={item.status}
                  orderItemId={item.id}
                  statusList={orderItemStatus}
                  onChangeStatus={handleChangeStatus}
                />
              </TableCell>
              <TableCell>
                <Avatar className="size-20 rounded-none border-[1px] bg-white">
                  {item.products.product_images && (
                    <AvatarImage
                      src={getOnlyRepresentativePhoto(
                        item.products.product_images
                      )}
                      alt="상품 대표 사진"
                      className="object-cover"
                      onLoad={handleImageLoad}
                    />
                  )}
                  {!imageLoaded && (
                    <AvatarFallback className="rounded-none">
                      <Avatar className="size-20 rounded-none bg-white-200 border-[1px]" />
                      <Skeleton className="size-20 rounded-none" />
                    </AvatarFallback>
                  )}
                </Avatar>
              </TableCell>
              <TableCell>{item.products.name}</TableCell>
              <TableCell className="text-xs">{item.orders?.id}</TableCell>
              <TableCell>{item.products.color}</TableCell>
              <TableCell>
                <div className="flex flex-row justify-between text-xs">
                  <span>{item.product_sizes?.size}</span>
                  <span>{item.quantity} 개</span>
                </div>
              </TableCell>
              <TableCell>{item.price.toLocaleString()} 원</TableCell>
              <TableCell className="text-right">
                {/* <TransactionDropdown productId={item.id} /> */}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  );
};

export default TransactionDataTable;
