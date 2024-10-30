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
import Benefit from "components/Benefit";

const HomePage = () => {
  return (
    <Box>
      <Header />
      <Box sx={{ bgcolor: "rgb(234, 234, 234)" }}>
        <Banner />
        <FlightSearch />
        <Benefit />
      </Box>
    </Box>
  );
};

export default HomePage;
