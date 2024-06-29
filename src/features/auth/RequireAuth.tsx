import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

interface IProps {
  allowedRoles: string[];
}

const RequireAuth = ({ allowedRoles }: IProps) => {
  const { roles } = useAuth();
  const location = useLocation();

  const content = roles.some((role) => allowedRoles.includes(role)) ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );

  return content;
};

export default RequireAuth;
