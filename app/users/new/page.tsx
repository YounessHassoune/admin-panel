import { Separator } from "@/components/ui/separator";
import { NewUserForm } from "./new-user-form";
import { userSession } from "@/actions/user-session";
import { redirect } from "next/navigation";

export default async function NewUser() {
  const {
    data: { session },
  } = await userSession();
  if (!session) {
    redirect("/login");
  }
  return (
    <div className="flex flex-col justify-center gap-3 m-auto">
      <div>
        <h3 className="text-lg font-medium">Create New User</h3>
        <p className="text-sm text-muted-foreground">
          You can create admins and super admin accounts.
        </p>
      </div>
      <Separator />
      <NewUserForm />
    </div>
  );
}
