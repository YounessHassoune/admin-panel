import { DataTable } from "@/components/data-table";
import { columns } from "./components/columns";
import { User } from "./data/schema";
import { userSession } from "@/actions/user-session";
import { redirect } from "next/navigation";

export default async function Users() {
  const {
    data: { session },
  } = await userSession();
  if (!session) {
    redirect("/login");
  }
  const users: User[] = [
    {
      id: "1",
      email: "user1@example.com",
      role: "Admin",
      lastSignIn: new Date("2023-12-25"), // Replace with actual dates
    },
    {
      id: "2",
      email: "user2@example.com",
      role: "SuperAdmin",
      lastSignIn: new Date("2023-12-26"), // Replace with actual dates
    },
    {
      id: "3",
      email: "user3@example.com",
      role: "Admin",
      lastSignIn: new Date("2023-12-27"), // Replace with actual dates
    },
    {
      id: "4",
      email: "user4@example.com",
      role: "SuperAdmin",
      lastSignIn: new Date("2023-12-28"), // Replace with actual dates
    },
    {
      id: "5",
      email: "user5@example.com",
      role: "Admin",
      lastSignIn: new Date("2023-12-29"), // Replace with actual dates
    },
  ];
  return (
    <div className="flex-1 w-full space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Users</h2>
      </div>
      <DataTable
        data={users}
        columns={columns}
        filterColumn="email"
        newHref="/users/new"
      />
    </div>
  );
}
