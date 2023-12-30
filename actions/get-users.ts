"use server";

import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";

export async function getUsers() {
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
  const transformedUsers = users
    .filter((user) =>
      role === "Admin" ? user.user_metadata?.user_role === "Admin" : true
    )
    .map((user) => ({
      id: user.id,
      email: user.email!,
      role: user.user_metadata?.user_role ?? "SuperAdmin",
      lastSignIn: user.last_sign_in_at ? new Date(user.last_sign_in_at) : null,
    }));
  return transformedUsers;
}
