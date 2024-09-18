import * as z from "zod";

export const cartFormSchema = z.object({
  size: z.enum(["FREE", "XS", "S", "M", "L", "XL"], {
    message: "사이즈를 선택하세요.",
  }),
  size_quantity: z.number().int().positive({
    message:
      "상품 개수는 반드시 1개 이상 선택해야 합니다. 구매하고 싶지 않은 경우 장바구니에서 상품을 삭제해 주세요.",
  }),
});
