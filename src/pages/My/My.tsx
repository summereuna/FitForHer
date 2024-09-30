import { useDeleteUser } from "@/api/userApi";
import Alert from "@/components/Alert";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import { getCreatedTime, getUserRoleKorea } from "@/lib/utils";
import { Separator } from "@radix-ui/react-separator";

const My = () => {
  const { authId, session } = useAuth();
  const { mutateDeleteUser, isPending } = useDeleteUser();

  const handleRemoveUser = () => {
    mutateDeleteUser(authId as string);
  };

  return (
    <div className="flex justify-center">
      <Card className="flex flex-col justify-center space-y-10 p-10 my-10">
        <CardTitle>{session?.user.user_metadata.name} 님의 프로필</CardTitle>
        <Separator
          orientation="vertical"
          className="bg-gray-300 h-[1px] w-full"
        />
        <CardContent className="flex flex-col space-y-5 p-0">
          <CardDescription>이메일: {session?.user.email}</CardDescription>
          <CardDescription>
            회원 종류: {getUserRoleKorea(session?.user.user_metadata.role)}
          </CardDescription>
          <CardDescription>
            가입일: {session && getCreatedTime(session.user.created_at)}
          </CardDescription>
          <CardDescription>
            마지막 로그인:{" "}
            {session && getCreatedTime(session.user.last_sign_in_at as string)}
          </CardDescription>
        </CardContent>
        <CardFooter className="flex p-0">
          <Alert
            variant={"outline"}
            buttonChildren={"회원 탈퇴"}
            title={"회원 탈퇴"}
            description={`회원 탈퇴 시 F4H 멤버십 혜택을 더 이상 받을 수 없습니다. \n정말 탈퇴하시겠습니까?`}
            noButton={"아니오"}
            yesButton={"네"}
            onClick={handleRemoveUser}
            isPending={isPending}
          />
        </CardFooter>
      </Card>
    </div>
  );
};

export default My;
