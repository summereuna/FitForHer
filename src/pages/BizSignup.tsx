import { useCreateUser } from "@/api/userApi";
import BizSignForm from "@/components/BizSignForm";
import { SignupUsersRequest } from "@/types/user.types";

export default function BizSignup() {
  const { mutateCreateUser, isError, errorMessage } = useCreateUser();

  const handleSignup = (newUser: SignupUsersRequest) => {
    mutateCreateUser(newUser);
  };

  return (
    <div>
      <BizSignForm
        onSignup={handleSignup}
        isError={isError}
        errorMessage={errorMessage}
      />
    </div>
  );
}
