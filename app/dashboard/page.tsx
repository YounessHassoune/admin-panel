import { userSession } from "@/actions/user-session";
import { getUsersOverview } from "@/actions/users-overview";
import { redirect } from "next/navigation";
import { Charts } from "./charts";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard Page",
};

export default async function Dashboard() {
  const {
    data: { session },
  } = await userSession();
  if (!session) {
    redirect("/login");
  }

  const usersOverview = await getUsersOverview();

  return (
    <div className="flex-1 w-full space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
      </div>
      <Charts usersOverview={usersOverview} />
    </div>
  );
}
