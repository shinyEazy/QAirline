import NoFoundPage from "pages/404";
import HomePage from "pages/home-page";
import Login from "pages/auth/login";
import Auth from "pages/auth";

const routes = [
  {
    path: "/auth",
    component: Auth,
    routes: [
      {
        path: "login",
        component: Login,
      },
    ],
  },
  {
    path: "",
    component: HomePage,
  },
  { path: "*", component: NoFoundPage },
];

export default routes;
