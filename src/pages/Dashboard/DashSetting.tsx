import { useBrand } from "@/api/brandApi";
import BrandForm from "@/components/BrandForm";
import { CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/hooks/useAuth";
import MetaTag from "@/components/MetaTag";

function DashSetting() {
  const { session } = useAuth();
  const { brandData } = useBrand(session?.user.id as string);
  return (
    <div>
      <MetaTag
        title="브랜드 정보"
        description="브랜드 정보 설정 페이지입니다."
      />
      <section aria-label="브랜드 정보" className="space-y-5">
        {!brandData && (
          <>
            <CardTitle>브랜드 등록</CardTitle>
            <p className="text-sm text-muted-foreground">
              먼저 브랜드 이름을 입력하여 브랜드를 등록하세요.
              <br />이 단계는 브랜드를 등록하는 첫 번째 단계입니다.
              <br />
              브랜드 이름을 입력하면, 브랜드가 등록되고 다음 단계로 넘어갈 수
              있습니다.
            </p>
          </>
        )}
        {brandData && (
          <>
            <CardTitle>브랜드 정보</CardTitle>
            <p className="text-sm text-muted-foreground">
              판매 페이지에서 보여질 브랜드 정보를 설정하세요.
            </p>
          </>
        )}
        <Separator />
        <div className="max-w-md">
          <BrandForm brandData={brandData} />
        </div>
      </section>
    </div>
  );
}

export default DashSetting;
