import { useCreateUser } from "@/api/userApi";
import AuthPromo from "@/components/AuthPromo";
import SignForm from "@/components/SignForm";
import { SignupUsersRequest } from "@/types/user.types";

export default function Signup() {
  const { mutateCreateUser, isError, errorMessage } = useCreateUser();

  const handleSignup = (newUser: SignupUsersRequest) => {
    mutateCreateUser(newUser);
  };
  return (
    <div className="grid grid-cols-1 gap-10 md:grid-cols-2 h-full">
      <AuthPromo />
      <SignForm
        onSignup={handleSignup}
        isError={isError}
        errorMessage={errorMessage}
      />
    </div>
  );
}
