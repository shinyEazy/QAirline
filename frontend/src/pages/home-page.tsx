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
import Footer from "components/home-page/Footer";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import News from "components/home-page/news";

const theme = createTheme({
  typography: {
    fontFamily: "JetBrains Mono, monospace",
  },
});

const HomePage = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box>
        <Header />
        <Box sx={{ bgcolor: "rgb(234, 234, 234)" }}>
          <Banner />
          <FlightSearch />
          <News />
          <Benefit />
          <LatestFlight />
          <GlobalTravel />
          <Achievement />
          <Testimonial />
          <LatestNews />
        </Box>
        <Footer />
      </Box>
    </ThemeProvider>
  );
};

export default HomePage;
