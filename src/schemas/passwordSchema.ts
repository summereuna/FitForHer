import * as z from "zod";

export const passwordSchema = z
  .string()
  .min(8, { message: "비밀번호는 최소 8자리 이상이어야 합니다." })
  .refine(
    (value) => {
      // 대문자, 소문자, 숫자, 특수문자 3종류 이상의 조합인지 확인
      const hasUpperCase = /[A-Z]/.test(value);
      const hasLowerCase = /[a-z]/.test(value);
      const hasNumbers = /\d/.test(value);
      const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(value);

      const typesCount = [
        hasUpperCase,
        hasLowerCase,
        hasNumbers,
        hasSpecial,
      ].filter(Boolean).length;

      return typesCount >= 3;
    },
    {
      message:
        "비밀번호는 영어 대문자, 소문자, 숫자, 특수문자 중 3종류 이상의 조합이어야 합니다.",
    }
  )
  .refine(
    (value) => {
      // 비밀번호에 일련번호나 전화번호가 포함되지 않도록
      const forbiddenPatterns = [
        "123456",
        "654321",
        "000000",
        "111111",
        "999999", // 일련번호 패턴
        "010",
        "02",
        "011",
        "016",
        "019", // 전화번호 패턴
      ];

      return !forbiddenPatterns.some((pattern) => value.includes(pattern));
    },
    {
      message:
        "비밀번호에 일련번호나 전화번호와 같은 쉬운 문자열이 포함되어서는 안 됩니다.",
    }
  )
  // .refine(
  //   (value) => {
  //     // 비밀번호에 아이디가 포함되지 않도록
  //     return !value.includes(username);
  //   },
  //   {
  //     message: "비밀번호는 사용자 아이디를 포함할 수 없습니다.",
  //   }
  // )
  .refine(
    (value) => {
      // 잘 알려진 단어나 키보드 상에서 나란히 있는 문자열이 포함되지 않도록
      const forbiddenWords = [
        "password",
        "qwer",
        "welcome",
        "admin",
        "abc123",
        "asd",
        "zxc",
      ];

      return !forbiddenWords.some((word) => value.toLowerCase().includes(word));
    },
    {
      message:
        "비밀번호는 쉽게 추측 가능한 단어나 키보드 패턴을 포함할 수 없습니다.",
    }
  );
