import { useRelatedProductDetail } from "@/api/customerProductApi";
import ProductItem from "@/components/ProductItem";
import { useNavigate, useParams } from "react-router-dom";

interface RelatedProductsProps {
  subCategoryName: string;
}

const RelatedProducts = ({ subCategoryName }: RelatedProductsProps) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data } = useRelatedProductDetail(subCategoryName, id as string);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {data &&
        data.map((item) => (
          <div
            aria-label="카테고리별 상품"
            key={item.id}
            className="flex flex-col w-full p-0 md:p-3 lg:p-0"
            onClick={() => {
              navigate(`/product/${item.id}`);
            }}
          >
            <ProductItem item={item} />
          </div>
        ))}
    </div>
  );
};

export default RelatedProducts;
