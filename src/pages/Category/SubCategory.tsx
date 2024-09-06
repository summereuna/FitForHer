import { useSubCategoryProducts } from "@/api/categoryApi";
import CategoryFilterSelect from "@/components/Category/CategoryFilterSelect";
import ItemNotFound from "@/components/ItemNotFound";
import ProductItem from "@/components/ProductItem";
import { useState } from "react";

interface SubCategoryProps {
  subCategoryName: string;
}

const SubCategory = ({ subCategoryName }: SubCategoryProps) => {
  const [sortFilter, setSortFilter] = useState<
    "newest" | "low-price" | "high-price"
  >("newest");

  const { data: subCategoryData, isSuccess } = useSubCategoryProducts(
    subCategoryName!,
    sortFilter
  );

  const handleChangeSortFilter = (
    sortBy: "newest" | "low-price" | "high-price"
  ) => {
    setSortFilter(sortBy);
  };

  return (
    <section className="flex flex-row w-full space-y-5 h-m-80 flex-wrap lg:space-x-5 lg:flex-nowrap lg:space-y-0">
      {isSuccess && subCategoryData && subCategoryData.products.length > 0 && (
        <div className="flex flex-col space-y-5">
          <div className="flex justify-end">
            <CategoryFilterSelect onChangeSortFilter={handleChangeSortFilter} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {subCategoryData.products.map((item, index) => (
              <ProductItem key={index} item={item} />
            ))}
          </div>
        </div>
      )}

      {isSuccess &&
        subCategoryData &&
        subCategoryData.products.length === 0 && (
          <div className="w-full">
            <ItemNotFound description="해당 카테고리에는 아직 등록된 상품이 없습니다." />
          </div>
        )}
    </section>
  );
};

export default SubCategory;
