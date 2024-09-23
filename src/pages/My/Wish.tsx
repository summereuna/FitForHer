import MetaTag from "@/components/MetaTag";

function Wish() {
  return (
    <div>
      Wish
      <MetaTag
        title={`위시리스트`}
        description="원하는 상품을 모아둔 목록입니다. 나중에 구매할 아이템을 쉽게 관리하세요."
      />
    </div>
  );
}

export default Wish;
