import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext({}); // Named export

export const AuthProvider = ({ children }) => {
  // Initialize auth state from localStorage if available
  const [auth, setAuth] = useState(() => {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");
    const email = localStorage.getItem("email");
    return token ? { token, username, email } : {};
  });

  // Save the token, username, and email in localStorage when auth changes
  useEffect(() => {
    if (auth?.token) {
      localStorage.setItem("token", auth.token);
      if (auth.username) {
        localStorage.setItem("username", auth.username);
      }
      if (auth.email) {
        localStorage.setItem("email", auth.email);
      }
    }
  }, [auth]);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
