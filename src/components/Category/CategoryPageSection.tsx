import CategoryFilterSelect from "@/components/Category/CategoryFilterSelect";
import CategoryProduct from "@/components/Category/CategoryProduct";
import ProductItem from "@/components/ProductItem";
import { sortProducts } from "@/lib/utils";
import { CategoryProductsWithRelations, MainProduct } from "@/types/main.types";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface CategoryPageSectionProps {
  data: CategoryProductsWithRelations;
  isPending: boolean;
}

const CategoryPageSection = ({ data, isPending }: CategoryPageSectionProps) => {
  const navigate = useNavigate();

  const [sortFilter, setSortFilter] = useState<
    "newest" | "low-price" | "high-price"
  >("newest");

  const handleChangeSortFilter = (
    sortBy: "newest" | "low-price" | "high-price"
  ) => {
    setSortFilter(sortBy);
  };

  const mergedProducts: MainProduct[] = data.sub_categories.flatMap(
    (subCategory) => subCategory.products
  );

  const sortedProducts = sortProducts(mergedProducts, sortFilter);

  if (isPending) return null;

  return (
    <section className="flex flex-row w-full space-y-5 h-m-80 flex-wrap lg:space-x-5 lg:flex-nowrap lg:space-y-0">
      <div className="flex flex-col space-y-5">
        <div className="flex justify-end">
          <CategoryFilterSelect onChangeSortFilter={handleChangeSortFilter} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {sortedProducts.map((item, index) => (
            <div
              aria-label="카테고리별 상품"
              key={index}
              className="flex flex-col w-full p-0 md:p-3 lg:p-0"
              onClick={() => {
                navigate(`/product/${item.id}`);
              }}
            >
              <ProductItem item={item} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryPageSection;
