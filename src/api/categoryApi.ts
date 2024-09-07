import supabase from "@/shared/supabaseClient";
import { useInfiniteQuery } from "@tanstack/react-query";

// SELECT 상위 카테고리
const getSameCateProducts = async (
  pageParam: number,
  categoryName: string,
  sortBy: "newest" | "low-price" | "high-price"
) => {
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

  const { data, error } = await supabase
    .from("products")
    .select(
      `*,
      product_sizes( size, stock_quantity ),
      product_images( image_url ),
      sub_categories!inner (
        *,
        categories!inner (
          name
        )
      ),
      brands(
        name
      )
      )`
    )
    .eq("sub_categories.categories.name", categoryName)
    .filter("is_active", "eq", true)
    .order(orderColumn, {
      ascending,
    })
    .range((pageParam - 1) * 8, pageParam * 8 - 1); // 페이지네이션 범위

  if (error) throw console.log("쿼리 잘못됌", error);

  return data;
};

export const useSameCateProducts = (
  categoryName: string,
  sortBy: "newest" | "low-price" | "high-price" = "newest"
) => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["products-categories", categoryName, sortBy],
      queryFn: ({ pageParam }) =>
        getSameCateProducts(pageParam, categoryName, sortBy),
      initialPageParam: 1, // v5 달라진 점 -> 본인이 불러와야 하는 첫 페이지를 지정!
      getNextPageParam: (lastPage) => {
        return lastPage.length > 0 ? lastPage[lastPage.length - 1] : undefined;
      },
      enabled: !!categoryName,
    });

  return {
    data,
    fetchNextPage, //불러올 다음 페이지가 있다면 true
    hasNextPage, //불러올 다음 페이지가 있다면 true
    isFetchingNextPage, //fetchNextPage를 사용해서 다음 페이지를 불러오고 있는 상태라면 true
  };
};

//---------------------------------------------------------------------------------------
// SELECT 하위 카테고리
const getSameSubCateProducts = async (
  pageParam: number,
  subCategoryName: string,
  sortBy: "newest" | "low-price" | "high-price"
) => {
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

  const { data, error } = await supabase
    .from("products")
    .select(
      `*,
      product_sizes( size, stock_quantity ),
      product_images( image_url ),
      sub_categories!inner (
        name,
        categories!inner (
          name
        )
      ),
      brands(
        name
      )
      )`
    )
    .eq("sub_categories.name", subCategoryName)
    .filter("is_active", "eq", true)
    .order(orderColumn, {
      ascending,
    })
    .range((pageParam - 1) * 8, pageParam * 8 - 1); // 페이지네이션 범위

  if (error) throw console.log("쿼리 잘못됌", error);

  return data;
};

export const useSameSubCateProducts = (
  subCategoryName: string,
  sortBy: "newest" | "low-price" | "high-price" = "newest"
) => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["products-categories", subCategoryName, sortBy],
      queryFn: ({ pageParam }) =>
        getSameSubCateProducts(pageParam, subCategoryName, sortBy),
      initialPageParam: 1, // v5 달라진 점 -> 본인이 불러와야 하는 첫 페이지를 지정!
      getNextPageParam: (lastPage) => {
        return lastPage.length > 0 ? lastPage[lastPage.length - 1] : undefined;
      },
      enabled: !!subCategoryName,
    });

  return {
    data,
    fetchNextPage, //불러올 다음 페이지가 있다면 true
    hasNextPage, //불러올 다음 페이지가 있다면 true
    isFetchingNextPage, //fetchNextPage를 사용해서 다음 페이지를 불러오고 있는 상태라면 true
  };
};
