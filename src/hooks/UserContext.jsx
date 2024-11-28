import React, { createContext, useContext, useState, useEffect } from "react";

// Create UserContext
const UserContext = createContext();

// Hook to use the UserContext in any component
export const useUser = () => useContext(UserContext);

// Provider component to wrap your app and provide the username and login state globally
export const UserProvider = ({ children }) => {
  const [username, setUsername] = useState(() =>
    localStorage.getItem("username")
  );
  const [isLoggedIn, setIsLoggedIn] = useState(
    () => !!localStorage.getItem("username")
  );

  useEffect(() => {
    if (isLoggedIn) {
      localStorage.setItem("username", username); // Store username
    } else {
      localStorage.removeItem("username"); // Clear username
    }
  }, [isLoggedIn, username]);

  const logout = () => {
    setUsername(null);
    setIsLoggedIn(false);
    localStorage.removeItem("username");
  };

  return (
    <UserContext.Provider
      value={{ username, setUsername, isLoggedIn, setIsLoggedIn, logout }}
    >
      {children}
    </UserContext.Provider>
  );
};
