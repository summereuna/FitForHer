import ItemNotFound from "@/components/ItemNotFound";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const OrderFail = () => {
  const navigate = useNavigate();

  return (
    <section className="flex flex-col h-full justify-center space-y-14">
      <ItemNotFound description="결제에 실패했습니다. 다시 시도해 주세요." />
      <section className="flex flex-row justify-center">
        <div className="flex gap-5 min-w-40">
          <Button
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
