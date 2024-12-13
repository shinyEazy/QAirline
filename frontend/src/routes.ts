import NoFoundPage from "pages/404";
import HomePage from "pages/home-page";
import Login from "pages/auth/login";
import Auth from "pages/auth";
import SignUp from "pages/auth/signup";
import Recovery from "pages/auth/recovery";
import AdminPage from "pages/admin";
import AdminLogin from "pages/admin/login";
import AdminAuthWrapper from "wrappers/admin-auth";
// import UserAuthWrapper from "wrappers/user-auth";
import FlightSeat from "pages/flight/flight-seat";
import UserPage from "pages/user";
import BookedTickets from "pages/user/booked-tickets";
import PaymentHistory from "pages/user/payment-history";
import Flight from "pages/flight";
import FlightList from "pages/flight/flight-list";
import FlightDetail from "pages/flight/flight-detail";
import FlightPayment from "pages/flight/flight-payment";
import FlightBooking from "components/flight/flight-booking";

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
    component: PaymentHistory,
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
    path: "/flight",
    component: Flight,
    routes: [
      {
        path: "list",
        component: FlightList,
      },
      {
        path: "seat",
        component: FlightSeat,
      },
      {
        path: "detail",
        component: FlightDetail,
      },
      {
        path: "payment",
        component: FlightPayment,
      },
      {
        path: "booking",
        component: FlightBooking,
      },
    ],
  },
];

export default routes;
