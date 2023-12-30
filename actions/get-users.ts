"use server";

import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";

export async function getUsers() {
  const cookieStore = cookies();
  const supabase = await createClient(cookieStore);
  const {
    data: { users },
  } = await supabase.auth.admin.listUsers();

  const transformedUsers = users.map((user) => ({
    id: user.id,
    email: user.email!,
    role: user.user_metadata?.user_role ?? "SuperAdmin",
    lastSignIn: user.last_sign_in_at ? new Date(user.last_sign_in_at) : null,
  }));
  return transformedUsers;
}
