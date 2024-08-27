import LoginForm from "@/components/LoginForm";
import { cartIcon, locationIcon, timeIcon, wishIcon } from "@/shared/icons";

export default function Login() {
  return (
    <div className="grid grid-cols-1 gap-10 md:grid-cols-2 h-full">
      <div className="w-full hidden md:flex flex-col justify-center items-center bg-zinc-100 text-center space-y-5">
        <h2 className="text-xl font-semibold">아직 F4H 계정이 없으신가요?</h2>
        <p className="text-base">다양한 가입 혜택을 확인하세요!</p>
        <div className="space-y-4">
          <div className="flex flex-row space-x-2 text-sm">
            <div>{timeIcon}</div>
            <p>더 빠른 결제</p>
          </div>
          <div className="flex flex-row space-x-2 text-sm">
            <div>{locationIcon}</div>
            <p>빠른 주문 현황 조회</p>
          </div>
          <div className="flex flex-row space-x-2 text-sm">
            <div>{cartIcon}</div>
            <p>주문 히스토리 확인</p>
          </div>
          <div className="flex flex-row space-x-2 text-sm">
            <div>{wishIcon}</div>
            <p>위시리스트 저장</p>
          </div>
        </div>
      </div>
      <LoginForm />
    </div>
  );
}
