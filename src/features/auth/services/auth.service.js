import { supabase } from "@/lib/supabase";

export const signIn = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error(error.message || "Sign in failed");
  }

  return data;
};

// export const signUp = async (email, password, username, avatar_url) => {
//   const { data, error } = await supabase.auth.signUp({
//     email,
//     password,
//   });

//   if (error) {
//     throw new Error(error.message || "Sign up failed");
//   }

//   if (data.user) {
//     const profileResponse = await fetch(
//       `${supabase.supabaseUrl}/rest/v1/profiles`,
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           apikey: supabase.supabaseKey,
//           Authorization: `Bearer ${data.session?.access_token || supabase.supabaseKey}`,
//         },
//         body: JSON.stringify({
//           id: data.user.id,
//           username,
//           avatar_url,
//         }),
//       },
//     );

//     if (!profileResponse.ok) {
//       const profileError = await profileResponse.json();
//       throw new Error(profileError.message || "Profile creation failed");
//     }
//   }

//   return data;
// };

// export const signUp = async (email, password, username, avatar_url) => {
//   const { data, error } = await supabase.auth.signUp({ email, password });
//   if (error) throw error;

//   if (data.user) {
//     const { error: profileError } = await supabase.from("profiles").insert({
//       id: data.user.id,
//       username,
//       avatar_url,
//     });
//     if (profileError) {
//       await supabase.auth.signOut();
//       throw profileError;
//     }
//   }
//   return data;
// };

export const signUp = async (email, password, username, avatar_url) => {
  const { data, error } = await supabase.auth.signUp({ email, password });
  if (error) throw error;

  console.log("data.user:", data.user);
  console.log("data.session:", data.session);

  console.log("auth user created:", data.user);

  if (data.user) {
    const { error: profileError } = await supabase.from("profiles").insert({
      id: data.user.id,
      username,
      avatar_url,
    });
    console.log("profile insert error:", profileError);
    if (profileError) {
      await supabase.auth.signOut();
      throw profileError;
    }
  }
  return data;
};
export const signOut = async () => {
  try {
    // Use the Supabase client's built-in signOut which handles session cleanup properly
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  } catch (err) {
    console.error("SignOut error:", err);
    throw err;
  }
};

// export const getCurrentUser = async () => {
//   const { data, error } = await supabase.auth.getUser();
//   if (error) throw error;
//   return data.user;
// };
