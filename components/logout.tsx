import { createClient } from "@/lib/supabase/server";
import { LogOutIcon } from "lucide-react";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { Button } from "./ui/button";
import { userSession } from "@/actions/user-session";

export async function Logout() {
  const {
    data: { session },
  } = await userSession();

  if (!session) return null;

  const logout = async () => {
    "use server";
    const cookieStore = cookies();
    const supabase = await createClient(cookieStore);
    await supabase.auth.signOut();
    redirect("/login");
  };
  return (
    <form action={logout}>
      <Button type="submit" className="w-9 px-0" variant="ghost">
        <LogOutIcon className="w-4 h-4" />
      </Button>
    </form>
  );
}
