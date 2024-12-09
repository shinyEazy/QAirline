import { Box, Typography, Button } from "@mui/material";
import Header from "components/home-page/Header";
import Footer from "components/home-page/Footer";
import Step from "components/payment/Step";
import BookingDetail from "components/flight-booking/BookingDetail";
import Price from "components/flight-booking/Price";
import Pay from "components/payment/Pay";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import StepFlightPayment from "components/flight-payment/step-fight-payment";

const Payment = () => {
  const navigate = useNavigate();
  const location = useLocation();

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
            <Pay />
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <Button
                onClick={() => navigate("/flight-booking")}
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
                onClick={() => navigate("/")}
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
            <BookingDetail />
            <Price />
          </Box>
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};

export default Payment;
