import CategoryFilterSelect from "@/components/Category/CategoryFilterSelect";
import ProductItem from "@/components/ProductItem";
import { SameCategoryProduct } from "@/types/category.types";
import { SearchProduct } from "@/types/search.types";
import {
  FetchNextPageOptions,
  InfiniteData,
  UseInfiniteQueryResult,
} from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

interface CategoryPageSectionProps {
  data: InfiniteData<SameCategoryProduct[]> | InfiniteData<SearchProduct[]>;
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

  const observerRef = useRef<HTMLDivElement | null>(null); // 감지할 div의 ref

  useEffect(() => {
    if (isFetchingNextPage || !hasNextPage) return;

    //observer 인스턴스 생성
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchNextPage(); // observerRef가 화면에 나타나고 다음 페이지 있으면 다음페이지 불러옴
        }
      },
      { threshold: 1 } // 요소가 100% 화면에 보일 때 트리거
    );

    // 현재 observerRef 값을 로컬 변수로 저장
    const currentRef = observerRef.current;

    //관찰시작
    if (currentRef) {
      observer.observe(currentRef);
    }

    //관찰 멈추기
    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [isFetchingNextPage, hasNextPage, fetchNextPage]);

  return (
    <section className="flex flex-row w-full space-y-5 h-m-80 flex-wrap lg:space-x-5 lg:flex-nowrap lg:space-y-0">
      <div className="flex flex-col space-y-5">
        <div className="flex justify-end">
          <CategoryFilterSelect onChangeSortFilter={handleChangeSortFilter} />
        </div>
        <div className="flex flex-col gap-4">
          {data.pages.map((page, pageIndex) => (
            <div
              key={pageIndex}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
            >
              {page.map((item) => (
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
          ))}

          {/* 페이지가 더 있을 경우 로딩 인디케이터
          {isFetchingNextPage && <p>로딩중...</p>} */}
          {/* observerRef가 연결된 div: 이 div가 화면에 보일 때 다음 페이지를 불러옴 */}
          <div ref={observerRef} style={{ height: "1px" }} />
        </div>
      </div>
    </section>
  );
};

export default CategoryPageSection;
