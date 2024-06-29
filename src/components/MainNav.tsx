import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import MainNavLinks from "./MainNavLinks";

const MainNav = () => {
  const { isAuthenticated, email, isOwner } = useAuth();
  //const [persist, setPersist] = useLocalStorage("persist", false);
  return (
    <>
      {isAuthenticated ? (
        <MainNavLinks email={email} isOwner={isOwner} />
      ) : (
        <Link to="/login">Login</Link>
      )}
    </>
  );
};

export default MainNav;
