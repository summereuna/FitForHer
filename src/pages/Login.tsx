import AuthPromo from "@/components/AuthPromo";
import LoginForm from "@/components/LoginForm";
import MetaTag from "@/components/MetaTag";

export default function Login() {
  return (
    <div className="grid grid-cols-1 gap-10 md:grid-cols-2 h-full">
      <MetaTag title="로그인" url="login" />
      <AuthPromo />
      <LoginForm />
    </div>
  );
}
