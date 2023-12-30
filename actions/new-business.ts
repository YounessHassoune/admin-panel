"use server";

import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import { generate } from "generate-password";
import { revalidatePath } from "next/cache";

export async function createNewBusiness(data: FormData) {
  const name = data.get("name") as string;
  const image = data.get("image") as File;
  const cookieStore = cookies();
  const bucket = "business_images";
  const supabase = await createClient(cookieStore);

  // upload image
  const { data: uploaded } = await supabase.storage
    .from(bucket)
    .upload(name, image, {
      upsert: false,
      contentType: image.type,
    });

  //get image path
  const {
    data: { publicUrl },
  } = supabase.storage.from(bucket).getPublicUrl(`${uploaded?.path}`);

  // create new business
  const result = await supabase
    .from("business")
    .insert({ name, image: publicUrl });

  //revalidate cache
  revalidatePath("/users");

  return result;
}
