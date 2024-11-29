import React, { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

// Create the context
const UserContext = createContext();

// Hook to use the UserContext in components
export const useUser = () => useContext(UserContext);

// Helper function to validate the token
const isTokenValid = (token) => {
  try {
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000; // Current time in seconds
    return decodedToken.exp > currentTime; // Check if token is not expired
  } catch (error) {
    console.error("Invalid token:", error);
    return false;
  }
};

// Provider component to wrap the app
export const UserProvider = ({ children }) => {
  const [username, setUsername] = useState(() =>
    localStorage.getItem("username")
  );
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const token = localStorage.getItem("jwt");
    return !!token && isTokenValid(token); // Check if token is valid
  });

  useEffect(() => {
    if (isLoggedIn) {
      localStorage.setItem("username", username);
    } else {
      localStorage.removeItem("username");
      localStorage.removeItem("jwt");
    }
  }, [isLoggedIn, username]);

  const login = (token, username) => {
    if (isTokenValid(token)) {
      localStorage.setItem("jwt", token);
      setUsername(username);
      setIsLoggedIn(true);
    } else {
      console.error("Attempted login with invalid or expired token.");
    }
  };

  const logout = () => {
    setUsername(null);
    setIsLoggedIn(false);
    localStorage.removeItem("jwt");
    localStorage.removeItem("username");
  };

  return (
    <UserContext.Provider
      value={{
        username,
        isLoggedIn,
        login,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
