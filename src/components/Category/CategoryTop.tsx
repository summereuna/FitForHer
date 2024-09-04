import { Icon } from "@/components/Icon";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { categoryIcon } from "@/shared/icons";

export function CategoryTop() {
  return (
    <div className="grid grid-cols-2 gap-2">
      <Sheet>
        <SheetTrigger asChild>
          <button>
            <Icon className="size-6">{categoryIcon}</Icon>
          </button>
        </SheetTrigger>
        {/*  */}
        <SheetContent side={"top"}>
          <SheetHeader>
            <SheetTitle>전체 카테고리</SheetTitle>
            <SheetDescription>
              설명 설명 설명 설명 설명 설명 설명 설명 설명 설명 설명 설명
            </SheetDescription>
          </SheetHeader>
          <div>카테고리</div>
          <div>카테고리</div>
          <div>카테고리</div>
          <div>카테고리</div>
          <div>카테고리</div>
          <SheetFooter>
            <SheetClose asChild></SheetClose>
          </SheetFooter>
        </SheetContent>
        {/*  */}
      </Sheet>
    </div>
  );
}
