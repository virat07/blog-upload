"use client";
import React, { useState, useEffect, useContext, createContext } from "react";
import { onAuthStateChanged, getAuth, signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import firebase_app from "@/firebaseconfig";

const auth = getAuth(firebase_app);

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const logout = async () => {
    await signOut(auth);
  };

  return (
    <AuthContext.Provider value={{ user, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
