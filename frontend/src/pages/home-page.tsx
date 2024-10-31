import { Box } from "@mui/material";
import "../styles.css";
import Header from "components/home-page/Header";
import Banner from "components/home-page/Banner";
import FlightSearch from "components/home-page/FlightSearch";
import Benefit from "components/home-page/Benefit";
import LatestFlight from "components/home-page/LatestFlight";
import GlobalTravel from "components/home-page/GlobalTravel";
import Achievement from "components/home-page/Achievement";
import Testimonial from "components/home-page/Testimonial";
import LatestNews from "components/home-page/LatestNews";

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
        <Achievement />
        <Testimonial />
        <LatestNews />
      </Box>
    </Box>
  );
};

export default HomePage;
