import { Icon } from "@/components/Icon";
import { ProductForm } from "@/components/Product/ProductForm";
import { Card } from "@/components/ui/card";
import { chevronRightIcon } from "@/shared/icons";
import { Link, NavLink } from "react-router-dom";

function DashProductUpload() {
  return (
    <div className="flex flex-col h-full w-full gap-5">
      <section
        aria-label="섹션 링크"
        className="flex items-center space-x-2 text-sm text-muted-foreground"
      >
        <Link
          aria-label="상품 관리 페이지로 이동"
          to="/dashboard/product"
          className="hover:underline"
        >
          상품 관리
        </Link>
        <Icon className="size-4">{chevronRightIcon}</Icon>
        <NavLink
          aria-label="상품 등록 버튼"
          to="/dashboard/product/upload"
          className={({ isActive }) =>
            `hover:underline transition duration-200 ease-in-out ${
              isActive ? "font-semibold underline" : ""
            }`
          }
        >
          상품 등록
        </NavLink>
      </section>
      <section className="flex h-full">
        <Card>
          <ProductForm />
        </Card>
      </section>
    </div>
  );
}

export default DashProductUpload;
