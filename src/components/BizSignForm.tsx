import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signupFormSchema } from "@/schemas/signupFormSchema";
import { SignupUsersRequest } from "@/types/user.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface BizSignFormProps {
  onSignup: (newUser: SignupUsersRequest) => void;
  isError: boolean;
  errorMessage: string;
}

export default function BizSignForm({
  onSignup,
  isError,
  errorMessage,
}: BizSignFormProps) {
  const form = useForm<z.infer<typeof signupFormSchema>>({
    resolver: zodResolver(signupFormSchema),
    defaultValues: {
      email: "",
      password: "",
      passwordCheck: "",
      name: "",
      role: "seller",
      social_type: "email",
    },
  });

  const onSubmit = (values: z.infer<typeof signupFormSchema>) => {
    const newUser = {
      email: values.email,
      password: values.password,
      name: values.name,
      role: values.role,
      social_type: "email",
    };

    onSignup(newUser);
  };

  return (
    <div className="flex w-full justify-center content-center">
      <Card>
        <CardHeader>
          <div className="flex flex-col items-center py-5 text-xl font-semibold space-y-3">
            <span>FIT FOR HER</span>
            <span className="text-lg font-medium">비즈니스 회원 가입하기</span>
          </div>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-5 w-80"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="name">닉네임</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="닉네임"
                        id="name"
                        type="text"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription className="text-xs">
                      {`*닉네임은 두 글자 이상이어야 합니다.\n"브랜드명" 혹은 "브랜드명 관리자"를 추천합니다.`}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="email">이메일</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="이메일"
                        id="email"
                        type="email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="password">비밀번호</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="비밀번호"
                        id="password"
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="passwordCheck"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="passwordCheck">비밀번호 확인</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="비밀번호 확인"
                        id="passwordCheck"
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription className="text-xs">
                      *비밀번호는 영어 대문자, 소문자, 숫자, 특수문자 중 3종류
                      이상을 포함한 최소 8자리 이상이어야 합니다.
                    </FormDescription>
                    <FormMessage>{isError && errorMessage}</FormMessage>
                  </FormItem>
                )}
              />
              <div className="flex gap-5">
                <Button variant="outline" className="w-full">
                  취소
                </Button>
                <Button type="submit" className="w-full">
                  가입하기
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
