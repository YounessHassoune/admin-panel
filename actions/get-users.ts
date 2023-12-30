"use server";

import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";

export async function getUsers() {
  const cookieStore = cookies();
  const supabase = await createClient(cookieStore);
  const result = await supabase.from("profile").select("*");
  return result;
}
