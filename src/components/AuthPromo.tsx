import { Icon } from "@/components/Icon";
import { cardIcon, cartIcon, locationIcon, wishIcon } from "@/shared/icons";

const AuthPromo = () => {
  return (
    <div className="w-full hidden md:flex flex-col justify-center items-center bg-zinc-100 text-center space-y-5">
      <h2 className="text-xl font-semibold">아직 F4H 계정이 없으신가요?</h2>
      <p className="text-base">다양한 가입 혜택을 확인하세요!</p>
      <div className="space-y-4">
        <div className="flex flex-row space-x-2 text-sm">
          <Icon className="size-5">{cardIcon}</Icon>
          <p>빠른 결제</p>
        </div>
        <div className="flex flex-row space-x-2 text-sm">
          <Icon className="size-5">{locationIcon}</Icon>
          <p>주문 현황 조회</p>
        </div>
        <div className="flex flex-row space-x-2 text-sm">
          <Icon className="size-5">{cartIcon}</Icon>
          <p>주문 히스토리 확인</p>
        </div>
        <div className="flex flex-row space-x-2 text-sm">
          <Icon className="size-5">{wishIcon}</Icon>
          <p>위시리스트 저장</p>
        </div>
      </div>
    </div>
  );
};

export default AuthPromo;
