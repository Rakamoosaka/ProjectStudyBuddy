import { useContext } from "react";
import { AuthContext } from "./AuthProvider"; // Named import

const useAuth = () => {
  return useContext(AuthContext);
};

export default useAuth;
