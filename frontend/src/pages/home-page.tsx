import { Box } from "@mui/material";
import "../styles.css";
import Header from "components/Header";
import Banner from "components/Banner";
import FlightSearch from "components/FlightSearch";
import Benefit from "components/Benefit";
import LatestFlight from "components/LatestFlight";
import GlobalTravel from "components/GlobalTravel";

const HomePage = () => {
  return (
    <Box>
      <Header />
      <Box sx={{ bgcolor: "rgb(234, 234, 234)" }}>
        <Banner />
        <FlightSearch />
        <Benefit />
        <LatestFlight />
        <GlobalTravel />
      </Box>
    </Box>
  );
};

export default HomePage;
