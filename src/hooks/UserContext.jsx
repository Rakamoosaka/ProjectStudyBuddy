import React, { createContext, useContext, useState } from "react";

// Create UserContext
const UserContext = createContext();

// Hook to use the UserContext in any component
export const useUser = () => useContext(UserContext);

// Provider component to wrap your app and provide the username and login state globally
export const UserProvider = ({ children }) => {
  const [username, setUsername] = useState(null); // Holds the username globally
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Tracks if the user is logged in

  const logout = () => {
    setUsername(null);
    setIsLoggedIn(false);
  };

  return (
    <UserContext.Provider
      value={{ username, setUsername, isLoggedIn, setIsLoggedIn, logout }}
    >
      {children}
    </UserContext.Provider>
  );
};
