import { Box } from "@mui/material";
import Sidebar from "components/user/sidebar";
import Header from "components/home-page/Header";
import PaymentHistory from "components/user/payment-history";

const BookedTickets = () => {
  return (
    <Box>
      <Header />
      <Box display="flex" height="calc(100vh - 72px)">
        <Sidebar />
        <PaymentHistory />
      </Box>
    </Box>
  );
};

export default BookedTickets;
