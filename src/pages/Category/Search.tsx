import { useSearchProducts } from "@/api/searchApi";
import CategoryPageSection from "@/components/Category/CategoryPageSection";
import ItemNotFound from "@/components/ItemNotFound";
import MetaTag from "@/components/MetaTag";
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
      <MetaTag
        title={`검색`}
        description="원하는 상품을 찾을 수 있는 검색 결과 페이지입니다. 키워드를 입력하여 다양한 제품을 쉽게 찾아보세요"
        url="search"
      />
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
