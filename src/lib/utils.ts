import { categories } from "@/shared/data/categories";
import { MainProduct } from "@/types/main.types";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * 사이즈 a-b 차순 정렬 유틸 함수
 * @param sizes
 * @returns size a-b 차순
 */
export const sortSizes = (
  sizes: { size: string; stock_quantity: number }[]
) => {
  const order = ["XS", "S", "M", "L", "XL"];

  return sizes.sort((a, b) => {
    const indexA = order.indexOf(a.size);
    const indexB = order.indexOf(b.size);
    return indexA - indexB;
  });
};

/**
 * 이미지 배열 순서 정렬 유틸 함수
 * @param images
 * @returns
 */
export const sortProductImages = (images: string[]) => {
  return images.sort((a: string, b: string) => a.localeCompare(b));
};

//sortProductImages(
//     product.product_images.map(
//       (img: { image_url: string }) => img.image_url
//     )
//   )[0]

/**
 * 상품 이미지 중 첫 번째 대표 이미지 찾는 함수
 * @param imageArray
 * @returns 상풒 대표 사진 url
 */
export const getOnlyRepresentativePhoto = (
  imageArray: { image_url: string }[]
) => {
  return imageArray.find((img) => img.image_url.includes("product_img_0"))
    ?.image_url;
};

/**
 * 영어 카테고리명 한글 카테고리명으로 바꾸는 함수
 * @param engCategoryName
 * @returns 한글 카테고리 이름
 */
export const getKoreanCategoryName = (
  engCategoryName: string
): string | undefined => {
  const categoryList = categories;
  const category = categoryList.find((item) => item.value === engCategoryName);
  return category ? category.label : undefined;
};

// /**
//  * 상위 카테고리 상품 정렬 함수
//  * (상위 카테고리의 경우 상위 카테고리의 서브 카테고리 안에서만 상품이 정렬 되기 때문에 전체 상품에 대한 정렬이 클라이언트 사이드에서 필요)
//  * @param products
//  * @param sortBy
//  * @returns 정렬기준에 따라 정렬된 products 배열
//  */
// export const sortProducts = (
//   products: MainProduct[],
//   sortBy: "newest" | "low-price" | "high-price"
// ) => {
//   switch (sortBy) {
//     case "newest":
//       return products.sort(
//         (a, b) =>
//           new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
//       );
//     case "low-price":
//       return products.sort((a, b) => a.price - b.price);
//     case "high-price":
//       return products.sort((a, b) => b.price - a.price);
//     default:
//       return products;
//   }
// };
