import NoFoundPage from "pages/404";
import HomePage from "pages/home-page";
import Login from "pages/auth/login";
import Auth from "pages/auth";
import SignUp from "pages/auth/signup";
import Recovery from "pages/auth/recovery";
import FlightListing from "pages/FlightListing";
import FlightBooking from "pages/FlightBooking";
import Payment from "pages/Payment";

const routes = [
  {
    path: "/auth",
    component: Auth,
    routes: [
      {
        path: "login",
        component: Login,
      },
      {
        path: "signup",
        component: SignUp,
      },
      {
        path: "recovery",
        component: Recovery,
      },
    ],
  },
  {
    path: "",
    component: HomePage,
  },
  {
    path: "*",
    component: NoFoundPage,
  },
  {
    path: "/flight-listing",
    component: FlightListing,
  },
  {
    path: "/flight-booking",
    component: FlightBooking,
  },
  {
    path: "/payment",
    component: Payment,
  },
];

export default routes;
