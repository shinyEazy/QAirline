import { Box, Typography } from "@mui/material";
import Header from "components/home-page/Header";
import FlightSearch from "components/home-page/FlightSearch";
import FilterSearch from "components/flight/flight-list/filter-search";
import SearchResult from "components/flight/flight-list/search-result";
import Footer from "components/home-page/Footer";
import { useFlightSearchStore } from "hooks/flight-search-hook";
const FlightList = () => {
  const { flights } = useFlightSearchStore();
  return (
    <Box bgcolor="rgb(234,234,234)">
      <Header />

      <FlightSearch />
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
          <SearchResult flights={flights} />
        </Box>
      </Box>
      <Box bgcolor="white">
        <Footer />
      </Box>
    </Box>
  );
};

export default FlightList;
