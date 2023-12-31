import { getBusinesses } from "@/actions/get-businesses";
import { userSession } from "@/actions/user-session";
import { DataTable } from "@/components/data-table";
import { redirect } from "next/navigation";
import { columns } from "./components/columns";

export default async function Business() {
  const {
    data: { session },
  } = await userSession();
  if (!session) {
    redirect("/login");
  }
  const businesses = await getBusinesses();

  return (
    <div className="flex-1 w-full space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Businesses</h2>
      </div>
      <DataTable data={businesses} columns={columns} name="businesses" />
    </div>
  );
}
