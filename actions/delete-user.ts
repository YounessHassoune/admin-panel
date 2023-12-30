"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function deleteUser(id: string) {
  const cookieStore = cookies();
  const supabase = await createClient(cookieStore);
  const result = await supabase.from("profile").delete().match({ id });
  revalidatePath("/users");
  return result;
}
