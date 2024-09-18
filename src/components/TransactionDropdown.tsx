import { Icon } from "@/components/Icon";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Toggle } from "@/components/ui/toggle";
import { ellipsisIcon } from "@/shared/icons";
// import { useNavigate } from "react-router-dom";

// interface DropdownProps {
//   productId: string;
// }
// { productId }: DropdownProps
const TransactionDropdown = () => {
  // const navigate = useNavigate();

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
            // disabled={}
            onClick={() => console.log("주문 상세 보기")}
          >
            주문 상세 보기
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default TransactionDropdown;
