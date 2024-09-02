import { Icon } from "@/components/Icon";
import { infoIcon } from "@/shared/icons";

interface ItemNotFoundProps {
  description: string;
}
function ItemNotFound({ description }: ItemNotFoundProps) {
  return (
    <div className="flex flex-col justify-center items-center space-y-5 h-full">
      <Icon className="size-16">{infoIcon}</Icon>
      <p className="text-sm whitespace-pre-line text-center">{description}</p>
    </div>
  );
}

export default ItemNotFound;
