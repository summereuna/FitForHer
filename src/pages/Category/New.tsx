import { useNewestProducts } from "@/api/categoryApi";
import CategoryPageSection from "@/components/Category/CategoryPageSection";
import MetaTag from "@/components/MetaTag";
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
      <MetaTag
        title="신제품"
        description="최신 상품을 한눈에 확인할 수 있는 페이지입니다. 새로운 트렌드와 스타일을 반영한 신제품을 만나보세요."
        url="category/new"
      />
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
