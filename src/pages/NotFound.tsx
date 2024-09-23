import ItemNotFound from "@/components/ItemNotFound";
import { Button } from "@/components/ui/button";
import MetaTag from "@/components/MetaTag";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <section className="w-full h-full flex flex-col justify-center items-center space-y-5">
      <MetaTag title="404" description="페이지를 찾을 수 없습니다." />
      <div>
        <ItemNotFound
          description={`페이지를 찾을 수 없습니다.\n요청하신 페이지는 존재하지 않는 페이지입니다.`}
        />
      </div>
      <Button
        aria-label="홈페이지로 이동"
        variant={"outline"}
        onClick={() => navigate("/")}
      >
        홈으로
      </Button>
    </section>
  );
};

export default NotFound;
