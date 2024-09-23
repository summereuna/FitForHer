import ItemNotFound from "@/components/ItemNotFound";
import { Button } from "@/components/ui/button";
import MetaTag from "@/components/MetaTag";
import { useNavigate } from "react-router-dom";

const OrderFail = () => {
  const navigate = useNavigate();

  return (
    <section className="flex flex-col h-full justify-center space-y-14">
      <MetaTag title="결제 실패" description="결제 실패 페이지입니다." />
      <ItemNotFound description="결제를 취소(실패)했습니다." />
      <section className="flex flex-row justify-center">
        <div className="flex gap-5 min-w-40">
          <Button
            aria-label="홈페이지로 이동"
            type="button"
            variant="outline"
            className="w-full"
            onClick={() => navigate("/")}
          >
            홈으로
          </Button>
        </div>
      </section>
    </section>
  );
};

export default OrderFail;
