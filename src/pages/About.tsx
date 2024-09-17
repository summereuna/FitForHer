import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

function About() {
  return (
    <section className="flex justify-center items-center h-full">
      <Card className="flex flex-col space-y-5 p-10 max-w-[50rem]">
        <CardTitle>Fit For Her (F4H)</CardTitle>
        <CardDescription className="text-lg">
          여러 브랜드의 스포츠웨어를 한 곳에서, 여성을 위한 스포츠웨어 플랫폼
        </CardDescription>
        <Separator />
        <div className="space-y-10 text-sm">
          <p>
            Fit For Her (F4H)는 여성들의 활동적인 라이프스타일을 위한 최적의
            스포츠웨어를 제공하는 이커머스 플랫폼입니다.
          </p>
          <div className="px-5 space-y-5">
            <p>
              비즈니스 회원은 상의, 스포츠브라, 하의 등 다양한 스포츠웨어
              컬렉션을 직접 업로드하고 관리할 수 있습니다.
              <br />
              이를 통해 일반 회원들은 다양한 카테고리에서 마음에 드는 제품을
              손쉽게 선택하고, 온라인으로 간편하게 구매할 수 있습니다.
            </p>
            <p>
              Fit For Her (F4H)는 고객들에게 최고의 쇼핑 경험을 제공하기 위해
              끊임없이 노력하고 있으며, 향후 비슷한 상품을 브랜드별로 비교할 수
              있는 필터 기능을 추가할 계획입니다. 이커머스의 편리함을 통해,
              고객들은 언제 어디서나 본인에게 필요한 최상의 스포츠웨어를 손쉽게
              찾고 구매할 수 있습니다.
            </p>
          </div>

          <p>
            여성들을 위한 스포츠웨어, Fit For Her (F4H)에서 자신만의 스타일과
            편안함을 발견하세요.
            <br />
            운동이든 일상생활이든, F4H는 항상 당신의 스타일과 활동을 지원합니다!
          </p>
        </div>
      </Card>
    </section>
  );
}

export default About;
