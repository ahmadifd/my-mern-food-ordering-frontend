import { useAppSelector } from "../app/store";
import { selectCurrentToken } from "../features/auth/authSlice";
import { jwtDecode } from "jwt-decode";
import { UserAuthInfo } from "../types/UserAuthInfo.types";

const useAuth = () => {
  const token = useAppSelector(selectCurrentToken);
  let isAdmin = false;
  let isOwner = false;
  let isUser = false;
  let isAuthenticated = false;

  if (token) {
    const decode = jwtDecode(token);
    const { email, roles } = decode as UserAuthInfo;
    isAdmin = roles.includes("Admin");
    isOwner = roles.includes("Owner");
    isUser = roles.includes("User");

    isAuthenticated = isAdmin || isOwner || isUser;

    return {
      email,
      roles,
      isAdmin,
      isOwner,
      isUser,
      isAuthenticated,
    };
  }

  return {
    email: "",
    roles: [],
    isAdmin,
    isOwner,
    isUser,
    isAuthenticated,
  };
};

export default useAuth;
