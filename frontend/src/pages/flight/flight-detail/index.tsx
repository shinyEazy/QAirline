import { Box, Button } from "@mui/material";
import Header from "components/home-page/Header";
import Footer from "components/home-page/Footer";
import StepFlightDetail from "components/flight/flight-detail/step-flight-detaill";
import SeatDetail from "components/flight/flight-detail/seat-detail";
import FlightRoute from "components/flight/flight-detail/flight-route";
import Price from "components/flight/flight-detail/price";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import useBookingStore from "hooks/booking-hook";
import axios from "../../../hooks/axios-config";
import { toast } from "react-toastify";

const FlightDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const { getPayload } = useBookingStore();

  const handleNext = async () => {
    const payload = getPayload();
    console.log(payload);
    const passengers = payload.passengers;
    for (let i = 0; i < passengers.length; i++) {
      const passenger = passengers[i];
      console.log(passenger);
      if (
        passenger.first_name === null ||
        passenger.first_name === "" ||
        passenger.last_name === null ||
        passenger.last_name === "" ||
        passenger.gender === null ||
        passenger.gender === "" ||
        passenger.date_of_birth === null ||
        passenger.date_of_birth === "" ||
        passenger.nationality === null ||
        passenger.nationality === ""
      ) {
        toast.error(
          `Please fill in seat ${passenger.seat_col}${passenger.seat_row} information`
        );
        return;
      }
    }
    navigate("/flight/payment");
    // try {
    //   const response = await axios.post("/api/booking/", payload);
    //   const data = response.data;
    //   // if (data) {
    //   //   navigate("/flight/payment");
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
            <StepFlightDetail />
            <SeatDetail />
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <Button
                onClick={() => navigate("/flight/seat")}
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
            <FlightRoute />
            <Price />
          </Box>
        </Box>
      </Box>
      <Footer />
    </div>
  );
};

export default FlightDetail;
