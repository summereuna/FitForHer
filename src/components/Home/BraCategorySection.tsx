import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import lightImage from "@/assets/images/light.jpg";
import mediumImage from "@/assets/images/medium.jpeg";
import hightImage from "@/assets/images/hight.avif";

const BraCategorySection = () => {
  const navigate = useNavigate();
  const braCategoryInfo = [
    {
      title: "스포츠 브라\n라이트 서포트",
      description: "가벼운 착용감으로 자유로운 움직임을 경험하세요.",
      recommend: "저강도 운동: 일상, 요가, 필라테스",
      path: "/category/sports-bras/light",
      asset: lightImage,
    },
    {
      title: "미디엄 서포트",
      description:
        "흐트러짐 없이 잡아주는 안정감으로 뛰어난 커버력을 경험하세요.",
      recommend: "중강도 운동: 헬스 트레이닝, 싸이클",
      path: "/category/sports-bras/medium",
      asset: mediumImage,
    },
    {
      title: "하이 서포트",
      description:
        "높은 지지력으로 고강도 운동에도 흔들림 없는 안정감을 경험하세요.",
      recommend: "고강도 운동: 러닝, 크로스핏, 에어로빅",
      path: "/category/sports-bras/high",
      asset: hightImage,
    },
  ];
  return (
    <section className="flex flex-row w-full md:h-[30rem] space-y-5 flex-wrap md:flex-nowrap md:space-x-5 md:space-y-0">
      <Card
        aria-label={braCategoryInfo[0].title}
        className="relative w-full overflow-hidden h-[15rem] md:h-full"
      >
        <img
          src={braCategoryInfo[0].asset}
          alt={braCategoryInfo[0].title}
          className="w-full h-full object-cover object-top"
        />
        <div className="absolute top-0 left-0 right-0 bottom-0 flex flex-col min-w-60 space-y-5 p-5 h-full justify-end bg-black bg-opacity-50 transition duration-200 ease-linear hover:bg-black hover:bg-opacity-60">
          <CardTitle className="text-white whitespace-pre-line leading-8">
            {braCategoryInfo[0].title}
          </CardTitle>
          <CardDescription className="text-white">
            {braCategoryInfo[0].description}
            <br />
            {braCategoryInfo[0].recommend}
          </CardDescription>
          <Button
            variant={"outline"}
            className="w-32"
            onClick={() => navigate(braCategoryInfo[0].path)}
          >
            더보기
          </Button>
        </div>
      </Card>
      <section className="flex flex-col w-full space-y-5 h-[30rem] md:h-full">
        <Card
          aria-label={braCategoryInfo[1].title}
          // className="relative w-full h-[30rem] overflow-hidden md:h-full"
          className="relative w-full overflow-hidden h-full"
        >
          <img
            src={braCategoryInfo[1].asset}
            alt={braCategoryInfo[1].title}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-0 left-0 right-0 bottom-0 flex flex-col min-w-60 space-y-5 p-5 h-full justify-end bg-black bg-opacity-50 transition duration-200 ease-linear hover:bg-black hover:bg-opacity-60">
            <CardTitle className="text-white">
              {braCategoryInfo[1].title}
            </CardTitle>
            <CardDescription className="text-white">
              {braCategoryInfo[1].description}
              <br />
              {braCategoryInfo[1].recommend}
            </CardDescription>
            <Button
              variant={"outline"}
              className="w-32"
              onClick={() => navigate(braCategoryInfo[1].path)}
            >
              더보기
            </Button>
          </div>
        </Card>
        <Card
          aria-label={braCategoryInfo[2].title}
          // className="relative w-full h-[30rem] overflow-hidden md:h-full"
          className="relative w-full overflow-hidden h-full"
        >
          <img
            src={braCategoryInfo[2].asset}
            alt={braCategoryInfo[2].title}
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute top-0 left-0 right-0 bottom-0 flex flex-col min-w-60 space-y-5 p-5 h-full justify-end bg-black bg-opacity-50 transition duration-200 ease-linear hover:bg-black hover:bg-opacity-60">
            <CardTitle className="text-white">
              {braCategoryInfo[2].title}
            </CardTitle>
            <CardDescription className="text-white">
              {braCategoryInfo[2].description}
              <br />
              {braCategoryInfo[2].recommend}
            </CardDescription>
            <Button
              variant={"outline"}
              className="w-32"
              onClick={() => navigate(braCategoryInfo[2].path)}
            >
              더보기
            </Button>
          </div>
        </Card>
      </section>
    </section>
  );
};

export default BraCategorySection;
