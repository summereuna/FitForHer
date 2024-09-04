import { useChangeActiveProduct } from "@/api/productApi";
import { Icon } from "@/components/Icon";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Toggle } from "@/components/ui/toggle";
import { ellipsisIcon } from "@/shared/icons";
import { useNavigate } from "react-router-dom";

interface DropdownProps {
  productId: string;
}

function Dropdown({ productId }: DropdownProps) {
  const navigate = useNavigate();

  const { mutateChangeActiveProduct, isPendingChangeActiveProduct } =
    useChangeActiveProduct();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Toggle className="rounded-xl">
          <Icon className="size-4">{ellipsisIcon}</Icon>
        </Toggle>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-6">
        <DropdownMenuGroup>
          <DropdownMenuItem
            disabled={isPendingChangeActiveProduct}
            onClick={() => navigate(`/dashboard/product/${productId}/edit`)}
          >
            수정하기
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            disabled={isPendingChangeActiveProduct}
            onClick={() => mutateChangeActiveProduct(productId)}
          >
            삭제하기
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default Dropdown;
