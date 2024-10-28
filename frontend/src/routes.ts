import NoFoundPage from "pages/404";
import HomePage from "pages/home-page";

const routes = [
  {
    path: "",
    component: HomePage,
  },
  { path: "*", component: NoFoundPage },
];

export default routes;
