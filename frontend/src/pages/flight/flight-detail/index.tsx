import { Box, Button, Divider, Typography } from "@mui/material";
import Header from "components/home-page/Header";
import Footer from "components/home-page/Footer";
import StepFlightDetail from "components/flight/flight-detail/step-flight-detaill";
import SeatDetail from "components/flight/flight-detail/seat-detail";
import FlightRoute from "components/flight/flight-detail/flight-route";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "react-toastify";
import useBookingStore from "hooks/booking-hook";

const FlightDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    priceSummary,
  }: { priceSummary: { [key: string]: { count: number; total: number } } } =
    location.state || {};

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const { getPayload } = useBookingStore();
  const isValidDate = (date: string) => {
    const parsedDate = new Date(date);
    const today = new Date();
    return (
      !isNaN(parsedDate.getTime()) &&
      parsedDate < today && // Date is in the past
      today.getFullYear() - parsedDate.getFullYear() <= 120 // Reasonable age check
    );
  };
  const isValidCitizenID = (citizenId: string) => {
    if (citizenId == "") return true;
    const citizenIdRegex = /^\d{9,16}$/; // Allows 9 to 16 digits.
    return citizenIdRegex.test(citizenId);
  };
  const isValidPassportNumber = (passportNumber: string) => {
    if (passportNumber == "") return true;
    const passportRegex = /^[A-Za-z0-9]{6,12}$/; // Alphanumeric, 6–12 characters.
    return passportRegex.test(passportNumber);
  };
  const isValidCountryName = (countryName: string) => {
    // Regular expression to match common country name patterns
    const countryNameRegex = /^[A-Za-z\s-]+$/;

    // Trim whitespace and check for non-empty string
    const trimmedName = countryName.trim();
    return trimmedName.length > 0 && countryNameRegex.test(trimmedName);
  };

  const isValidName = (name: string) => {
    const nameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ' -]{1,50}$/; // Supports international characters, spaces, hyphens, and apostrophes.
    return name.trim().length > 0 && nameRegex.test(name);
  };

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email.trim());
  };

  const handleNext = async () => {
    const payload = getPayload();
    const passengers = payload.passengers;
    toast.dismiss();
    for (let i = 0; i < passengers.length; i++) {
      const passenger = passengers[i];
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
      const validationErrors = [];
      if (!isValidDate(passenger.date_of_birth)) {
        validationErrors.push(
          `Seat ${passenger.seat_col}${passenger.seat_row}: Please provide a valid date of birth`
        );
      }

      if (!isValidName(passenger.first_name)) {
        validationErrors.push(
          `Seat ${passenger.seat_col}${passenger.seat_row}: Please provide a valid first name`
        );
      }

      if (!isValidName(passenger.last_name)) {
        validationErrors.push(
          `Seat ${passenger.seat_col}${passenger.seat_row}: Please provide a valid last name`
        );
      }

      if (!isValidCountryName(passenger.nationality)) {
        validationErrors.push(
          `Seat ${passenger.seat_col}${passenger.seat_row}: Please provide a valid nationality`
        );
      }
      if (!isValidCitizenID(passenger.citizen_id)) {
        validationErrors.push(
          "Please provide a valid Citizen ID (9–16 digits)"
        );
      }
      if (!isValidPassportNumber(passenger.passport_number)) {
        validationErrors.push(
          "Please provide a valid Passport Number (6–12 alphanumeric characters)"
        );
      }
      if (validationErrors.length > 0) {
        validationErrors.forEach((error) => toast.error(error));
        return false;
      }

      if (!payload.booker_email) {
        toast.error("Please enter your email before submitting the booking.");
        return;
      }
      if (!isValidEmail(payload.booker_email)) {
        toast.error("Please provide a valid email address");
        return;
      }

      try {
        navigate("/flight/payment", {
          state: {
            priceSummary,
          },
        });
        console.log("Payload truoc do", payload);
        // await createBooking(payload);
      } catch (error) {
        toast.error(error.response.data.detail);
      }
    }
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
            <StepFlightDetail />
            <SeatDetail />
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
      <Footer />
    </div>
  );
};

export default FlightDetail;
