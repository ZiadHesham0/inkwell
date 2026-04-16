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
export const createPost = async (newPost, categoryIds = []) => {
  const { data, error } = await supabase.from("posts").insert(newPost);
  if (error) throw error;
  console.log(data);

  if (categoryIds.length > 0) {
    const { catError } = await supabase
      .from("post_categories")
      .insert(
        categoryIds.map((catId) => ({ post_id: id, category_id: catId })),
      );
    if (catError) throw catError;
  }

  return data;
};
export const deletePost = async (id) => {
  const { data, error } = await supabase.from("posts").delete().eq("id", id);
  if (error) throw error;
  return data;
};

export const editPost = async (id, newData, categoryIds = []) => {
  const { data, error } = await supabase
    .from("posts")
    .update(newData)
    .eq("id", id);
  if (error) throw error;
  console.log(data);

  await supabase.from("post_categories").delete().eq("post_id", id);
  if (categoryIds.length > 0) {
    const { catError } = await supabase
      .from("post_categories")
      .insert(
        categoryIds.map((catId) => ({ post_id: id, category_id: catId })),
      );
    if (catError) throw catError;
  }

  return data;
};

export const getPost = async (id) => {
  const { data, error } = await supabase
    .from("posts")
    .select("*  , post_categories(*)")
    .eq("id", id)
    .single();
  if (error) throw error;
  console.log(data);
  return data;
};

export const getAllCategories = async () => {
  const { data, error } = await supabase.from("categories").select("*");
  if (error) throw error;
  return data;
};
