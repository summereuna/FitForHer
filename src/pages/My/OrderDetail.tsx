import { useOrdersByOrderId } from "@/api/orderApi";
import CheckoutItem from "@/components/Checkout/CheckoutItem";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  formatPhoneNumber,
  getCreatedTime,
  getOnlyRepresentativePhoto,
  getOrderStatusKorean,
} from "@/lib/utils";
import { useNavigate, useParams } from "react-router-dom";

const OrderDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const { data, isError, isPending, isSuccess } = useOrdersByOrderId(
    id as string
  );

  // console.log(data);
  return (
    <div className="flex flex-col space-y-10">
      <CardTitle>주문 내역 상세</CardTitle>
      {isSuccess && data && (
        <section className="grid grid-cols-1 gap-y-5 lg:gap-y-0 lg:grid-cols-3 lg:space-x-10">
          <section className="flex flex-col items-center col-span-2 space-y-5">
            <div className="flex flex-col w-full space-y-5">
              <Separator orientation="horizontal" />
              <CardContent className="flex flex-col p-0 px-5 space-y-5">
                <CardDescription>
                  결제일: {getCreatedTime(data.orderData.created_at)} 결제
                </CardDescription>
                <CardDescription>
                  주문 번호: {data.orderData.id}
                </CardDescription>
              </CardContent>
              <Separator orientation="horizontal" />

              {/*  */}
              {/*  */}
              <CardHeader
                aria-label="헤더"
                className="flex flex-row items-center space-x-3 p-0"
              >
                <CardTitle className="text-xl">주문 상품</CardTitle>
              </CardHeader>
              <Separator orientation="horizontal" />
              <CardContent className="flex flex-col p-0 px-5">
                <section
                  aria-label="장바구니 상품 목록"
                  className="flex flex-col space-y-2"
                >
                  <Badge
                    variant="outline"
                    className="bg-white h-8 w-24 opacity-70 flex justify-center text-sm"
                  >
                    {getOrderStatusKorean(data.orderData.order_status)}
                  </Badge>
                  {data.orderData.order_items.map(
                    (item) =>
                      item.products &&
                      item.product_sizes &&
                      item.products.brands && (
                        <CheckoutItem
                          key={item.id}
                          image={
                            (getOnlyRepresentativePhoto(
                              item.products.product_images.filter(
                                (img: { id: string; image_url: string }) =>
                                  img.image_url
                              )
                            ) as string) ||
                            item.products.product_images[0].image_url
                          }
                          name={item.products.name}
                          color={item.products.color}
                          size={item.product_sizes.size}
                          size_quantity={item.quantity}
                          price={item.products.price}
                          productId={item.products.id}
                          brandName={item.products.brands.name}
                        />
                      )
                  )}
                </section>
              </CardContent>
              <Separator orientation="horizontal" />
              {/*  */}
              {/*  */}
              <CardHeader
                aria-label="헤더"
                className="flex flex-row items-center space-x-3 p-0"
              >
                <CardTitle className="text-xl">배송지</CardTitle>
              </CardHeader>
              <Separator orientation="horizontal" />
              <CardContent className="flex flex-col p-0 px-5 space-y-5">
                {/* 배송지 정보 적기 */}
                <CardDescription>
                  고객이름: {data.payment.customer.name}
                </CardDescription>
                <CardDescription>
                  전화번호:{" "}
                  {formatPhoneNumber(data.payment.customer.phoneNumber)}
                </CardDescription>
                <CardDescription>
                  이메일: {data.payment.customer.email}
                </CardDescription>
                <CardDescription>
                  주소 (우편번호): {data.payment.customer.address.oneLine} (
                  {data.payment.customer.zipcode})
                </CardDescription>
              </CardContent>
              <Separator orientation="horizontal" />
            </div>
          </section>

          {/*  */}
          {/*  */}
          <section className="col-span-1">
            <section className="flex flex-col p-0 gap-0">
              <CardHeader aria-label="결제 정보" className="space-y-5 p-0">
                <CardTitle className="text-xl">결제 정보</CardTitle>
                <Separator orientation="horizontal" />
              </CardHeader>
              <CardContent className="flex flex-col p-0">
                <section aria-label="주문 금액" className="p-5 space-y-5">
                  <div className="flex flex-row justify-between">
                    <CardDescription className="text-base font-medium text-black">
                      주문 금액
                    </CardDescription>
                    <CardDescription className="text-base font-medium text-black">
                      총 {data.orderData.total_amount.toLocaleString()} 원
                    </CardDescription>
                  </div>
                  <div className="flex flex-row justify-between">
                    <CardDescription>상품 금액</CardDescription>
                    <CardDescription>
                      {data.orderData.total_amount > 30000
                        ? data.orderData.total_amount.toLocaleString()
                        : (
                            data.orderData.total_amount - 2500
                          ).toLocaleString()}{" "}
                      원
                    </CardDescription>
                  </div>
                  <div className="flex flex-row justify-between">
                    <CardDescription>배송비</CardDescription>
                    <CardDescription>
                      {data.orderData.total_amount > 30000
                        ? "무료"
                        : "2,500 원"}
                    </CardDescription>
                  </div>
                  <Separator orientation="horizontal" />
                  <div className="flex flex-row justify-between">
                    <CardDescription className="text-base font-medium text-black">
                      카카오페이 포인트
                    </CardDescription>
                    <CardDescription className="text-base font-medium text-black">
                      {data.payment.amount.total.toLocaleString()} 원
                    </CardDescription>
                  </div>
                  <div className="flex flex-row justify-between">
                    <CardDescription className="text-base font-medium text-black">
                      총 결제 금액
                    </CardDescription>
                    <CardDescription className="text-base font-medium text-black">
                      총 {data.payment.amount.total.toLocaleString()} 원
                    </CardDescription>
                  </div>
                </section>
              </CardContent>
              <Separator orientation="horizontal" />
              {/*  */}
              {/*  */}
              <section className="flex flex-row justify-end pt-5">
                <div className="flex gap-5 min-w-40">
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={() => navigate(-1)}
                  >
                    확인
                  </Button>
                </div>
              </section>
              {/*  */}
              {/*  */}
            </section>
          </section>
          {/*  */}
          {/*  */}
        </section>
      )}
    </div>
  );
};

export default OrderDetail;
