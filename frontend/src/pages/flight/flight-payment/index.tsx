import { Box, Typography, Button, Divider } from "@mui/material";
import Header from "components/home-page/Header";
import Footer from "components/home-page/Footer";
import FlightRoute from "components/flight/flight-detail/flight-route";
import Payment from "components/flight/flight-payment/payment";
import StepFlightPayment from "components/flight/flight-payment/step-fight-payment";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import useBookingStore, { createBooking } from "hooks/booking-hook";
import { toast } from "react-toastify";
import { createPayment } from "hooks/payment-hook";

const FlightPayment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { getPayload } = useBookingStore();
  interface PriceSummary {
    [className: string]: {
      count: number;
      total: number;
    };
  }

  const { priceSummary } =
    (location.state as { priceSummary: PriceSummary }) || {};
  console.log(priceSummary);
  // const isValidEmail = (email: string) => {
  //   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  //   return emailRegex.test(email.trim());
  // };
  const payload = getPayload();
  console.log("This is payload", payload);
  const submitBooking = async () => {
    try {
      navigate("/");
      const response = await createBooking(payload);
      console.log(response.booking.booking_id);
      await createPayment(response.booking.booking_id);
      toast.success("Booking and payment completed successfully.");
    } catch (error) {
      toast.error(error.response.data.detail);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <Box>
      <Header />
      <Box bgcolor="rgb(234,234,234)">
        <Box
          display="flex"
          gap="40px"
          sx={{
            margin: "0px 80px 0px",
            "@media(max-width:1200px)": {
              margin: "20px 20px 0px",
            },
            "@media(max-width:1100px)": {
              flexDirection: "column",
              gap: "0",
            },
          }}
        >
          <Box
            sx={{
              marginTop: "40px",
              flexBasis: "70%",
            }}
          >
            <StepFlightPayment />
            <Payment />
          </Box>
          <Box
            sx={{
              marginTop: "40px",
              flexBasis: "40%",
              minWidth: "250px",
            }}
          >
            <FlightRoute />
            <Box
              sx={{
                backgroundColor: "white",
                borderRadius: "20px",
                padding: "20px",
                boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
                marginTop: "40px",
              }}
            >
              <Typography variant="h6">Price Summary</Typography>
              <Box marginTop="20px">
                {Object.entries(priceSummary).map(
                  ([className, { count, total }]) => (
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      marginBottom="10px"
                      key={className}
                    >
                      <Typography>
                        {className} x {count}
                      </Typography>
                      <Typography>{total}$</Typography>
                    </Box>
                  )
                )}
              </Box>

              <Divider sx={{ margin: "20px 0" }} />
              <Box display="flex" justifyContent="space-between">
                <Typography>Total</Typography>
                <Typography>
                  {Object.values(priceSummary).reduce(
                    (acc, { total }) => acc + total,
                    0
                  )}
                  $
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box
        padding="0px 80px 0px"
        bgcolor="rgb(234,234,234)"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          "@media(max-width:1200px)": {
            padding: "0px 20px 0px",
          },
        }}
      >
        <Button
          onClick={() => {
            navigate("/flight/detail", {
              state: {
                priceSummary,
              },
            });
          }}
          fullWidth
          sx={{
            marginTop: "40px",
            marginBottom: "40px",
            backgroundColor: "#1e90ff",
            borderRadius: "8px",
            color: "white",
            width: "150px",
            fontSize: "1rem",
            textTransform: "none",
            fontWeight: "bold",
            padding: "10px 20px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            transition: "all 0.3s ease",
            "&:hover": { backgroundColor: "#2177cb", color: "white" },
          }}
        >
          Back
        </Button>
        <Button
          onClick={submitBooking}
          fullWidth
          sx={{
            marginTop: "40px",
            marginBottom: "40px",
            backgroundColor: "#1e90ff",
            borderRadius: "8px",
            color: "white",
            width: "150px",
            fontSize: "1rem",
            textTransform: "none",
            fontWeight: "bold",
            padding: "10px 20px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            transition: "all 0.3s ease",
            "&:hover": { backgroundColor: "#2177cb", color: "white" },
          }}
        >
          Finish
        </Button>
      </Box>
      <Footer />
    </Box>
  );
};

export default FlightPayment;
