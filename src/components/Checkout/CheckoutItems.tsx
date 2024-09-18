import CheckoutItem from "@/components/Checkout/CheckoutItem";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/hooks/useCart";

const CheckoutItems = () => {
  const { cartItems, updateCartItem, deleteCartItem, clearCart } = useCart();

  const totalPriceCartItems = cartItems.reduce(
    (total, item) => total + item.size_quantity * item.price,
    0
  );

  const shippingCharge = totalPriceCartItems > 30000 ? 0 : 2500;

  const totalPrice = totalPriceCartItems + shippingCharge;

  return (
    <section className="flex flex-col p-0 gap-0">
      <CardHeader aria-label="주문할 상품 헤더" className="space-y-5 p-0">
        <CardTitle className="text-2xl">주문할 상품</CardTitle>
        <Separator orientation="horizontal" />
      </CardHeader>
      <CardContent className="flex flex-col p-0">
        <section aria-label="상품 금액" className="p-5 space-y-5">
          <div className="flex flex-row justify-between">
            <CardDescription>상품 금액</CardDescription>
            <CardDescription>
              {totalPriceCartItems.toLocaleString()} 원
            </CardDescription>
          </div>
          <div className="flex flex-row justify-between">
            <CardDescription>배송비</CardDescription>
            <CardDescription>
              {shippingCharge === 0
                ? "무료"
                : `${shippingCharge.toLocaleString()} 원`}
            </CardDescription>
          </div>
          <span className="text-xs text-muted-foreground">
            *30,000원 이상 구매시 배송비는 무료입니다.
          </span>
          <Separator orientation="horizontal" />
          <div className="flex flex-row justify-between">
            <CardDescription className="text-base font-medium text-black">
              총 결제 금액
            </CardDescription>
            <CardDescription className="text-base font-medium text-black">
              {totalPrice.toLocaleString()} 원
            </CardDescription>
          </div>
          <Separator orientation="horizontal" />
        </section>
        <section
          aria-label="장바구니 상품 목록"
          className="overflow-y-auto flex flex-col px-5 space-y-5 pb-5"
        >
          {cartItems.map((item) => (
            <CheckoutItem
              key={`${item.id}_${item.size}`}
              image={item.image}
              name={item.name}
              color={item.color}
              size={item.size}
              size_quantity={item.size_quantity}
              price={item.price}
            />
          ))}
        </section>
      </CardContent>
    </section>
  );
};

export default CheckoutItems;
