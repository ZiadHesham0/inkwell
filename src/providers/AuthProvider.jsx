import { signIn, signOut, signUp } from "@/features/auth/services/auth.service";
import { supabase } from "@/lib/supabase";
import React, { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext(null);

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [userLoading, setUserLoading] = useState(true);


  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === "SIGNED_IN" || event === "SIGNED_UP" || event === "TOKEN_REFRESHED") {
        const { data: profile } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", session.user.id)
          .single();

        setUser({ ...session.user, ...(profile ?? {}) });
      } else {
        setUser(null);
      }
      setUserLoading(false);
    });
    return () => subscription.unsubscribe();
  }, []);


  return (
    <AuthContext.Provider value={{ user, userLoading , signIn , signUp , signOut }}>
      {children}
    </AuthContext.Provider> 
  );
}

export default AuthProvider;

