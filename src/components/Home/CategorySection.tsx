import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useNavigate } from "react-router-dom";

interface CategorySectionProps {
  data;
}

const CategorySection = ({ data }: CategorySectionProps) => {
  const navigate = useNavigate();
  const categoryInfo = [
    {
      name: "저강도 운동",
      description: "가벼운 착용감과 온종일 자유로운 움직임을 선사합니다.",
      recommend: "요가, 필라테스",
      path: "/category/tops?sub=",
    },
    {
      name: "중강도 운동",
      description:
        "흐트러짐 없이 잡아주는 안정감으로 뛰어난 커버력을 가졌습니다.",
      recommend: "헬스 트레이닝",
      path: "/category/sports-bras?type=medium",
    },
    {
      name: "고강도 운동",
      description:
        "높은 지지력으로 고강도 운동에도 흔들림 업슨 안정감을 경험할 수 있습니다.",
      recommend: "러닝",
      path: "/category/sports-bras?type=high",
    },
    {
      name: "고강도 운동",
      description:
        "높은 지지력으로 고강도 운동에도 흔들림 업슨 안정감을 경험할 수 있습니다.",
      recommend: "러닝",
      path: "/category/sports-bras?type=high",
    },
  ];
  return (
    <section className="flex flex-row w-full space-y-5 h-m-80 flex-wrap lg:space-x-5 lg:flex-nowrap lg:space-y-0">
      <div className="flex flex-col space-y-5 items-center w-full pb-5 lg:items lg:items-start">
        <CardTitle>{"카테고리 이름"}</CardTitle>
        <CardDescription>{"카테고리 설명"}</CardDescription>
        <Button
          variant={"outline"}
          className="w-32"
          onClick={() => navigate(`/category/${categoryName}`)}
        >
          더보기
        </Button>
      </div>
      {categoryInfo.map((item, index) => (
        <div
          className="flex flex-col w-full p-0 md:w-1/2 md:p-3 lg:p-0"
          onClick={() => {
            navigate(
              `/category/${item.sub_categories.categories.name}/${item.sub_categories.name}`
            );
          }}
        >
          <Avatar className="w-full h-60 rounded-none border-[1px] bg-white">
            <AvatarImage
              src={item.image_url}
              alt="브랜드 로고"
              className="object-cover"
            />
            <AvatarFallback className="rounded-none">
              <Avatar className="w-full h-full rounded-none bg-white-200" />
              <Skeleton className="w-full h-full rounded-none" />
            </AvatarFallback>
          </Avatar>
          <div
            aria-label={"dd"}
            key={index}
            className="flex flex-col w-full py-5 text-sm space-y-2"
          >
            <CardDescription>
              {item.sub_categories || "서브 카테고리"}
            </CardDescription>
            <CardTitle className="text-sm">{item.name || "상품명"}</CardTitle>
            <CardDescription>{item.color || "컬러"}</CardDescription>
            <CardTitle className="text-base">
              {item.price || "가격"} 원
            </CardTitle>
          </div>
        </div>
      ))}
    </section>
  );
};

export default CategorySection;
