import { useCategoryProducts } from "@/api/mainApi";
import AsideFilter from "@/components/Category/AsideFilter";
import CategoryPageSection from "@/components/Category/CategoryPageSection";
import SubCategory from "@/pages/Category/SubCategory";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function SportsBras() {
  const categoryName = "sports-bras"; // 상위 카테고리 이름

  const { subCategoryName } = useParams();

  const navigate = useNavigate();

  //상위 카테고리 데이터 페치
  const {
    data: categoryData,
    isPending,
    isSuccess,
  } = useCategoryProducts(categoryName);

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
      {isSuccess && categoryData && (
        <AsideFilter
          data={categoryData}
          onSubCategorySelect={handleSubCategorySelect}
        />
      )}
      <main className="flex flex-row w-full space-y-5 h-m-80 flex-wrap lg:space-x-5 lg:flex-nowrap lg:space-y-0">
        {isSuccess && categoryData && !selectedSubCategory && (
          <CategoryPageSection data={categoryData} isPending={isPending} />
        )}
        {selectedSubCategory && subCategoryName && (
          <SubCategory subCategoryName={subCategoryName} />
        )}
      </main>
    </div>
  );
}

export default SportsBras;
