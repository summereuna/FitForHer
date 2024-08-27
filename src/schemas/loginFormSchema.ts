import * as z from "zod";

export const loginFormSchema = z.object({
  email: z
    .string()
    .min(1, {
      message: "이메일을 입력하세요.",
    })
    .email({ message: "유효한 이메일 주소를 입력하세요." }),
  password: z.string().min(1, {
    message: "비밀번호를 입력하세요.",
  }),
});
