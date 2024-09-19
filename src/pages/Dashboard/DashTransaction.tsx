import { useBrand } from "@/api/brandApi";
import { useOrdersByBrandId } from "@/api/orderApi";
import ItemNotFound from "@/components/ItemNotFound";
import TransactionDataTable from "@/components/Product/TransactionDataTable";
import { Card, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";

function DashTransaction() {
  const { authId } = useAuth();
  const { brandData } = useBrand(authId as string);

  const { brandOrderItemsData, isSuccess } = useOrdersByBrandId(brandData!.id);

  return (
    <div className="flex flex-col h-full w-full gap-5">
      <section className="flex justify-between items-center">
        <CardTitle>판매관리</CardTitle>
      </section>
      <section className="flex h-full">
        <Card className="w-full">
          {brandOrderItemsData?.length === 0 && (
            <ItemNotFound description={`판매된 상품이 없습니다.`} />
          )}
          {isSuccess &&
            brandOrderItemsData &&
            brandOrderItemsData.length > 0 && (
              <TransactionDataTable transactionItemData={brandOrderItemsData} />
            )}
        </Card>
      </section>
    </div>
  );
}

export default DashTransaction;
