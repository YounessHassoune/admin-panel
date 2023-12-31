"use server";

import { Business } from "@/app/business/data/schema";
import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";

export async function getBusinesses() {
  const cookieStore = cookies();
  const supabase = await createClient(cookieStore);
  const result = await supabase.from("business").select("*");
  return result.data as Business[];
}
