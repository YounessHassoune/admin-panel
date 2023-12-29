"use server";
import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";

export async function userSession() {
  const cookieStore = cookies();
  const supabase = await createClient(cookieStore);
  return supabase.auth.getSession();
}
