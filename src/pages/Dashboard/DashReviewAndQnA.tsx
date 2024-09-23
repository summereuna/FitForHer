import ItemNotFound from "@/components/ItemNotFound";
import { Card } from "@/components/ui/card";
import MetaTag from "@/components/MetaTag";

function DashReviewAndQnA() {
  return (
    <div className="grid grid-cols-2 h-full gap-5">
      <MetaTag
        title="리뷰 및 문의"
        description="리뷰와 문의를 관리하는 페이지입니다."
      />
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
