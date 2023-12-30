"use server";

import { Count } from "@/constants";
import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";

export async function getUsersOverview() {
  const cookieStore = cookies();
  const supabase = await createClient(cookieStore);
  const {
    data: { users },
  } = await supabase.auth.admin.listUsers();
  //get user session
  const {
    data: { session },
  } = await supabase.auth.getSession();
  //check user role to filter users
  const role = session?.user?.user_metadata?.user_role;
  // filter user depending on the role
  const userCounts = users.reduce(
    (count, user) => {
      if (user.user_metadata?.user_role === "Admin") {
        count.admins += 1;
      } else {
        count.superAdmins += 1;
      }
      return count;
    },
    { admins: 0, superAdmins: 0 }
  );
  const data = [
    { name: "Admin", value: userCounts.admins },
    { name: "SuperAdmin", value: userCounts.superAdmins },
  ] as Count[];
  return data;
}
