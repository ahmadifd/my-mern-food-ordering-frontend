import { useAppSelector } from "../app/store";
import { selectCurrentToken } from "../features/auth/authSlice";
import { jwtDecode } from "jwt-decode";
import { UserAuthInfo } from "./UserAuthInfo.types";

const useAuth = () => {
  const token = useAppSelector(selectCurrentToken);
  let isAdmin = false;
  let isRestaurantOwner = false;
  let isUser = false;
  let isAuthenticated = false;

  if (token) {
    const decode = jwtDecode(token);
    const { email, roles } = decode as UserAuthInfo;
    isAdmin = roles.includes("Admin");
    isRestaurantOwner = roles.includes("RestaurantOwner");
    isUser = roles.includes("User");

    isAuthenticated = isAdmin || isRestaurantOwner || isUser;

    return {
      email,
      roles,
      isAdmin,
      isRestaurantOwner,
      isUser,
      isAuthenticated,
    };
  }

  return {
    email: "",
    roles: [],
    isAdmin,
    isRestaurantOwner,
    isUser,
    isAuthenticated,
  };
};

export default useAuth;
