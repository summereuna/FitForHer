import supabase from "@/shared/supabaseClient";
import { SearchProduct } from "@/types/search.types";
import { useInfiniteQuery } from "@tanstack/react-query";

const getSearchProducts = async (
  pageParam: number,
  sortBy: "newest" | "low-price" | "high-price",
  keyword: string
): Promise<SearchProduct[]> => {
  let orderColumn = "created_at";
  let ascending = false;

  if (sortBy === "low-price") {
    orderColumn = "price";
    ascending = true; // 가격순으로 오름차순 정렬 (저렴한 순서)
  } else if (sortBy === "high-price") {
    orderColumn = "price";
    ascending = false; // 가격순으로 내림차순 정렬 (비싼 순서)
  } else if (sortBy === "newest") {
    orderColumn = "created_at";
    ascending = false; // 최신순으로 내림차순 정렬
  }

  const pageSize = 8; // 페이지당 아이템 수

  const { data, error } = await supabase
    .from("products")
    .select(
      `*,
        product_sizes( size, stock_quantity ),
        product_images( image_url ),
        sub_categories!inner ( *, categories!inner ( name ) ),
        brands( name )
        `
    )
    .filter("is_active", "eq", true)
    .or(`name.ilike.%${keyword}%,description.ilike.%${keyword}%`)
    .order(orderColumn, {
      ascending,
    })
    .range((pageParam - 1) * pageSize, pageParam * pageSize - 1); // 페이지네이션 범위

  if (error) throw new Error(error.message);

  return data;
};

export const useSearchProducts = (
  sortBy: "newest" | "low-price" | "high-price" = "newest",
  keyword: string
) => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["search", sortBy, keyword],
      queryFn: ({ pageParam }) => getSearchProducts(pageParam, sortBy, keyword),
      initialPageParam: 1, // v5 달라진 점 -> 본인이 불러와야 하는 첫 페이지를 지정!
      getNextPageParam: (lastPage, allPages) => {
        //lastPage는 현재 페이지에서 받은 데이터 배열
        //allPages는 모든 페이지의 데이터 담은 배열
        return lastPage.length > 0 ? allPages.length + 1 : undefined;
      },
    });

  return {
    data,
    fetchNextPage, //불러올 다음 페이지가 있다면 true
    hasNextPage, //불러올 다음 페이지가 있다면 true
    isFetchingNextPage, //fetchNextPage를 사용해서 다음 페이지를 불러오고 있는 상태라면 true
  };
};
