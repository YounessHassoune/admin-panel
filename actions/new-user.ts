"use server";

import { RoleType } from "@/constants";
import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import { generate } from "generate-password";
import { revalidatePath } from "next/cache";

export async function createNewUser(data: { email: string; role: RoleType }) {
  const cookieStore = cookies();
  const supabase = await createClient(cookieStore);
  const password = generate({
    length: 6,
    numbers: true,
    symbols: true,
  });
  const result = await supabase.auth.admin.createUser({
    email: data.email,
    password,
    user_metadata: { user_role: data.role },
    email_confirm: true,
  });
  revalidatePath("/users");
  // !!if user is created mail this to the user
  return result;
}
