import {
  Table,
  TableBody,
  //   TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  cn,
  getKoreanCategoryName,
  getOnlyRepresentativePhoto,
  sortSizes,
} from "@/lib/utils";
import Dropdown from "@/components/Dropdown";
import { BrandProductsWithRelations } from "@/api/productApi";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";

interface ProductDataTableProps {
  brandProductsData: BrandProductsWithRelations;
}

const ProductDataTable = ({ brandProductsData }: ProductDataTableProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const handleImageLoad = () => {
    setImageLoaded(true);
  };
  return (
    <section>
      <Table>
        {/* <TableCaption>상품 관리 페이지입니다.</TableCaption> */}
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">카테고리</TableHead>
            <TableHead>상품 사진</TableHead>
            <TableHead className="w-[200px]">상품명</TableHead>
            <TableHead className="w-[350px]">상품 설명</TableHead>
            <TableHead>컬러</TableHead>
            <TableHead>사이즈/재고수량</TableHead>
            <TableHead>가격</TableHead>
            <TableHead className="text-right"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {brandProductsData.map((product) => (
            <TableRow
              key={product.id}
              className={cn(
                !product.is_active
                  ? "pointer-events-none opacity-30 bg-gray-50 cursor-not-allowed select-none"
                  : ""
              )}
            >
              <TableCell className="font-medium">
                <p>
                  {getKoreanCategoryName(
                    product.sub_categories?.categories?.name as string
                  )}
                </p>
                <p>
                  {getKoreanCategoryName(
                    product.sub_categories?.name as string
                  )}
                </p>
              </TableCell>
              <TableCell>
                <Avatar className="size-20 rounded-none border-[1px] bg-white">
                  {product.product_images && (
                    <AvatarImage
                      src={getOnlyRepresentativePhoto(product.product_images)}
                      alt="상품 대표 사진"
                      className="object-cover"
                      onLoad={handleImageLoad}
                    />
                  )}
                  {!imageLoaded && (
                    <AvatarFallback className="rounded-none">
                      <Avatar className="size-20 rounded-none bg-white-200 border-[1px]" />
                      <Skeleton className="size-20 rounded-none" />
                    </AvatarFallback>
                  )}
                </Avatar>
              </TableCell>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.description}</TableCell>
              <TableCell>{product.color}</TableCell>
              <TableCell>
                <div className="flex flex-col text-xs">
                  {sortSizes(product.product_sizes).map(
                    (
                      size: { size: string; stock_quantity: number },
                      index: number
                    ) => (
                      <div
                        key={index}
                        className="flex flex-row justify-between w-20"
                      >
                        <div>{size.size}</div>
                        <div>{size.stock_quantity} 개</div>
                      </div>
                    )
                  )}
                </div>
              </TableCell>
              <TableCell>{product.price.toLocaleString()} 원</TableCell>
              <TableCell className="text-right">
                <Dropdown productId={product.id} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  );
};

export default ProductDataTable;
