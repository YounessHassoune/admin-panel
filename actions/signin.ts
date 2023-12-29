"use server";

import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";

export async function signInWihEmailAndPassword(data: {
  email: string;
  password: string;
}) {
  const cookieStore = cookies();
  const supabase = await createClient(cookieStore);
  const result = await supabase.auth.signInWithPassword({
    email: data.email,
    password: data.password,
  });
  return result;
}
