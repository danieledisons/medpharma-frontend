"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("token");
    }
    return null;
  });

  const saveToken = (newToken) => {
    console.log("Saving token:", newToken); // Log the token being saved
    setToken(newToken);
    localStorage.setItem("token", newToken);
  };

  const clearToken = () => {
    console.log("Clearing token"); // Log when the token is cleared
    setToken(null);
    localStorage.removeItem("token");
  };

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      console.log("Retrieved token from local storage:", savedToken); // Log the retrieved token
      setToken(savedToken);
    }
  }, []);

  const value = {
    token,
    saveToken,
    clearToken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
