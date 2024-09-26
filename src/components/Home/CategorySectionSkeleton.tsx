import { Skeleton } from "@/components/ui/skeleton";

const CategorySectionSkeleton = () => {
  return (
    <section className="min-h-[24rem] flex flex-row w-full space-y-5 flex-wrap lg:space-x-5 lg:flex-nowrap lg:space-y-0">
      <div
        aria-label="카테고리 설명"
        className="flex flex-col space-y-7 items-center w-full pb-5 lg:items lg:items-start"
      >
        <Skeleton className="h-6 w-[100px]" />
        <div className="flex flex-col space-y-2">
          <Skeleton className="h-4 w-[300px]" />
          <Skeleton className="h-4 w-[300px]" />
          <Skeleton className="h-4 w-[300px]" />
        </div>
        <div className="flex flex-row space-x-2">
          <Skeleton className="h-8 w-[100px]" />
          <Skeleton className="h-8 w-[100px]" />
          <Skeleton className="h-8 w-[100px]" />
        </div>
        <Skeleton className="h-10 w-32" />
      </div>

      <div
        aria-label="카테고리별 상품"
        className="flex flex-col w-full p-0 md:w-1/2 md:p-3 lg:p-0"
      >
        {/*  */}
        {/* h-[238px]  */}
        <Skeleton className="w-full h-60" />
        <div className="flex flex-col w-full pt-5 space-y-2">
          <div className="flex flex-row space-x-2 items-center w-full">
            <div className="flex flex-col space-y-2 w-full">
              <Skeleton className="h-4 w-full max-w-[130px] min-w-[30px]" />
              <Skeleton className="h-4 w-full max-w-[200px] min-w-[30px]" />
              <Skeleton className="h-4 w-full max-w-[180px] min-w-[30px]" />
              <Skeleton className="h-4 w-full max-w-[80px] min-w-[30px]" />
            </div>
          </div>
        </div>
      </div>
      {/*  */}
      {/*  */}
      <div
        aria-label="카테고리별 상품"
        className="flex flex-col w-full p-0 md:w-1/2 md:p-3 lg:p-0"
      >
        <Skeleton className="w-full h-60" />
        <div className="flex flex-col w-full pt-5 space-y-2">
          <div className="flex flex-row space-x-2 items-center w-full">
            <div className="space-y-2 w-full">
              <Skeleton className="h-4 w-full max-w-[130px] min-w-[30px]" />
              <Skeleton className="h-4 w-full max-w-[200px] min-w-[30px]" />
              <Skeleton className="h-4 w-full max-w-[180px] min-w-[30px]" />
              <Skeleton className="h-4 w-full max-w-[80px] min-w-[30px]" />
            </div>
          </div>
        </div>
      </div>
      {/*  */}
      {/*  */}
      <div
        aria-label="카테고리별 상품"
        className="flex flex-col w-full p-0 md:w-1/2 md:p-3 lg:p-0"
      >
        <Skeleton className="w-full h-60" />
        <div className="flex flex-col w-full pt-5 space-y-2">
          <div className="flex flex-row space-x-2 items-center w-full">
            <div className="space-y-2 w-full">
              <Skeleton className="h-4 w-full max-w-[130px] min-w-[30px]" />
              <Skeleton className="h-4 w-full max-w-[200px] min-w-[30px]" />
              <Skeleton className="h-4 w-full max-w-[180px] min-w-[30px]" />
              <Skeleton className="h-4 w-full max-w-[80px] min-w-[30px]" />
            </div>
          </div>
        </div>
      </div>
      {/*  */}
      {/*  */}
      <div
        aria-label="카테고리별 상품"
        className="flex flex-col w-full p-0 md:w-1/2 md:p-3 lg:p-0"
      >
        <Skeleton className="w-full h-60" />
        <div className="flex flex-col w-full pt-5 space-y-2">
          <div className="flex flex-row space-x-2 items-center w-full">
            <div className="space-y-2 w-full">
              <Skeleton className="h-4 w-full max-w-[130px] min-w-[30px]" />
              <Skeleton className="h-4 w-full max-w-[200px] min-w-[30px]" />
              <Skeleton className="h-4 w-full max-w-[180px] min-w-[30px]" />
              <Skeleton className="h-4 w-full max-w-[80px] min-w-[30px]" />
            </div>
          </div>
        </div>
      </div>
      {/*  */}
    </section>
  );
};

export default CategorySectionSkeleton;
