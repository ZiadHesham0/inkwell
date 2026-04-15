import { supabase } from "@/lib/supabase";
export default async function getAllPosts() {
  const { data, error } = await supabase.from("posts").select(`
    *,
    profiles (
      username,
      avatar_url
    ),post_categories (
      categories (
        name
      )
    )
  `);
  if (error) throw error;
  console.log(data);
  console.log("supabase",supabase);
  
  return data;
}
