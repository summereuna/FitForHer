import { useNewestProducts } from "@/api/categoryApi";
import CategoryPageSection from "@/components/Category/CategoryPageSection";
import { useState } from "react";

const New = () => {
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
    data: categoryData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useNewestProducts(sortFilter);

  return (
    <div className="flex justify-center items-center w-full">
      <main>
        {categoryData && (
          <CategoryPageSection
            data={categoryData}
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

export default New;
