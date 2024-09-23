import { useBrandProducts } from "@/api/productApi";
import ItemNotFound from "@/components/ItemNotFound";
import ProductDataTable from "@/components/Product/ProductDataTable";
import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";

function DashProduct() {
  const navigate = useNavigate();
  const { authId } = useAuth();
  const { brandProductsData, isPending, isSuccess } = useBrandProducts(
    authId as string
  );

  if (isPending) return null;

  return (
    <div className="flex flex-col h-full w-full gap-5">
      <section className="flex justify-between items-center">
        <CardTitle>상품관리</CardTitle>
        <Button
          aria-label="상품 등록 페이지로 이동"
          variant="outline"
          onClick={() => {
            navigate("/dashboard/product/upload");
          }}
        >
          상품 등록하기
        </Button>
      </section>
      <section className="flex h-full">
        <Card className="w-full">
          {brandProductsData?.length === 0 && (
            <ItemNotFound
              description={`등록된 상품이 없습니다.\n상품을 등록하세요.`}
            />
          )}
          {isSuccess && brandProductsData && brandProductsData.length > 0 && (
            <ProductDataTable brandProductsData={brandProductsData} />
          )}
        </Card>
      </section>
    </div>
  );
}

export default DashProduct;
