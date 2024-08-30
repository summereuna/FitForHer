import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { Separator } from "@/components/ui/separator";
import { signupFormSchema } from "@/schemas/signupFormSchema";
import { SignupUsersRequest } from "@/types/user.types";

import { zodResolver } from "@hookform/resolvers/zod";

import { RadioGroup, RadioGroupItem } from "@radix-ui/react-radio-group";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
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
    // console.log(values);
    const newUser = {
      email: values.email,
      password: values.password,
      name: values.name,
      role: values.role,
      social_type: "email",
    };

    onSignup(newUser);
  };

  // console.log(form.formState.errors);
  return (
    <div className="flex w-full justify-center content-center">
      <Card>
        <CardHeader>
          <div className="flex flex-col items-center py-5 text-xl font-semibold space-y-3">
            <span>FIT FOR HER</span>
            <span className="text-lg font-medium">비즈니스 회원 가입하기</span>
          </div>

          {/* <div className="flex flex-row justify-center items-center space-x-5 text-xs">
            <div className="relative flex flex-col items-center space-y-2">
              <div className="w-5 h-5 bg-black rounded-full flex justify-center items-center">
                <span className="text-white">1</span>
              </div>
              <span>판매자 정보 입력</span>
              <Separator
                orientation="horizontal"
                className="absolute top-[0.1rem] -right-[1.8rem] bg-gray-300 w-10"
              />
            </div>

            <div className="flex flex-col items-center space-y-2">
              <div className="w-5 h-5 bg-gray-300 rounded-full flex justify-center items-center">
                <span className="text-white">2</span>
              </div>
              <span className="text-gray-300">브랜드 정보 입력</span>
            </div>
          </div> */}
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
