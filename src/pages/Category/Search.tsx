import { useSearchProducts } from "@/api/searchApi";
import CategoryPageSection from "@/components/Category/CategoryPageSection";
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
  console.log("키워드:", keyword);

  const {
    data: searchData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useSearchProducts(sortFilter, keyword as string);

  return (
    <div className="flex justify-center items-center w-full">
      <main>
        {searchData && (
          <CategoryPageSection
            data={searchData}
            handleChangeSortFilter={handleChangeSortFilter}
            fetchNextPage={fetchNextPage}
            hasNextPage={hasNextPage}
            isFetchingNextPage={isFetchingNextPage}
          />
        )}
      </main>
    </div>
  );
};

export default Search;
