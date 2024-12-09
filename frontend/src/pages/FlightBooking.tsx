import { Box, Typography, Button } from "@mui/material";
import Header from "components/home-page/Header";
import Footer from "components/home-page/Footer";
import StepFlightBooking from "components/flight-booking/step-flight-booking";
import UserDetail from "components/flight-booking/UserDetail";
import BookingDetail from "components/flight-booking/BookingDetail";
import Price from "components/flight-booking/Price";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import useBookingPayload from "hooks/booking-hook";
import axios from "../hooks/axios-config";

const FlightBooking = () => {
  const navigate = useNavigate();

  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  const { getPayload } = useBookingPayload();
  const handleNext = async () => {
    navigate("/payment");
    // const payload = getPayload();
    // try {
    //   const response = await axios.post("/api/booking/", payload);
    //   const data = response.data;
    //   // if (data) {
    //   //   navigate("/payment");
    //   // }
    //   console.log(data);
    // } catch (error) {
    //   console.error("Error create booking", error);
    //   throw error;
    // }
  };

  return (
    <div>
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
            <StepFlightBooking />
            <UserDetail />
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <Button
                onClick={() => navigate("/flight-seat")}
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
                onClick={handleNext}
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
                Next
              </Button>
            </Box>
          </Box>
          <Box
            sx={{
              marginTop: "40px",
              flexBasis: "40%",
              minWidth: "250px",
            }}
          >
            <BookingDetail />
            <Price />
          </Box>
        </Box>
      </Box>
      <Footer />
    </div>
  );
};

export default FlightBooking;
