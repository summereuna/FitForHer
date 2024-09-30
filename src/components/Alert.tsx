import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

type Variant =
  | "default"
  | "destructive"
  | "outline"
  | "secondary"
  | "ghost"
  | "link"
  | null
  | undefined;

interface AlertProps {
  type?: "button" | "submit" | "reset" | undefined;
  variant?: Variant;
  buttonChildren: string;
  title: string;
  description: string;
  noButton: string;
  yesButton: string;
  onClick: () => void;
  isPending?: boolean;
}

function Alert({
  type = "button",
  variant = "default",
  buttonChildren,
  title,
  description,
  noButton,
  yesButton,
  onClick,
  isPending,
}: AlertProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button type={type} variant={variant}>
          {buttonChildren}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{noButton}</AlertDialogCancel>
          <AlertDialogAction disabled={isPending} onClick={onClick}>
            {yesButton}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default Alert;
