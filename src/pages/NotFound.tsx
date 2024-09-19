import ItemNotFound from "@/components/ItemNotFound";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <section className="w-full h-full flex flex-col justify-center items-center space-y-5">
      <div>
        <ItemNotFound
          description={`페이지를 찾을 수 없습니다.\n요청하신 페이지는 존재하지 않는 페이지입니다.`}
        />
      </div>
      <Button variant={"outline"} onClick={() => navigate("/")}>
        홈으로
      </Button>
    </section>
  );
};

export default NotFound;