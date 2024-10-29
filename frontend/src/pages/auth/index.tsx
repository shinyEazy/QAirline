import { useCallback } from "react";
import { Typewriter } from "react-simple-typewriter";
import { Outlet, useLocation } from "react-router-dom";
import Button from "@mui/material/Button";
import { Box } from "@mui/material";

function Auth() {
  const location = useLocation();

  if (location.pathname !== "/auth") {
    return <Outlet />;
  }

  return <Box></Box>;
}

export default Auth;
