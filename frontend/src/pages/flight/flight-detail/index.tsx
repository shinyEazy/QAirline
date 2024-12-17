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
    const citizenIdRegex = /^\d{9,16}$/; // Allows 9 to 16 digits.
    return citizenIdRegex.test(citizenId);
  };

  const isValidPassportNumber = (passportNumber: string) => {
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

  const isValidPhoneNumber = (phoneNumber: string) => {
    const phoneRegex = /^\+?[0-9]{7,15}$/; // Allows optional "+" and 7-15 digits.
    return phoneRegex.test(phoneNumber.trim());
  };

  const handleNext = async () => {
    const payload = getPayload();
    console.log(payload);
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

      // if (!isValidPhoneNumber(passenger.phone_number)) {
      //   validationErrors.push("Please provide a valid phone number");
      // }

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

      // if (!isValidCitizenID(passenger.citizen_id)) {
      //   validationErrors.push(
      //     "Please provide a valid Citizen ID (9–16 digits)"
      //   );
      // }

      // if (!isValidPassportNumber(passenger.passport_number)) {
      //   validationErrors.push(
      //     "Please provide a valid Passport Number (6–12 alphanumeric characters)"
      //   );
      // }

      if (validationErrors.length > 0) {
        validationErrors.forEach((error) => toast.error(error));
        return false;
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
            <Price />
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
