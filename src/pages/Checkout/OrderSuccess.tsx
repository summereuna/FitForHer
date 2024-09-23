import { Button } from "@/components/ui/button";
import { CardTitle } from "@/components/ui/card";
import { useNavigate, useParams } from "react-router-dom";

const OrderSuccess = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-full justify-center space-y-14">
      <section className="flex flex-col items-center space-y-5">
        <CardTitle>주문을 완료했습니다!</CardTitle>
      </section>
      <section className="flex flex-row justify-center">
        <div className="flex gap-5 min-w-40">
          <Button
            aria-label="홈페이지로 이동"
            type="button"
            variant="outline"
            className="w-full"
            onClick={() => navigate("/")}
          >
            확인
          </Button>
          <Button
            aria-label="구매 내역 상세 페이지로 이동"
            type="button"
            className="w-full"
            onClick={() => navigate(`/my/orders/${id}`)}
          >
            구매 내역 보기
          </Button>
        </div>
      </section>
    </div>
  );
};

export default OrderSuccess;
