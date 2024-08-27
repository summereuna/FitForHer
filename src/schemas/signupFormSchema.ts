import { passwordSchema } from "@/schemas/passwordSchema";
import * as z from "zod";

export const signupFormSchema = z
  .object({
    role: z.enum(["customer", "seller", "admin"]),
    name: z.string().min(2, {
      message: "닉네임은 두 글자 이상이어야 합니다.",
    }),
    email: z
      .string()
      .min(1, {
        message: "이메일을 입력하세요.",
      })
      .email({ message: "유효한 이메일 주소를 입력하세요." }),
    password: passwordSchema, //패스워드 스키마 직접 참조
    passwordCheck: z
      .string()
      .min(8, { message: "비밀번호 확인은 최소 8자리 이상이어야 합니다." }),
    social_type: z.string(),
  })
  .superRefine(({ passwordCheck, password }, ctx) => {
    if (passwordCheck !== password) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "비밀번호 확인이 비밀번호와 일치하지 않습니다.",
        path: ["passwordCheck"],
      });
    }
  });

//superRefine(): 전체 객체 스키마에 대한 검증을 수행
//여러 필드 간의 관계를 검증하거나, 두 값(예: 비밀번호와 비밀번호 확인)을 비교하는 데 적합
//ctx.addIssue 메서드를 사용해 여러 검증 오류를 추가 가능
