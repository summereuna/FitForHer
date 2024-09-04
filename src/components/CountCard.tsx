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
          <span>{title}</span>
          <PopoverInfo title={title} description={description} />
        </CardDescription>
      </CardHeader>
      <CardContent>
        <CardTitle>{amount.toLocaleString()}</CardTitle>
      </CardContent>
    </Card>
  );
}

export default CountCard;
