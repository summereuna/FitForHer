import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { loginFormSchema } from "@/schemas/loginFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { googleIcon, kakaoIcon } from "@/shared/icons";
import { AuthError, Provider } from "@supabase/supabase-js";
import useFormError from "@/hooks/useFormError";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
  const navigate = useNavigate();
  const { loginWithEmail, loginWithSocial } = useAuth();
  const { errorMessage, setErrorMessage } = useFormError();
  const [isPending, setIsPending] = useState(false);

  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleLoginSubmit = async (values: z.infer<typeof loginFormSchema>) => {
    const loginData = {
      email: values.email,
      password: values.password,
    };

    setIsPending(true); //로딩 시작

    try {
      const { session } = await loginWithEmail(loginData);
      if (session.user.user_metadata.role === "seller") {
        console.log(session.user.user_metadata.role);
        setIsPending(false); // 로딩 끝
        navigate("/dashboard");
      } else {
        setIsPending(false); // 로딩 끝
        navigate("/");
      }
    } catch (error) {
      if (error instanceof AuthError) {
        setErrorMessage("로그인을 할 수 없습니다.");
      }
    }
  };

  const handleLoginGoogle = async (e: React.MouseEvent) => {
    const provider = e.currentTarget.id as Provider;

    setIsPending(true); //로딩 시작
    try {
      await loginWithSocial(provider);
      setIsPending(false); // 로딩 끝
    } catch (error) {
      if (error instanceof AuthError) {
        setErrorMessage("로그인을 할 수 없습니다.");
        setIsPending(false); // 로딩 끝
      }
    }
  };

  return (
    <div className="container mx-auto flex justify-center content-center">
      <div className="space-y-8">
        <div className="flex justify-center py-5 text-xl font-semibold">
          FIT FOR HER
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleLoginSubmit)}
            className="space-y-5 w-80"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>이메일</FormLabel>
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
                  <FormLabel>비밀번호</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="비밀번호"
                      id="password"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage>{errorMessage && errorMessage}</FormMessage>
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isPending} className="w-full">
              로그인
            </Button>
          </form>
        </Form>
        <div aria-label="또는" className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t"></span>
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="bg-background px-2 text-muted-foreground">
              또는 소셜 로그인으로 빠르게 시작하기
            </span>
          </div>
        </div>
        <div
          aria-label="소셜 로그인 컨테이너"
          className="flex justify-center space-x-5"
        >
          <button
            id="google"
            onClick={handleLoginGoogle}
            className="flex justify-center items-center w-9 h-9 p-1 rounded-full border-[1px] bg-white hover:border-gray-300 hover:bg-gray-100 transition duration-200 ease-in-out"
            disabled={isPending}
          >
            {googleIcon}
          </button>
          <button
            id="kakao"
            // onClick={}
            className="flex justify-center items-center w-9 h-9 p-1 rounded-full border-[1px] bg-white hover:border-gray-300 hover:bg-gray-100 transition duration-200 ease-in-out"
            disabled={isPending}
          >
            {kakaoIcon}
          </button>
        </div>
      </div>
    </div>
  );
}
