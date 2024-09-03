import { useBrandProductById, useUpdateProduct } from "@/api/productApi";
import { Icon } from "@/components/Icon";
import { ProductForm } from "@/components/Product/ProductForm";
import { Card } from "@/components/ui/card";
import { chevronRightIcon } from "@/shared/icons";
import { UpdateProductRequest } from "@/types/product.types";
import { Link, NavLink, useParams } from "react-router-dom";

function DashProductEdit() {
  const { id: productId } = useParams<{ id: string }>();

  const { brandProductData } = useBrandProductById(productId as string);
  const { mutateUpdateProduct } = useUpdateProduct();

  const handleUpdateProduct = (updatedDate: UpdateProductRequest) => {
    mutateUpdateProduct(updatedDate);
  };

  return (
    <div className="flex flex-col h-full w-full gap-5">
      <section
        aria-label="섹션 링크"
        className="flex items-center space-x-2 text-sm text-muted-foreground"
      >
        <Link to="/dashboard/product" className="hover:underline">
          상품 관리
        </Link>
        <Icon className="size-4">{chevronRightIcon}</Icon>
        <NavLink
          to={`/dashboard/product/${productId}/edit`}
          className={({ isActive }) =>
            `hover:underline transition duration-200 ease-in-out ${
              isActive ? "font-semibold underline" : ""
            }`
          }
        >
          상품 수정
        </NavLink>
      </section>
      <section className="flex h-full">
        <Card>
          <ProductForm
            productData={brandProductData}
            onUpdateData={handleUpdateProduct}
          />
        </Card>
      </section>
    </div>
  );
}

export default DashProductEdit;
