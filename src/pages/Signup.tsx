import { useCreateUser } from "@/api/userApi";
import AuthPromo from "@/components/AuthPromo";
import SignForm from "@/components/SignForm";
import MetaTag from "@/components/MetaTag";
import { SignupUsersRequest } from "@/types/user.types";

export default function Signup() {
  const { mutateCreateUser, isError, errorMessage } = useCreateUser();

  const handleSignup = (newUser: SignupUsersRequest) => {
    mutateCreateUser(newUser);
  };
  return (
    <div className="grid grid-cols-1 gap-10 md:grid-cols-2 h-full">
      <MetaTag
        title="회원가입"
        description="아직 F4H 계정이 없으신가요? Fit For Her의 멤버가 되어 다양한 혜택을 누리세요!"
      />
      <AuthPromo />
      <SignForm
        onSignup={handleSignup}
        isError={isError}
        errorMessage={errorMessage}
      />
    </div>
  );
}
