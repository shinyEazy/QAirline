import { Box } from "@mui/material";
import { Outlet, useLocation } from "react-router-dom";

function AdminPage() {
  const location = useLocation();

  if (location.pathname !== "/admin") {
    return <Outlet />;
  }

  return <Box>this is where admin page</Box>;
}

export default AdminPage;
