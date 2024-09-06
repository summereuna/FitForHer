import ProductItem from "@/components/ProductItem";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CardDescription, CardTitle } from "@/components/ui/card";
import { getKoreanCategoryName } from "@/lib/utils";
import { CategoryProductsWithRelations, MainProduct } from "@/types/main.types";
import { useNavigate } from "react-router-dom";

interface CategorySectionProps {
  data: CategoryProductsWithRelations;
  isPending: boolean;
  isMainPage: boolean;
}

const CategorySection = ({
  data,
  isPending,
  isMainPage = false,
}: CategorySectionProps) => {
  const navigate = useNavigate();

  const { name: topCategoryName, sub_categories } = data;
  const mergedProducts: MainProduct[] = data.sub_categories.flatMap(
    (subCategory) => subCategory.products
  );

  let sortedProducts = mergedProducts.sort(
    (a, b) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  ); // 최신 순

  if (sortedProducts.length >= 4) {
    sortedProducts = sortedProducts.slice(0, 4); //4개만 보이게
  }

  const categoryDescription = [
    {
      name: "tops",
      description:
        "운동의 완벽함을 위한 선택, 운동의 한계를 넘어.\n다양한 브랜드의 상의 컬렉션에서 통기성과 편안함을 제공하는 상의를 만나보세요.",
    },
    {
      name: "pants",
      description:
        "움직임은 자유롭게, 스타일은 더욱 돋보이게.\n여러 브랜드의 하의 컬렉션에서 당신의 운동을 완성해 줄 완벽한 핏을 찾으세요.",
    },
  ];

  if (isPending) return null;

  return (
    <section className="flex flex-row w-full space-y-5 flex-wrap lg:space-x-5 lg:flex-nowrap lg:space-y-0">
      {isMainPage && (
        <div
          aria-label="카테고리 설명"
          className="flex flex-col space-y-7 items-center w-full pb-5 lg:items lg:items-start"
        >
          <CardTitle>{getKoreanCategoryName(topCategoryName)}</CardTitle>
          <CardDescription className="text-base leading-6 whitespace-pre-line text-center lg:text-left">
            {topCategoryName === categoryDescription[0].name
              ? categoryDescription[0].description
              : categoryDescription[1].description}
          </CardDescription>
          <div className="flex flex-row space-x-2">
            {sub_categories.map((sub_category, index) => (
              <Badge
                key={index}
                variant="outline"
                className="bg-white h-8 opacity-70 text-sm flex justify-center transition duration-200 ease-linear hover:bg-black hover:text-white cursor-pointer"
                onClick={() => {
                  navigate(`category/${topCategoryName}/${sub_category.name}`);
                }}
              >
                {getKoreanCategoryName(sub_category.name)}
              </Badge>
            ))}
          </div>
          <Button
            variant={"outline"}
            className="w-32"
            onClick={() => navigate(`/category/${topCategoryName}`)}
          >
            더보기
          </Button>
        </div>
      )}

      {sortedProducts.map((item, index) => (
        <div
          key={index}
          aria-label="카테고리별 상품"
          className="flex flex-col w-full p-0 md:w-1/2 md:p-3 lg:p-0"
          onClick={() => {
            navigate(`/product/${item.id}`);
          }}
        >
          <ProductItem item={item} />
        </div>
      ))}
    </section>
  );
};

export default CategorySection;
