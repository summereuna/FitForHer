export const orderStatus = [
  { label: "order_completed", value: "주문완료" },
  { label: "order_cancelled", value: "주문취소" },
] as const;

export const orderItemStatus = [
  { label: "shipment_pending", value: "배송대기" },
  { label: "shipment_progressing", value: "배송중" },
  { label: "shipment_complete", value: "배송완료" },
  { label: "order_confirmed", value: "구매확정" },
  { label: "order_cancelled", value: "주문취소" },
] as const;
