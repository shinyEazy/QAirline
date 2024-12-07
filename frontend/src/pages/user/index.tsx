import { Box } from "@mui/material";
import BookingTable from "components/user/booking-table";
import Sidebar from "components/user/sidebar";
import Header from "components/home-page/Header";

const UserPage = () => {
  return (
    <Box>
      <Header />
      <Box display="flex" height="calc(100vh - 72px)">
        <Sidebar />
        <Box width="100%" bgcolor="rgb(232,232,232)"></Box>
      </Box>
    </Box>
  );
};

export default UserPage;
