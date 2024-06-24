import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import MainNavLinks from "./MainNavLinks";

const MainNav = () => {
  const { isAuthenticated, email } = useAuth();

  return (
    <>
      {isAuthenticated ? (
        <MainNavLinks email={email} />
      ) : (
        <Link to="/login"> Login</Link>
      )}
    </>
  );
};

export default MainNav;
