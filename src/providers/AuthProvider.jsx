import { signIn, signOut, signUp } from "@/features/auth/services/auth.service";
import { supabase } from "@/lib/supabase";
import React, { createContext, useEffect, useState } from "react";

export const AuthContext = createContext(null);

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [userLoading, setUserLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (error) {
        console.error("Error getting session:", error);
        setUser(null);
        setUserLoading(false);
        return;
      }

      if (session?.user) {
        try {
          const response = await fetch(
            `${supabase.supabaseUrl}/rest/v1/profiles?id=eq.${session.user.id}`,
            {
              headers: {
                apikey: supabase.supabaseKey,
                Authorization: `Bearer ${session.access_token}`,
              },
            },
          );

          const profiles = await response.json();
          const profile = profiles.length > 0 ? profiles[0] : null;
          setUser({ ...session.user, ...(profile ?? {}) });
        } catch (err) {
          console.error("Error fetching profile:", err);
          setUser(session.user);
        }
      } else {
        setUser(null);
      }

      setUserLoading(false);
    };

    initAuth();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("Auth event:", event);
      if (event === "SIGNED_IN" || event === "SIGNED_UP") {
        if (!session?.user) {
          setUser(null);
          return;
        }

        try {
          const response = await fetch(
            `${supabase.supabaseUrl}/rest/v1/profiles?id=eq.${session.user.id}`,
            {
              headers: {
                apikey: supabase.supabaseKey,
                Authorization: `Bearer ${session.access_token}`,
              },
            },
          );

          const profiles = await response.json();
          const profile = profiles.length > 0 ? profiles[0] : null;
          setUser({ ...session.user, ...(profile ?? {}) });
        } catch (err) {
          console.error("Error fetching profile:", err);
          setUser(session.user);
        }
      } else if (event === "SIGNED_OUT") {
        setUser(null);
      }
    });

    return () => subscription?.unsubscribe();
  }, []);

  // useEffect(() => {
  //   const {
  //     data: { subscription },
  //   } = supabase.auth.onAuthStateChange(async (event, session) => {
      
  //     if (
  //       event === "SIGNED_IN" ||
  //       event === "SIGNED_UP" ||
  //       event === "TOKEN_REFRESHED"
  //     ) {
  //       const { data: profile } = await supabase
  //         .from("profiles")
  //         .select("*")
  //         .eq("id", session.user.id)
  //         .single();
  //       setUser({ ...session.user, ...(profile ?? {}) });
  //     } else {
  //       setUser(null);
  //     }
  //     setUserLoading(false);
  //   });
  //   return () => subscription.unsubscribe();
  // }, []);

  return (
    <AuthContext.Provider
      value={{ user, userLoading, signIn, signUp, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
