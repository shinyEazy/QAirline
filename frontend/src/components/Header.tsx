import React from "react";
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

const Header = () => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      padding="20px 80px"
    >
      <Box>
        <Typography variant="h6">QAirline</Typography>
      </Box>
      <Box display="flex" gap="10px">
        <Button>Home</Button>
        <Button>Flight</Button>
        <Button>Car</Button>
        <Button>Hotel</Button>
        <Button>Tour Package</Button>
        <Button>Pages</Button>
        <Button>News</Button>
      </Box>
      <Box display="flex" gap="10px">
        <Button>Search</Button>
        <Button>Login/Signup</Button>
      </Box>
    </Box>
  );
};

export default Header;
