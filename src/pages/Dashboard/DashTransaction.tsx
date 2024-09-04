import ItemNotFound from "@/components/ItemNotFound";
import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";

function DashTransaction() {
  return (
    <div className="flex flex-col h-full w-full gap-5">
      <section className="flex justify-between items-center">
        <CardTitle>판매관리</CardTitle>
        {/* <Button type="button" variant={"outline"}>
          상품 등록하기
        </Button> */}
      </section>
      <section className="flex h-full">
        <Card className="w-full">
          <ItemNotFound description={`판매된 상품이 없습니다.`} />
        </Card>
      </section>
    </div>
  );
  return <div>DashTransaction</div>;
}

export default DashTransaction;
