import { supabase } from "@/lib/supabase";

export const signIn = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });  
  if (error) throw new Error(error);
  console.log(data);
  return data;
};

export const signUp = async (email, password, username, avatar_url) => {
  const { data, error } = await supabase.auth.signUp({ email, password });
  if (error) throw error;

  if (data.user) {
    const { error: profileError } = await supabase.from("profiles").insert({
      id: data.user.id,
      username,
      avatar_url,
    });
    if (profileError) {
      await supabase.auth.signOut()
      throw profileError;
    }
  }
  return data;
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
};

// export const getCurrentUser = async () => {
//   const { data, error } = await supabase.auth.getUser();
//   if (error) throw error;
//   return data.user;
// };
