import { Box } from "@mui/material";
import "../styles.css";
import Header from "components/home-page/Header";
import Banner from "components/home-page/Banner";
import FlightSearch from "components/home-page/FlightSearch";
import Benefit from "components/home-page/Benefit";
import LatestFlight from "components/home-page/LatestFlight";
import Achievement from "components/home-page/Achievement";
import LatestNews from "components/home-page/LatestNews";
import Footer from "components/home-page/Footer";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import News from "components/home-page/news";
import '@fontsource/montserrat/400.css'; // Bold weight
import '@fontsource/ibm-plex-sans';
const theme = createTheme({
  typography: {
    fontFamily: 'IBM Plex Sans, sans-serif',
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
          <Achievement />
          <LatestNews />
        </Box>
        <Footer />
      </Box>
    </ThemeProvider>
  );
};

export default HomePage;
