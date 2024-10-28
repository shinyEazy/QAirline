import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import routes from "./routes";
import { Box } from "@mui/material";

const renderRoutes = (routes: any[]) => {
  return routes.map((route, index) => {
    if (route.routes) {
      return (
        <Route path={route.path} element={<route.component />} key={index}>
          {renderRoutes(route.routes)}
        </Route>
      );
    }
    return (
      <Route path={route.path} element={<route.component />} key={index} />
    );
  });
};

function App() {
  return (
    <Box>
      <Router>
        <Routes>{renderRoutes(routes)}</Routes>
      </Router>
    </Box>
  );
}

export default App;
