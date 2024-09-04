import { Icon } from "@/components/Icon";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { infoIcon } from "@/shared/icons";

interface PopoverInfoProps {
  title: string;
  description: string;
}

export function PopoverInfo({ title, description }: PopoverInfoProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button>
          <Icon className="size-4">{infoIcon}</Icon>
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">{title}</h4>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
