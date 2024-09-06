import { CardTitle } from "@/components/ui/card";
import { getKoreanCategoryName } from "@/lib/utils";
import { CategoryProductsWithRelations } from "@/types/main.types";
import { Link, useParams } from "react-router-dom";

interface AsideFilterProps {
  data: CategoryProductsWithRelations;
  onSubCategorySelect: (subCategoryName: string) => void;
}

const AsideFilter = ({ data, onSubCategorySelect }: AsideFilterProps) => {
  const { subCategoryName } = useParams();

  const totalProductCount = data?.sub_categories.reduce(
    (total, subCategory) => total + subCategory.products.length,
    0
  );

  const subCategoryProductCount =
    data.sub_categories.find((category) => category.name === subCategoryName)
      ?.products.length || 0;

  return (
    <aside className="flex flex-col space-y-5 h-full w-56">
      <div className="text-xs">
        <Link to={`/category/${data.name}`}>
          {getKoreanCategoryName(data.name)}
        </Link>
        <span>
          {subCategoryName && ` / ${getKoreanCategoryName(subCategoryName)}`}
        </span>
      </div>

      {!subCategoryName && (
        <CardTitle>
          {getKoreanCategoryName(data.name)} ({totalProductCount})
        </CardTitle>
      )}
      {subCategoryName && (
        <CardTitle>
          {getKoreanCategoryName(subCategoryName)} ({subCategoryProductCount})
        </CardTitle>
      )}
      <div className="space-y-2">
        <div className="flex flex-col items-start space-y-2">
          {data.sub_categories.map((category) => (
            <button
              key={category.name}
              onClick={() => onSubCategorySelect(category.name)}
            >
              {getKoreanCategoryName(category.name)}
            </button>
          ))}
        </div>
      </div>
      {/* <Separator className="bg-gray-200 w-full h-[1px]" />
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
