import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import MainNavLinks from "./MainNavLinks";

const MainNav = () => {
  const { isAuthenticated } = useAuth();

  return (
    <>{isAuthenticated ? <MainNavLinks /> : <Link to="/login"> Login</Link>}</>
  );
};

export default MainNav;
