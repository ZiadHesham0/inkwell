import { supabase } from "@/lib/supabase";

// export default async function getAllPosts() {
//   try {
//     const response = await fetch(
//       `${supabase.supabaseUrl}/rest/v1/posts?select=*,profiles(username,avatar_url),post_categories(categories(name))`,
//       {
//         headers: {
//           apikey: supabase.supabaseKey,
//           Authorization: `Bearer ${supabase.supabaseKey}`,
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     if (!response.ok) {
//       const errorText = await response.text();
//       throw new Error(`HTTP ${response.status}: ${errorText}`);
//     }

//     const data = await response.json();
//     return data;
//   } catch (err) {
//     console.error("Error fetching posts:", err);
//     throw err;
//   }
// }

export default async function getAllPosts() {
  const { data, error } = await supabase.from("posts").select(`
      *,
      profiles (username, avatar_url),
      post_categories (categories (name))
    `);
  if (error) throw error;
  return data;
}
export const createPost = async (newPost) => {
  const { data, error } = await supabase.from("posts").insert(newPost);
  if (error) throw error;
  console.log(data);
  return data;
};
export const deletePost = async (id) => {
  const { data, error } = await supabase.from("posts").delete().eq("id", id);
  if (error) throw error;
  return data;
};

export const editPost = async (id, newData) => {
  const { data, error } = await supabase
    .from("posts")
    .update(newData)
    .eq("id", id);
  if (error) throw error;
  console.log(data);

  return data;
};

export const getPost = async (id) => {
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("id", id)
    .single();
  if (error) throw error;
  console.log(data);
  return data;
};
