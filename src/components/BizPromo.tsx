import { Icon } from "@/components/Icon";
import {
  brandCartIcon,
  cartIcon,
  sparklesIcon,
  wishIcon,
} from "@/shared/icons";

const BizPromo = () => {
  return (
    <div className="w-full hidden md:flex flex-col justify-center items-center bg-zinc-100 text-center space-y-5">
      <h2 className="text-xl font-semibold">아직 F4H 계정이 없으신가요?</h2>
      <p className="text-base">
        Fit For Her에서 브랜드 셀러로서의 혜택을 경험해보세요!
      </p>
      <div className="space-y-4">
        <div className="flex flex-row space-x-2 text-sm">
          <Icon className="size-5">{brandCartIcon}</Icon>
          <p>브랜드 분석 도구</p>
        </div>
        <div className="flex flex-row space-x-2 text-sm">
          <Icon className="size-5">{sparklesIcon}</Icon>
          <p>프로모션 지원</p>
        </div>
        <div className="flex flex-row space-x-2 text-sm">
          <Icon className="size-5">{cartIcon}</Icon>
          <p>효율적인 재고 및 주문 관리</p>
        </div>
        <div className="flex flex-row space-x-2 text-sm">
          <Icon className="size-5">{wishIcon}</Icon>
          <p>친절한 고객 지원</p>
        </div>
      </div>
    </div>
  );
};

export default BizPromo;
