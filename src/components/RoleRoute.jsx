import { Navigate } from "react-router-dom";
import { getUserInfo, isLoggedIn } from "../auth/auth";

const RoleRoute = ({ children, allowedRoles }) => {
  const userInfo = getUserInfo();

  if (!isLoggedIn()) return <Navigate to="/login" />;
  if (!userInfo || !allowedRoles.includes(userInfo.role)) {
    return <Navigate to="/unauthorized" />;
  }

  return children;
};

export default RoleRoute;
