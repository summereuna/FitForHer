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
 *
 * @param imageArray
 * @returns 상풒 대표 사진 url
 */
export const getOnlyRepresentativePhoto = (
  imageArray: { image_url: string }[]
) => {
  return imageArray.find((img) => img.image_url.includes("product_img_0"))
    ?.image_url;
};
