import ItemNotFound from "@/components/ItemNotFound";
import { Card } from "@/components/ui/card";

function DashReviewAndQnA() {
  return (
    <div className="grid grid-cols-2 h-full gap-5">
      <Card>
        <ItemNotFound description={`등록된 리뷰가 없습니다.`} />
      </Card>
      <Card>
        <ItemNotFound description={`등록된 문의가 없습니다.`} />
      </Card>
    </div>
  );
}

export default DashReviewAndQnA;
