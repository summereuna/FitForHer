import * as z from "zod";

export const BrandWebsiteSchema = z.array(
  z.object({
    value: z.string().optional(),
  })
);

export const BrandFormSchema = z.object({
  name: z.string().min(1, { message: "브랜드 이름을 입력하세요." }).max(20, {
    message: "브랜드 이름은 20자 이상을 넘길 수 없습니다.",
  }),

  description: z
    .string()
    .max(160, {
      message: "브랜드 설명은 160자 이하로 입력하세요.",
    })
    .optional(),
  logo_url: z.string().optional(),
  // web_key: z.string().optional(),
  official_website: BrandWebsiteSchema,
});
