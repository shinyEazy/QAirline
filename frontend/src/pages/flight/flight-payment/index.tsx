import { Box, Typography, Button, CircularProgress } from "@mui/material";
import Header from "components/home-page/Header";
import Footer from "components/home-page/Footer";
import FlightRoute from "components/flight/flight-detail/flight-route";
import Price from "components/flight/flight-detail/price";
import Payment from "components/flight/flight-payment/payment";
import StepFlightPayment from "components/flight/flight-payment/step-fight-payment";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import useBookingStore, { createBooking } from "hooks/booking-hook";

const FlightPayment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { getPayload } = useBookingStore();

  const [loading, setLoading] = useState(false);

  const submitBooking = async () => {
    try {
      const payload = getPayload();
      setLoading(true);
      const response = await createBooking(payload);
      navigate("/");
    } catch (error) {
      console.error("Error in submitting booking", error);
    } finally {
      setLoading(false);
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
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <Button
                onClick={() => navigate("/flight/detail")}
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
                Submit
              </Button>
            </Box>
          </Box>
          <Box
            sx={{
              marginTop: "40px",
              flexBasis: "40%",
              minWidth: "250px",
              marginBottom: "80px",
            }}
          >
            <FlightRoute />
            <Price />
          </Box>
        </Box>
      </Box>
      <Footer />

      {/* Loading overlay */}
      {loading && (
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 10000,
          }}
        >
          <CircularProgress size={60} sx={{ color: "white" }} />
        </Box>
      )}
    </Box>
  );
};

export default FlightPayment;
