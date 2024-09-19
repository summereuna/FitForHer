import { useCreateUser } from "@/api/userApi";
import BizPromo from "@/components/BizPromo";
import BizSignForm from "@/components/BizSignForm";
import { SignupUsersRequest } from "@/types/user.types";

export default function BizSignup() {
  const { mutateCreateUser, isError, errorMessage } = useCreateUser();

  const handleSignup = (newUser: SignupUsersRequest) => {
    mutateCreateUser(newUser);
  };

  return (
    <div className="grid grid-cols-1 gap-10 md:grid-cols-2 h-full">
      <BizPromo />
      <BizSignForm
        onSignup={handleSignup}
        isError={isError}
        errorMessage={errorMessage}
      />
    </div>
  );
}
