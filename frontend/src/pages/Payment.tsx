import { Box, Typography, Button } from "@mui/material";
import Header from "components/home-page/Header";
import Footer from "components/home-page/Footer";
import Step from "components/payment/Step";
import BookingDetail from "components/flight-booking/BookingDetail";
import Price from "components/flight-booking/Price";
import Pay from "components/payment/Pay";

const Payment = () => {
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
          <Pay />
          <Box display="flex" gap="40px" marginTop="40px">
            <Button
              fullWidth
              sx={{
                backgroundColor: "blue",
                borderRadius: "8px",
                color: "white",
              }}
            >
              Back
            </Button>
            <Button
              fullWidth
              sx={{
                backgroundColor: "blue",
                borderRadius: "8px",
                color: "white",
              }}
            >
              Submit
            </Button>
          </Box>
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
    </Box>
  );
};

export default Payment;
