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
