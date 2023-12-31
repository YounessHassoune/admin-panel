import { Separator } from "@/components/ui/separator";
import { NewBusinessForm } from "./new-business";
import { redirect } from "next/navigation";
import { userSession } from "@/actions/user-session";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "New Business",
};

export default async function NewBusiness() {
  const {
    data: { session },
  } = await userSession();
  if (!session) {
    redirect("/login");
  }
  return (
    <div className="flex flex-col justify-center gap-3 m-auto">
      <div className="flex flex-col justify-center items-center">
        <h3 className="text-lg font-medium">Create New Business</h3>
        <p className="text-sm text-muted-foreground text-center">
          You can create new businesses.
        </p>
      </div>
      <Separator />
      <NewBusinessForm />
    </div>
  );
}
