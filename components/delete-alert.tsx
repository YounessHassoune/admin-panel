"use client";
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
import { TrashIcon } from "lucide-react";
import { useToast } from "./ui/use-toast";
import useAdmin from "@/hooks/use-admin";
import { usePathname } from "next/navigation";

interface DeleteAlertProps {
  title: string;
  description: string;
  onDelete: () => void;
}

export function DeleteAlert({
  title,
  description,
  onDelete,
}: DeleteAlertProps) {
  const { toast } = useToast();
  const isAdmin = useAdmin();
  const pathname = usePathname();

  const ShowToast = () => {
    toast({
      variant: "destructive",
      title: "Uh oh! Something went wrong.",
      description: "You don't have the permission to delete this row",
    });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <TrashIcon />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={isAdmin && pathname === "/users" ? ShowToast : onDelete}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
