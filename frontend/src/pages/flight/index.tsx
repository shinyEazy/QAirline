import { Outlet, useLocation } from "react-router-dom";
import { Box } from "@mui/material";

function Flight() {
  const location = useLocation();

  if (location.pathname !== "/flight") {
    return <Outlet />;
  }

  return <Box></Box>;
}

export default Flight;
