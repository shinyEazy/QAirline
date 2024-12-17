import { Outlet, useLocation } from "react-router-dom";
import { Box } from "@mui/material";

function News() {
  const location = useLocation();

  if (location.pathname !== "/news") {
    return <Outlet />;
  }

  return <Box></Box>;
}

export default News;
