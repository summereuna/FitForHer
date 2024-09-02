import { z } from "zod";

const productSizesSchema = z
  .array(
    z.object({
      size: z.enum(["FREE", "XS", "S", "M", "L", "XL"], {
        message: "사이즈를 선택하세요.",
      }),
      stock_quantity: z.number().int().positive({
        message: "재고 수량을 입력하세요.",
      }),
    })
  )
  .refine(
    (sizes) => {
      return sizes.every((size) => size.size && size.stock_quantity > 0);
    },
    {
      message: "모든 사이즈와 재고 수량을 입력하세요.",
    }
  );

export const productFormSchema = z.object({
  name: z.string().min(1, {
    message: "상품명을 입력하세요.",
  }),
  description: z.string().min(1, {
    message: "상품에 대한 설명을 입력하세요.",
  }),
  price: z.number().int().positive({
    message: "상품 가격을 입력하세요.", // > 0 가격 입력시 0 보다 커야함
  }),
  color: z.string().min(1, {
    message: "상품 컬러를 선택하세요.",
  }),
  sizes: productSizesSchema, //배열
  category: z.string().min(1, {
    message: "상품 카테고리를 선택하세요.",
  }),
  imageUrls: z
    .array(z.string())
    .min(1, {
      message: "상품 사진은 최소 1개 이상 반드시 업로드해야 합니다.",
    })
    .max(4, { message: "상품 사진은 최대 4개 까지 업로드할 수 있습니다." }), //이미지 url: string[] // form에 담는 용
});
