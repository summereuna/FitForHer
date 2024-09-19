import { useSearchProducts } from "@/api/searchApi";
import CategoryPageSection from "@/components/Category/CategoryPageSection";
import ItemNotFound from "@/components/ItemNotFound";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";

const Search = () => {
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("keyword");

  //------------------------------------------------------------

  const [sortFilter, setSortFilter] = useState<
    "newest" | "low-price" | "high-price"
  >("newest");

  const handleChangeSortFilter = (
    sortBy: "newest" | "low-price" | "high-price"
  ) => {
    setSortFilter(sortBy);
  };

  //------------------------------------------------------------

  const {
    data: searchData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useSearchProducts(sortFilter, keyword as string);

  return (
    <div className="flex justify-center w-full h-full">
      <main>
        {searchData && searchData?.pages[0].length > 0 && (
          <CategoryPageSection
            data={searchData}
            handleChangeSortFilter={handleChangeSortFilter}
            fetchNextPage={fetchNextPage}
            hasNextPage={hasNextPage}
            isFetchingNextPage={isFetchingNextPage}
          />
        )}
        {searchData?.pages[0].length === 0 && (
          <ItemNotFound
            description={`검색어: ${keyword}\n찾는 상품이 없습니다.`}
          />
        )}
      </main>
    </div>
  );
};

export default Search;
