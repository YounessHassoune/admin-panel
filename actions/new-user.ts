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
  console.log({ password });
  const result = await supabase.auth.signUp({
    email: data.email,
    password,
    options: {
      data: {
        role: data.role,
      },
    },
  });
  revalidatePath("/users");
  // !!if user is created mail this to the user
  return result;
}
