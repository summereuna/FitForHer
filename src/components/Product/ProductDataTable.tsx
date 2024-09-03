import {
  Table,
  TableBody,
  //   TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { sortSizes } from "@/lib/utils";
import Dropdown from "@/components/Dropdown";
import { BrandProductsWithRelations } from "@/api/productApi";

interface ProductDataTableProps {
  brandProductsData: BrandProductsWithRelations;
}

const ProductDataTable = ({ brandProductsData }: ProductDataTableProps) => {
  return (
    <section>
      <Table>
        {/* <TableCaption>상품 관리 페이지입니다.</TableCaption> */}
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">카테고리</TableHead>
            <TableHead>상품 사진</TableHead>
            <TableHead>상품명</TableHead>
            <TableHead>상품 설명</TableHead>
            <TableHead>컬러</TableHead>
            <TableHead>사이즈/재고수량</TableHead>
            <TableHead>가격</TableHead>
            <TableHead className="text-right"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {brandProductsData.map((product) => (
            <TableRow key={product.id}>
              <TableCell className="font-medium">
                <p>{product.sub_categories?.categories?.name}</p>
                <p>{product.sub_categories?.name}</p>
              </TableCell>
              <TableCell>
                <div>
                  <img
                    alt="상품 대표 이미지"
                    src={
                      product.product_images.find(
                        (img: { image_url: string }) =>
                          img.image_url.includes("product_img_0")
                      )?.image_url
                    }
                    className="size-20 object-cover"
                  />
                </div>
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
