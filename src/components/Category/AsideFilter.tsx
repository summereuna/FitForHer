import { CardTitle } from "@/components/ui/card";
import { getKoreanCategoryName } from "@/lib/utils";
import { siteMap } from "@/shared/data/siteMap";
import { InfiniteData } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";

interface AsideFilterProps {
  topCateName: string;
  topCateData: InfiniteData<TData, TPageParam>;
  subCateData?: InfiniteData<TData, TPageParam>;
  onSubCategorySelect: (subCategoryName: string) => void;
}

const AsideFilter = ({
  topCateName,
  topCateData,
  subCateData,
  onSubCategorySelect,
}: AsideFilterProps) => {
  const { subCategoryName } = useParams();

  const currentCategory = siteMap.find(
    (item) => item.top.value === topCateName
  );

  const totalCategoryProductCount =
    topCateData?.pages.flatMap((page) => page).length || 0;

  const totalSubCategoryProductCount =
    subCateData?.pages.flatMap((page) => page).length || 0;

  return (
    <aside className="flex flex-col space-y-5 h-full w-56">
      <div className="text-xs">
        <Link to={`/category/${topCateName}`}>
          {currentCategory?.top.label}
        </Link>
        <span>
          {subCategoryName && ` / ${getKoreanCategoryName(subCategoryName)}`}
        </span>
      </div>

      {!subCategoryName && (
        <CardTitle>
          {currentCategory?.top.label} ({totalCategoryProductCount})
        </CardTitle>
      )}
      {subCategoryName && (
        <CardTitle>
          {getKoreanCategoryName(subCategoryName)} (
          {totalSubCategoryProductCount})
        </CardTitle>
      )}
      <div className="space-y-2">
        <div className="flex flex-col items-start space-y-2">
          {currentCategory?.sub?.map((category) => (
            <button
              key={category.value}
              onClick={() => onSubCategorySelect(category.value)}
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>
      {/*
      <Separator className="bg-gray-200 w-full h-[1px]" />
      <div>
        <h3 className="font-medium">{"가격대"}</h3>
      </div>
      <Separator className="bg-gray-200 w-full h-[1px]" />
      <div>
        <h3 className="font-medium">{"색상"}</h3>
      </div>
      <Separator className="bg-gray-200 w-full h-[1px]" />
      <div>
        <h3 className="font-medium">{"사이즈"}</h3>
      </div>
      <Separator className="bg-gray-200 w-full h-[1px]" />
      <div>
        <h3 className="font-medium">{"브랜드"}</h3>
      </div> */}
    </aside>
  );
};

export default AsideFilter;
