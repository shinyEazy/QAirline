import {
  Box,
  Input,
  Button,
  RadioGroup,
  FormControl,
  FormControlLabel,
  Radio,
  Typography,
} from "@mui/material";
import "../styles.css";
import Header from "components/Header";
import Banner from "components/Banner";
import FlightSearch from "components/FlightSearch";

const HomePage = () => {
  return (
    <Box>
      <Header />
      <Banner />
      <FlightSearch />
    </Box>
  );
};

export default HomePage;
