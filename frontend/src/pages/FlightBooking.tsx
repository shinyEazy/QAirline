import { Box, Typography, Button } from "@mui/material";
import Header from "components/home-page/Header";
import Footer from "components/home-page/Footer";
import Step from "components/flight-booking/Step";
import UserDetail from "components/flight-booking/UserDetail";
import BookingDetail from "components/flight-booking/BookingDetail";
import Price from "components/flight-booking/Price";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const FlightBooking = () => {
  const navigate = useNavigate();

  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div>
      <Header />
      <Typography
        display="flex"
        width="100%"
        alignItems="center"
        textAlign="center"
        justifyContent="center"
        height="300px"
      >
        Flight Booking
      </Typography>

      <Box
        display="flex"
        gap="40px"
        sx={{
          margin: "20px 80px 80px",
        }}
      >
        <Box
          sx={{
            flexBasis: "60%",
          }}
        >
          <Step />
          <UserDetail />
          <Button
            onClick={() => navigate("/payment")}
            fullWidth
            sx={{
              marginTop: "40px",
              backgroundColor: "blue",
              borderRadius: "8px",
              color: "white",
            }}
          >
            Next
          </Button>
        </Box>
        <Box
          sx={{
            flexBasis: "40%",
            minWidth: "250px",
          }}
        >
          <BookingDetail />
          <Price />
        </Box>
      </Box>
      <Footer />
    </div>
  );
};

export default FlightBooking;
