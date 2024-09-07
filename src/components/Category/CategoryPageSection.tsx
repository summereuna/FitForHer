import CategoryFilterSelect from "@/components/Category/CategoryFilterSelect";
import ProductItem from "@/components/ProductItem";
import {
  FetchNextPageOptions,
  InfiniteData,
  UseInfiniteQueryResult,
} from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

interface CategoryPageSectionProps {
  data: InfiniteData;
  handleChangeSortFilter: (
    sortBy: "newest" | "low-price" | "high-price"
  ) => void;
  fetchNextPage: (
    options?: FetchNextPageOptions
  ) => Promise<UseInfiniteQueryResult>;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
}

const CategoryPageSection = ({
  data,
  handleChangeSortFilter,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
}: CategoryPageSectionProps) => {
  const navigate = useNavigate();

  return (
    <section className="flex flex-row w-full space-y-5 h-m-80 flex-wrap lg:space-x-5 lg:flex-nowrap lg:space-y-0">
      <div className="flex flex-col space-y-5">
        <div className="flex justify-end">
          <CategoryFilterSelect onChangeSortFilter={handleChangeSortFilter} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {data.pages[0].map((item) => (
            <div
              aria-label="카테고리별 상품"
              key={item.id}
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
