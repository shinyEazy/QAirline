import { useAdminAuth } from "hooks/auth-hook";
import { Navigate, Outlet } from "react-router-dom";

const AdminAuthWrapper = () => {
  const { isLogin } = useAdminAuth();

  if (isLogin === true) {
    return <Outlet />;
  } else if (isLogin === false) {
    return <Navigate to="/admin/login" />;
  }
};

export default AdminAuthWrapper;
