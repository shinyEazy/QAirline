import React from "react";
import { Box, Button, Typography } from "@mui/material";

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
        <Button
          sx={{
            color: "black",
            fontWeight: "600",
            fontSize: "1.2rem",
            textTransform: "none",
          }}
        >
          Home
        </Button>
        <Button
          sx={{
            color: "black",
            fontWeight: "600",
            fontSize: "1.2rem",
            textTransform: "none",
          }}
        >
          Flight
        </Button>
        <Button
          sx={{
            color: "black",
            fontWeight: "600",
            fontSize: "1.2rem",
            textTransform: "none",
          }}
        >
          Car
        </Button>
        <Button
          sx={{
            color: "black",
            fontWeight: "600",
            fontSize: "1.2rem",
            textTransform: "none",
          }}
        >
          Hotel
        </Button>
        <Button
          sx={{
            color: "black",
            fontWeight: "600",
            fontSize: "1.2rem",
            textTransform: "none",
          }}
        >
          Tour Package
        </Button>
        <Button
          sx={{
            color: "black",
            fontWeight: "600",
            fontSize: "1.2rem",
            textTransform: "none",
          }}
        >
          Pages
        </Button>
        <Button
          sx={{
            color: "black",
            fontWeight: "600",
            fontSize: "1.2rem",
            textTransform: "none",
          }}
        >
          News
        </Button>
      </Box>
      <Box display="flex" gap="10px">
        <Button
          sx={{
            color: "black",
            fontWeight: "600",
            fontSize: "1.2rem",
            textTransform: "none",
          }}
        >
          Search
        </Button>
        <Button
          sx={{
            color: "black",
            fontWeight: "600",
            fontSize: "1.2rem",
            textTransform: "none",
          }}
        >
          Login/Signup
        </Button>
      </Box>
    </Box>
  );
};

export default Header;
