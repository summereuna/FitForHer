import { PopoverInfo } from "@/components/PopoverInfo";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface CountCardProps {
  title: string;
  description: string;
  amount: number;
}

function CountCard({ title, description, amount }: CountCardProps) {
  return (
    <Card aria-label={title} className="w-full">
      <CardHeader>
        <CardDescription className="flex space-x-1">
          <span className="text-black font-medium">{title}</span>
          <PopoverInfo title={title} description={description} />
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <CardTitle>
          {title === "총 수입" ? "₩ " : "+ "}
          {amount.toLocaleString()}
        </CardTitle>
        {/* <CardDescription className="text-xs">{"+20.1% 증가"}</CardDescription> */}
      </CardContent>
    </Card>
  );
}

export default CountCard;
