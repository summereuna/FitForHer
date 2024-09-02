import ItemNotFound from "@/components/ItemNotFound";
import { Card, CardTitle } from "@/components/ui/card";

function DashProduct() {
  return (
    <div className="flex flex-col h-full w-full gap-5">
      <section className="flex justify-between items-center">
        <CardTitle>상품관리</CardTitle>
      </section>
      <section className="flex h-full">
        <Card className="w-full">
          <ItemNotFound
            description={`등록된 상품이 없습니다.\n상품을 등록하세요.`}
          />
        </Card>
      </section>
    </div>
  );
}

export default DashProduct;
