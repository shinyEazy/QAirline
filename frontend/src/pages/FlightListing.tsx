import { Box, Typography } from "@mui/material";
import Header from "components/home-page/Header";
import FlightSearch from "components/home-page/FlightSearch";
import FilterSearch from "components/flight-listing/FilterSearch";

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
      <Box>
        <FilterSearch />
      </Box>
    </Box>
  );
};

export default FlightListing;
