import * as z from "zod";

export const shippingFormSchema = z.object({
  order_status: z.enum([
    "order_completed", // 주문 완료
    "pending_shipment", // 발송 대기
    "shipment_started", // 발송 시작
    "order_cancelled", // 주문 취소
  ]),
  name: z.string().min(2, {
    message: "이름은 두 글자 이상이어야 합니다.",
  }),
  email: z
    .string()
    .min(1, {
      message: "이메일을 입력하세요.",
    })
    .email({ message: "유효한 이메일 주소를 입력하세요." }),
  phone0: z.string().regex(/^01[0-9]$/, {
    message: "올바른 휴대전화번호를 입력하세요.",
  }),
  phone1: z.string().regex(/^\d{4}$/, {
    message: "올바른 휴대전화번호를 입력하세요.",
  }),
  phone2: z.string().regex(/^\d{4}$/, {
    message: "올바른 휴대전화번호를 입력하세요.",
  }),
  address: z.string().min(1, {
    message: "주소를 입력하세요.",
  }),
  postal_code: z
    .string()
    .length(5, { message: "우편 번호 5자리를 입력하세요." }),
});
