import { userSession } from "@/actions/user-session";
import { redirect } from "next/navigation";

export default async function Business() {
  const {
    data: { session },
  } = await userSession();
  if (!session) {
    redirect("/login");
  }
  return <h1>Business</h1>;
}
