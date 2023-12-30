"use server";

import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";

export async function getUsers() {
  const cookieStore = cookies();
  const supabase = await createClient(cookieStore);
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const isAdmin = session?.user?.user_metadata?.role === "Admin";
  console.log({isAdmin});
  if (isAdmin) {
    const result = await supabase
      .from("profile")
      .select("*")
      .eq("role", "Admin");
    return result;
  } else {
    const result = await supabase.from("profile").select("*");
    return result;
  }
}
