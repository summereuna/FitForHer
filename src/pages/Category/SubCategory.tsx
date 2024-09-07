import CategoryFilterSelect from "@/components/Category/CategoryFilterSelect";
import ItemNotFound from "@/components/ItemNotFound";
import ProductItem from "@/components/ProductItem";
import {
  FetchNextPageOptions,
  InfiniteData,
  UseInfiniteQueryResult,
} from "@tanstack/react-query";

interface SubCategoryProps {
  data: InfiniteData;
  handleChangeSortFilter: (
    sortBy: "newest" | "low-price" | "high-price"
  ) => void;
  fetchNextPageSub: (
    options?: FetchNextPageOptions
  ) => Promise<UseInfiniteQueryResult>;
  hasNextPageSub: boolean;
  isFetchingNextPageSub: boolean;
}

const SubCategory = ({
  data,
  handleChangeSortFilter,
  fetchNextPageSub,
  hasNextPageSub,
  isFetchingNextPageSub,
}: SubCategoryProps) => {
  return (
    <section className="flex flex-row w-full space-y-5 h-m-80 flex-wrap lg:space-x-5 lg:flex-nowrap lg:space-y-0">
      {data && data.pages[0].length > 0 && (
        <div className="flex flex-col space-y-5">
          <div className="flex justify-end">
            <CategoryFilterSelect onChangeSortFilter={handleChangeSortFilter} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {data.pages[0].map((item) => (
              <ProductItem key={item.id} item={item} />
            ))}
          </div>
        </div>
      )}

      {data && data.pages[0].length === 0 && (
        <div className="w-full">
          <ItemNotFound description="해당 카테고리에는 아직 등록된 상품이 없습니다." />
        </div>
      )}
    </section>
  );
};

export default SubCategory;
