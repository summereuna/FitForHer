import { useBrand } from "@/api/brandApi";
import { useDashboardItemsByBrandId } from "@/api/orderApi";
import CategoryChart from "@/components/CategoryChart";
import CheckoutItem from "@/components/Checkout/CheckoutItem";
import CountCard from "@/components/CountCard";
import ItemNotFound from "@/components/ItemNotFound";
import { PopoverInfo } from "@/components/PopoverInfo";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import { getOnlyRepresentativePhoto } from "@/lib/utils";
import MetaTag from "@/components/MetaTag";

function DashOverview() {
  const { authId } = useAuth();
  const { brandData } = useBrand(authId as string);

  const { dashboardItemsData } = useDashboardItemsByBrandId(brandData!.id);

  const totalAmount = dashboardItemsData?.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const totalTransactions = dashboardItemsData?.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const totalOrders = new Set(dashboardItemsData?.map((item) => item.order_id))
    .size;

  const threeTransactions = dashboardItemsData?.slice(0, 3);

  return (
    <div className="flex-col md:flex h-full">
      <MetaTag
        title="대시보드"
        description="대시보드에 오신 것을 환영합니다. 판매 통계 및 최근 활동을 한눈에 확인하세요."
        url="dashboard"
      />
      <div className="space-y-4 flex-1 h-full">
        <div className="flex items-center justify-between space-y-2">
          <CardTitle className="tracking-tight">대시보드</CardTitle>
          {/* <div className="flex items-center space-x-2">
            <Button>다운로드</Button>
          </div> */}
        </div>
        <section className="space-y-4 h-full">
          <section
            aria-label="대시보드"
            className="flex flex-col space-y-4 h-full"
          >
            <div
              aria-label="대시보드 상단"
              className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"
            >
              <CountCard
                title={"총 수입"}
                description={"상품 판매 총 수입을 나타냅니다. (단위: 원)"}
                amount={totalAmount || 0}
              />
              <CountCard
                title={"좋아요 수"}
                description={
                  "고객들이 브랜드에 남긴 좋아요 수를 집계한 값입니다."
                }
                amount={brandData?.brand_likes.length || 0}
              />
              <CountCard
                title={"총 판매량"}
                description={"브랜드 상품에 대한 총 판매 수량을 나타냅니다."}
                amount={totalTransactions || 0}
              />
              <CountCard
                title={"총 주문량"}
                description={"브랜드 상품이 포함된 총 주문 수량을 나타냅니다."}
                amount={totalOrders || 0}
              />
            </div>
            <div
              aria-label="대시보드 하단"
              className="grid gap-4 md:grid-cols-2 lg:grid-cols-7"
            >
              <Card className="md:col-span-7 lg:col-span-4">
                <CardHeader className="flex flex-row items-center space-x-1">
                  <CardTitle>카테고리별 판매량</CardTitle>
                  <PopoverInfo
                    title={`카테고리별 판매량`}
                    description={`카테고리별 판매량을 보여주는 차트입니다. 차트 위에 마우스를 올리면 카테고리별 판매량을 확인할 수 있습니다. 중앙에는 총 판매량이 표시됩니다.`}
                  />
                </CardHeader>
                <CardContent className="pl-2">
                  {dashboardItemsData && dashboardItemsData?.length > 0 && (
                    <CategoryChart data={dashboardItemsData} />
                  )}
                  {dashboardItemsData?.length === 0 && (
                    <section className="flex justify-center items-center w-full">
                      <ItemNotFound description={"판매된 상품이 없습니다."} />
                    </section>
                  )}
                </CardContent>
              </Card>
              <Card className="md:col-span-7 lg:col-span-3">
                <CardHeader className="flex flex-row items-center space-x-1">
                  <CardTitle>최근 판매 상품</CardTitle>
                  <PopoverInfo
                    title={`최근 판매 상품`}
                    description={`최근 판매된 상품이 최대 3건, 최신순으로 표시됩니다. 판매 상품에 대한 자세한 내용을 보려면 "판매관리" 탭을 이용하세요.`}
                  />
                </CardHeader>
                <CardContent>
                  <section
                    aria-label="최근 판매 상품 목록"
                    className="overflow-y-auto flex flex-col space-y-5"
                  >
                    {threeTransactions &&
                      threeTransactions.map(
                        (item) =>
                          item.product_sizes && (
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
                            />
                          )
                      )}
                    {dashboardItemsData?.length === 0 && (
                      <section className="flex justify-center items-center w-full h-full">
                        <ItemNotFound description={"판매된 상품이 없습니다."} />
                      </section>
                    )}
                  </section>
                </CardContent>
              </Card>
            </div>
          </section>
        </section>
      </div>
    </div>
  );
}

export default DashOverview;
