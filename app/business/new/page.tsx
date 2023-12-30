import { Separator } from "@/components/ui/separator";
import { NewBusinessForm } from "./new-business";

export default function NewBusiness() {
  return (
    <div className="flex flex-col justify-center gap-3 m-auto">
      <div>
        <h3 className="text-lg font-medium">Create New Business</h3>
        <p className="text-sm text-muted-foreground">
          You can create new businesses.
        </p>
      </div>
      <Separator />
      <NewBusinessForm />
    </div>
  );
}
