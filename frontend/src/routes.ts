import NoFoundPage from "pages/404";
import HomePage from "pages/home-page";
import Login from "pages/auth/login";
import Auth from "pages/auth";
import SignUp from "pages/auth/signup";
import Recovery from "pages/auth/recovery";
import FlightListing from "pages/FlightListing";
import FlightBooking from "pages/FlightBooking";
import Payment from "pages/Payment";
import AdminPage from "pages/admin";
import AdminLogin from "pages/admin/login";
import AdminAuthWrapper from "wrappers/admin-auth";
// import UserAuthWrapper from "wrappers/user-auth";
import FlightSeat from "pages/flight-seat";
import UserPage from "pages/user";
import BookedTickets from "pages/user/booked-tickets";

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
    path: "/admin",
    // component: AdminAuthWrapper,
    component: AdminPage,
    routes: [
      {
        path: "",
        component: AdminPage,
      },
      {
        path: "login",
        component: AdminLogin,
      },
    ],
  },
  {
    path: "/user/:id",
    component: UserPage,
  },
  {
    path: "/user/:id/booked-tickets",
    component: BookedTickets,
  },
  {
    path: "/user/:id/payment-history",
    component: UserPage,
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
    path: "/flight-seat",
    component: FlightSeat,
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
