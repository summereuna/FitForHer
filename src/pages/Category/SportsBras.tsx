import { useSameCateProducts, useSameSubCateProducts } from "@/api/categoryApi";
import AsideFilter from "@/components/Category/AsideFilter";
import CategoryPageSection from "@/components/Category/CategoryPageSection";
import MetaTag from "@/components/MetaTag";
import SubCategory from "@/pages/Category/SubCategory";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function SportsBras() {
  const categoryName = "sports-bras"; // 상위 카테고리 이름
  const { subCategoryName } = useParams();
  const navigate = useNavigate();

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
  //상위 카테고리 데이터 페치 (페이지네이션)
  const {
    data: categoryData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useSameCateProducts(categoryName, sortFilter);

  //하위카테고리
  const {
    data: subCategoryData,
    fetchNextPage: fetchNextPageSub,
    hasNextPage: hasNextPageSub,
    isFetchingNextPage: isFetchingNextPageSub,
  } = useSameSubCateProducts(subCategoryName!, sortFilter);
  //------------------------------------------------------------

  // URL의 subCategoryName이 변경될 때마다 selectedSubCategory 상태를 업데이트
  const [selectedSubCategory, setSelectedSubCategory] = useState<string | null>(
    subCategoryName || null
  );

  // URL 변경에 따라 selectedSubCategory를 업데이트
  useEffect(() => {
    setSelectedSubCategory(subCategoryName || null);
  }, [subCategoryName]);

  const handleSubCategorySelect = (subCategoryName: string) => {
    if (subCategoryName === categoryName) {
      // 상의(메인 카테고리)를 클릭했을 때는 서브 카테고리를 해제하고 메인 페이지로 이동
      setSelectedSubCategory(null);
      navigate(`/category/${categoryName}`);
    } else {
      // 서브 카테고리를 선택했을 때는 해당 서브 카테고리로 이동
      setSelectedSubCategory(subCategoryName);
      navigate(`/category/${categoryName}/${subCategoryName}`);
    }
  };

  return (
    <div className="flex flex-row space-x-10 w-full">
      <MetaTag
        title="스포츠 브라"
        description="스포츠 브라 카테고리 페이지입니다. 여러 브랜드의 스포츠 브라 컬렉션에서 운동 기능에 최적화된 스포츠 브라를 찾으세요."
      />
      {categoryData && (
        <AsideFilter
          topCateName={categoryName}
          topCateData={categoryData}
          subCateData={subCategoryData}
          onSubCategorySelect={handleSubCategorySelect}
        />
      )}
      <main className="flex flex-row w-full space-y-5 h-m-80 flex-wrap lg:space-x-5 lg:flex-nowrap lg:space-y-0">
        {categoryData && !selectedSubCategory && (
          <CategoryPageSection
            data={categoryData}
            handleChangeSortFilter={handleChangeSortFilter}
            fetchNextPage={fetchNextPage}
            hasNextPage={hasNextPage}
            isFetchingNextPage={isFetchingNextPage}
          />
        )}
        {subCategoryData && selectedSubCategory && subCategoryName && (
          <SubCategory
            data={subCategoryData}
            handleChangeSortFilter={handleChangeSortFilter}
            fetchNextPage={fetchNextPageSub}
            hasNextPage={hasNextPageSub}
            isFetchingNextPage={isFetchingNextPageSub}
            subCategoryName={subCategoryName}
          />
        )}
      </main>
    </div>
  );
}

export default SportsBras;
