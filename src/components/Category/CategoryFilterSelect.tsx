import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CategoryFilterSelectProps {
  onChangeSortFilter: (sortBy: "newest" | "low-price" | "high-price") => void;
}

function CategoryFilterSelect({
  onChangeSortFilter,
}: CategoryFilterSelectProps) {
  return (
    <Select onValueChange={onChangeSortFilter}>
      <SelectTrigger className="w-32">
        <SelectValue placeholder="정렬기준" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="newest">최신순</SelectItem>
          <SelectItem value="low-price">낮은 가격순</SelectItem>
          <SelectItem value="high-price">높은 가격순</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

export default CategoryFilterSelect;
