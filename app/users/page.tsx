import { DataTable } from "@/components/data-table";
import { columns } from "./components/columns";
import { User } from "./data/schema";
import { userSession } from "@/actions/user-session";
import { getUsers } from "@/actions/get-users";

import { redirect } from "next/navigation";

export default async function Users() {
  const {
    data: { session },
  } = await userSession();
  if (!session) {
    redirect("/login");
  }

  const { data }: { data: User[] | null } = await getUsers();

  return (
    <div className="flex-1 w-full space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Users</h2>
      </div>
      <DataTable
        data={data || []}
        columns={columns}
        filterColumn="email"
        newHref="/users/new"
      />
    </div>
  );
}
