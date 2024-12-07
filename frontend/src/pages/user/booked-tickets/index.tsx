import { Box } from "@mui/material";
import BookingTable from "components/user/booking-table";
import Sidebar from "components/user/sidebar";
import Header from "components/home-page/Header";

const BookedTickets = () => {
  return (
    <Box>
      <Header />
      <Box display="flex" height="calc(100vh - 72px)">
        <Sidebar />
        <BookingTable />
      </Box>
    </Box>
  );
};

export default BookedTickets;
