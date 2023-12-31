"use server";

import { RoleType } from "@/constants";
import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import { generate } from "generate-password";
import { revalidatePath } from "next/cache";
import { Resend } from "resend";

export async function createNewUser(data: { email: string; role: RoleType }) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const cookieStore = cookies();
  const supabase = await createClient(cookieStore);
  //generate password for the user
  const password = generate({
    length: 6,
    numbers: true,
    symbols: true,
  });
  // create the user
  const result = await supabase.auth.admin.createUser({
    email: data.email,
    password,
    user_metadata: { user_role: data.role },
    email_confirm: true,
  });
  // send the password via email
  if (result.data) {
    try {
      const result = await resend.emails.send({
        from: "Admin Panel <admin.panel@younesshassoune.com>",
        to: [data.email],
        subject: "Login Password ",
        html: `
        <p>Hello,</p>
        <p>Here are your login details:</p>
        <p>Email: ${data.email}</p>
        <p>Password: ${password}</p>
        <p>Login here: <a href="${process.env.NEXT_PUBLIC_VERCEL_URL}/login">Login Link</a></p>
        <p>Thank you!</p>
      `,
      });
    } catch (error) {
      console.log(error);
    }
  }
  revalidatePath("/users");
  // !!if user is created mail this to the user
  return result;
}
