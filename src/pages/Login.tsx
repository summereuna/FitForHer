import AuthPromo from "@/components/AuthPromo";
import LoginForm from "@/components/LoginForm";

export default function Login() {
  return (
    <div className="grid grid-cols-1 gap-10 md:grid-cols-2 h-full">
      <AuthPromo />
      <LoginForm />
    </div>
  );
}
