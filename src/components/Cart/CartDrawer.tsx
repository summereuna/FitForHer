import CartItem from "@/components/Cart/CartItem";
import { Icon } from "@/components/Icon";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useCart } from "@/hooks/useCart";
import { cartIcon } from "@/shared/icons";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface CartDrawerProps {
  isInNav: boolean;
  onChangeIsAddedItem?: () => void;
}

export function CartDrawer({ isInNav, onChangeIsAddedItem }: CartDrawerProps) {
  const navigate = useNavigate();

  const {
    cartItems,
    updateCartItem,
    deleteCartItem,
    clearCart,
    isInitializedLocalCart,
  } = useCart();

  const totalPriceCartItems = cartItems.reduce(
    (total, item) => total + item.size_quantity * item.price,
    0
  );

  const shippingCharge = totalPriceCartItems > 30000 ? 0 : 2500;

  const totalPrice = totalPriceCartItems + shippingCharge;

  const handleOrder = () => {
    console.log("아이템 주문하기");
    navigate("/checkout");
  };

  // console.log(cartItems);

  // 장바구니 비워지면 isAddedItem 상태도 false로 바꾸기
  useEffect(() => {
    if (isInitializedLocalCart && cartItems.length === 0) {
      clearCart();
      onChangeIsAddedItem?.(); //옵셔널하니까 존재 할때만 실행되도록 처리
    }
  }, [
    cartItems.length,
    clearCart,
    onChangeIsAddedItem,
    isInitializedLocalCart,
  ]);

  return (
    <Sheet>
      <SheetTrigger asChild className="w-full">
        {!isInNav ? (
          <Button
            type="button"
            size={"lg"}
            variant="secondary"
            className="w-full border-[1px]"
          >
            장바구니 보기
          </Button>
        ) : (
          <button>
            <Icon className="size-6">{cartIcon}</Icon>
          </button>
        )}
      </SheetTrigger>
      <SheetContent side={"right"} className="flex flex-col p-0 gap-0">
        <section aria-label="장바구니 헤더" className="space-y-5 p-5 pb-0">
          <SheetTitle className="text-2xl">장바구니</SheetTitle>
          <Separator orientation="horizontal" />
        </section>
        {cartItems.length > 0 && (
          <section className="flex flex-col justify-between h-full">
            <section
              aria-label="장바구니 상품 목록"
              className="overflow-y-auto flex flex-col"
            >
              {cartItems.map((item) => (
                <CartItem
                  key={`${item.id}_${item.size}`}
                  item={item}
                  onUpdateCartItem={updateCartItem}
                  onDeleteCartItem={deleteCartItem}
                />
              ))}
            </section>
            <div aria-label="상품 금액" className="p-5 space-y-5 min-h-[21rem]">
              <Separator orientation="horizontal" />
              <div className="flex flex-row justify-between">
                <SheetDescription>상품 금액</SheetDescription>
                <SheetDescription>
                  {totalPriceCartItems.toLocaleString()} 원
                </SheetDescription>
              </div>
              <div className="flex flex-row justify-between">
                <SheetDescription>배송비</SheetDescription>
                <SheetDescription>
                  {shippingCharge === 0
                    ? "무료"
                    : `${shippingCharge.toLocaleString()} 원`}
                </SheetDescription>
              </div>
              <span className="text-xs text-muted-foreground">
                *30,000원 이상 구매시 배송비는 무료입니다.
              </span>
              <Separator orientation="horizontal" />
              <div className="flex flex-row justify-between">
                <SheetDescription className="text-base font-medium text-black">
                  총 결제 금액
                </SheetDescription>
                <SheetDescription className="text-base font-medium text-black">
                  {totalPrice.toLocaleString()} 원
                </SheetDescription>
              </div>
              <Separator orientation="horizontal" />
              <Button className="w-full" onClick={handleOrder}>
                결제 하기
              </Button>
            </div>
          </section>
        )}
        {cartItems.length === 0 && (
          <div className="flex flex-col h-full justify-center items-center space-y-5">
            <Icon className="size-10">{cartIcon}</Icon>
            <SheetDescription>장바구니가 비어 있어요.</SheetDescription>
          </div>
        )}
      </SheetContent>
      {/*  */}
    </Sheet>
  );
}
