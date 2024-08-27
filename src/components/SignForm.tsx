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
import { signupFormSchema } from "@/schemas/signupFormSchema";
import { SignupUsersRequest } from "@/types/user.types";

import { zodResolver } from "@hookform/resolvers/zod";
import { RadioGroup, RadioGroupItem } from "@radix-ui/react-radio-group";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface SignFormProps {
  onSignup: (newUser: SignupUsersRequest) => void;
  isError: boolean;
  errorMessage: string;
}

export default function SignForm({
  onSignup,
  isError,
  errorMessage,
}: SignFormProps) {
  const form = useForm<z.infer<typeof signupFormSchema>>({
    resolver: zodResolver(signupFormSchema),
    defaultValues: {
      email: "",
      password: "",
      passwordCheck: "",
      name: "",
      role: "customer",
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

    if (values.role === "seller") {
      const isSeller = confirm("판매자가 맞습니까?");

      if (isSeller) {
        console.log("판매자로 가입!");
        onSignup(newUser);
      }
    } else {
      console.log("일반 회원으로 가입!");
      onSignup(newUser);
    }
  };

  // console.log(form.formState.errors);
  return (
    <div className="flex w-full justify-center content-center">
      <Card>
        <CardHeader>
          <CardTitle>회원 가입</CardTitle>

          <div className="flex justify-center py-5 text-xl font-semibold">
            FIT FOR HER
          </div>
          <CardDescription>설명설명설명</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-5 w-80"
            >
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    {/*  */}
                    {/*  */}
                    <FormLabel>회원 유형 선택</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-row space-x-5"
                      >
                        {/*  */}
                        <FormItem className="flex items-center">
                          <FormControl>
                            <RadioGroupItem id="customer" value="customer" />
                          </FormControl>
                          <FormLabel
                            htmlFor="customer"
                            className="flex items-center justify-center font-normal w-24 h-12  border-[1.5px] border-black"
                          >
                            일반 회원
                          </FormLabel>
                        </FormItem>
                        {/*  */}
                        <FormItem className="flex items-center">
                          <FormControl>
                            <RadioGroupItem id="seller" value="seller" />
                          </FormControl>
                          <FormLabel
                            htmlFor="seller"
                            className="flex items-center justify-center font-normal w-24 h-12  border"
                          >
                            브랜드 셀러
                          </FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/*  */}
              {/*  */}
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
                    <FormDescription>
                      *닉네임은 두 글자 이상 입력해 주세요.
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
                    <FormDescription>
                      *비밀번호는 영어 대문자, 소문자, 숫자, 특수문자 중 3종류
                      이상을 포함한 최소 8자리 이상이어야 합니다.
                    </FormDescription>
                    <FormMessage>{isError && errorMessage}</FormMessage>
                  </FormItem>
                )}
              />
              <div className="flex justify-end gap-3">
                <Button variant="outline">취소</Button>
                <Button type="submit">가입하기</Button>
              </div>
            </form>
          </Form>
        </CardContent>
        {/* <CardFooter className="flex justify-between"></CardFooter> */}
      </Card>
    </div>
  );
}
