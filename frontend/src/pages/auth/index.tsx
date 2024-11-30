import { Outlet, useLocation } from "react-router-dom";
import { Box } from "@mui/material";

function Auth() {
  const location = useLocation();

  if (location.pathname !== "/auth") {
    return <Outlet />;
  }

  return <Box></Box>;
}

export default Auth;
