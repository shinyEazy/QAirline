import { Box, Typography } from "@mui/material";
import Header from "components/home-page/Header";
import FlightSearch from "components/home-page/FlightSearch";
import FilterSearch from "components/flight-listing/FilterSearch";
import SearchResult from "components/flight-listing/SearchResult";
import Footer from "components/home-page/Footer";
import { useState } from "react";
import { Flight } from "types/flight";
const FlightListing = () => {
  const [flights, setFlights] = useState<Flight[]>([]);

  return (
    <Box bgcolor="rgb(234,234,234)">
      <Header />

      <FlightSearch setFlights={setFlights} />
      <Box
        display="flex"
        gap="40px"
        sx={{
          margin: "20px 80px 80px",
          "@media (max-width:900px)": {
            flexDirection: "column",
            gap: "10px",
          },
        }}
      >
        <Box
          sx={{
            flexBasis: "30%",
            minWidth: "250px",
            "@media (max-width:900px)": {
              width: "100%",
            },
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
      <Box bgcolor="white">
        <Footer />
      </Box>
    </Box>
  );
};

export default FlightListing;
