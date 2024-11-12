import { Box, Typography } from "@mui/material";
import Header from "components/home-page/Header";
import FlightSearch from "components/home-page/FlightSearch";
import FilterSearch from "components/flight-listing/FilterSearch";
import SearchResult from "components/flight-listing/SearchResult";
import Footer from "components/home-page/Footer";

const FlightListing = () => {
  return (
    <Box>
      <Header />
      <Typography
        display="flex"
        width="100%"
        alignItems="center"
        textAlign="center"
        justifyContent="center"
        height="300px"
      >
        Flight Listing
      </Typography>
      <FlightSearch />
      <Box
        display="flex"
        gap="40px"
        sx={{
          margin: "20px 80px 80px",
        }}
      >
        <Box
          sx={{
            flexBasis: "30%",
            minWidth: "250px",
          }}
        >
          <FilterSearch />
        </Box>
        <Box
          sx={{
            flexBasis: "70%",
          }}
        >
          <SearchResult />
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};

export default FlightListing;
