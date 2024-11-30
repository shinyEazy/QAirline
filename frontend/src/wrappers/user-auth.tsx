import { useAuth } from "hooks/auth-hook";
import { Navigate, Outlet } from "react-router-dom";

const UserAuthWrapper = () => {
  const { isLogin } = useAuth();

  // if (isLogin === true) {
  //   return <Outlet />;
  // } else if (isLogin === false) {
  //   return <Navigate to="/auth/login" />;
  // }

  return <Navigate to="/auth/login" />;
};

export default UserAuthWrapper;
