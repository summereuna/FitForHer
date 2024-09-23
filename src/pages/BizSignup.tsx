import { useCreateUser } from "@/api/userApi";
import BizPromo from "@/components/BizPromo";
import BizSignForm from "@/components/BizSignForm";
import MetaTag from "@/components/MetaTag";
import { SignupUsersRequest } from "@/types/user.types";

export default function BizSignup() {
  const { mutateCreateUser, isError, errorMessage } = useCreateUser();

  const handleSignup = (newUser: SignupUsersRequest) => {
    mutateCreateUser(newUser);
  };

  return (
    <div className="grid grid-cols-1 gap-10 md:grid-cols-2 h-full">
      <MetaTag
        title="비즈니스 회원가입"
        description="아직 F4H 계정이 없으신가요? Fit For Her에서 브랜드 셀러로서의 혜택을 경험해보세요!"
        url="signup/biz"
      />
      <BizPromo />
      <BizSignForm
        onSignup={handleSignup}
        isError={isError}
        errorMessage={errorMessage}
      />
    </div>
  );
}
