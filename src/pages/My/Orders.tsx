import { useOrdersByUserId } from "@/api/orderApi";
import ItemNotFound from "@/components/ItemNotFound";
import OrderItem from "@/components/OrderItem";
import { CardDescription, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import { getOnlyRepresentativePhoto } from "@/lib/utils";
import { Separator } from "@radix-ui/react-separator";

const Orders = () => {
  const { authId, session } = useAuth();
  const { myOrdersData, isSuccess } = useOrdersByUserId(authId as string);

  const filteredMyOrdersData = myOrdersData?.filter(
    (item) => item.order_status !== "order_cancelled"
  );

  const totalAmountOrderCompletedItems =
    filteredMyOrdersData &&
    filteredMyOrdersData?.reduce((total, item) => total + item.total_amount, 0);
  return (
    <section className="h-full w-full">
      <section className="h-full grid grid-cols-1 gap-y-10 lg:gap-y-0 lg:grid-cols-3 lg:space-x-10">
        <section className="flex flex-col items-center col-span-2 order-2 lg:order-1 space-y-5">
          {myOrdersData?.length === 0 && (
            <ItemNotFound description={`주문 내역이 없습니다.`} />
          )}
          {isSuccess && myOrdersData && (
            <section
              aria-label="주문내역"
              className="w-full overflow-y-auto flex flex-col divide-y-[1px]"
            >
              <CardTitle className="pb-5">
                주문내역 ({myOrdersData.length})
              </CardTitle>
              {myOrdersData.map(
                (item) =>
                  item.order_items[0].products && (
                    <OrderItem
                      key={item.id}
                      id={item.id}
                      status={item.order_status}
                      created_at={item.created_at}
                      image={
                        getOnlyRepresentativePhoto(
                          item.order_items[0].products.product_images.filter(
                            (img: { id: string; image_url: string }) =>
                              img.image_url
                          )
                        ) as string
                      }
                      name={item.name}
                      totalPrice={item.total_amount}
                    />
                  )
              )}
            </section>
          )}
        </section>

        {/*  */}
        {/*  */}

        <section className="col-span-1 order-1 lg:order-2 flex flex-col space-y-5 w-full">
          <div className="flex flex-col space-y-1">
            <CardTitle className="text-xl">
              {session?.user.user_metadata.name} 님
            </CardTitle>
            <CardDescription>
              {session?.user.user_metadata.email}
            </CardDescription>
          </div>
          <Separator orientation="horizontal" className="bg-gray-200 h-[1px]" />
          <div className="flex flex-row space-x-5">
            <CardDescription className="text-base text-black font-medium">
              총 결제액
            </CardDescription>
            <CardDescription className="text-base text-black font-medium">
              {totalAmountOrderCompletedItems?.toLocaleString() || 0} 원
            </CardDescription>
          </div>
          <Separator orientation="horizontal" className="bg-gray-200 h-[1px]" />
        </section>

        {/*  */}
        {/*  */}
      </section>
    </section>
  );
};

export default Orders;
