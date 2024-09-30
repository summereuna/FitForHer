import supabase from "@/shared/supabaseClient";
import {
  SameCategoryProduct,
  SameSubCategoryProduct,
} from "@/types/category.types";
import { useInfiniteQuery } from "@tanstack/react-query";

// SELECT 상위 카테고리
const getSameCateProducts = async (
  pageParam: number,
  categoryName: string,
  sortBy: "newest" | "low-price" | "high-price"
): Promise<SameCategoryProduct[]> => {
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
    .eq("sub_categories.categories.name", categoryName)
    .filter("is_active", "eq", true)
    .order(orderColumn, {
      ascending,
    })
    .range((pageParam - 1) * pageSize, pageParam * pageSize - 1); // 페이지네이션 범위

  if (error) throw error;

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
      getNextPageParam: (lastPage, allPages) => {
        //lastPage는 현재 페이지에서 받은 데이터 배열
        //allPages는 모든 페이지의 데이터 담은 배열
        return lastPage.length > 0 ? allPages.length + 1 : undefined;
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
): Promise<SameSubCategoryProduct[]> => {
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
    .eq("sub_categories.name", subCategoryName)
    .filter("is_active", "eq", true)
    .order(orderColumn, {
      ascending,
    })
    .range((pageParam - 1) * pageSize, pageParam * pageSize - 1); // 페이지네이션 범위

  if (error) throw error;

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
      getNextPageParam: (lastPage, allPages) => {
        //lastPage는 현재 페이지에서 받은 데이터 배열
        //allPages는 모든 페이지의 데이터 담은 배열
        return lastPage.length > 0 ? allPages.length + 1 : undefined;
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

//------------------------------------------------------------------------------
//최신 상품

const getNewestProducts = async (
  pageParam: number,
  sortBy: "newest" | "low-price" | "high-price"
): Promise<SameCategoryProduct[]> => {
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
    .order(orderColumn, {
      ascending,
    })
    .range((pageParam - 1) * pageSize, pageParam * pageSize - 1); // 페이지네이션 범위

  if (error) throw error;

  return data;
};

export const useNewestProducts = (
  sortBy: "newest" | "low-price" | "high-price" = "newest"
) => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["products-categories", sortBy],
      queryFn: ({ pageParam }) => getNewestProducts(pageParam, sortBy),
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
