import { Box, Typography, TextField, Button, MenuItem } from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import useBookingStore from "hooks/booking-hook";
import { Passenger } from "types/passenger";
import { toast } from "react-toastify";

const SeatDetail = () => {
  const [bookerEmail, setBookerEmailField] = useState("");
  const { setBookerEmail } = useBookingStore();

  useEffect(() => {
    setBookerEmail("");
    setBookerEmailField("");
  }, []);

  const { payload, getPassengers, setPassengers } = useBookingStore();
  const passengers = getPassengers();
  const [seatOwners, setSeatOwners] = useState<Passenger[]>(
    passengers.map((passenger: Passenger) => ({
      ...passenger,
      seat_row: passenger.seat_row || 0,
      seat_col: passenger.seat_col || "A",
    }))
  );

  const [currentSeatIndex, setCurrentSeatIndex] = useState(0);

  const isValidDate = (date: string) => {
    const parsedDate = new Date(date);
    const today = new Date();

    return (
      !isNaN(parsedDate.getTime()) &&
      parsedDate < today && // Date is in the past
      today.getFullYear() - parsedDate.getFullYear() <= 120 // Reasonable age check
    );
  };

  const constructSeatId = (seatOwner: Passenger) =>
    `${seatOwner.seat_col}${seatOwner.seat_row}`;

  const handleInputChange = (
    seat_id: string,
    field: keyof Passenger,
    value: string | boolean
  ) => {
    setSeatOwners((prev) => {
      const updatedSeatOwners = prev.map((owner) =>
        constructSeatId(owner) === seat_id
          ? { ...owner, [field]: value }
          : owner
      );
      setPassengers(updatedSeatOwners);
      return updatedSeatOwners;
    });
  };

  const validateFields = (passenger: Passenger) => {
    const requiredFields: (keyof Passenger)[] = [
      "first_name",
      "last_name",
      "gender",
      "date_of_birth",
      "nationality",
    ];

    const allFieldsFilled = requiredFields.every((field) => passenger[field]);
    if (!allFieldsFilled) return false;

    if (!isValidDate(passenger.date_of_birth)) {
      toast.error("Please provide a valid date of birth");
      return false;
    }
    return true;
  };

  const handleNavigation = (direction: "prev" | "next") => {
    const currentSeat = seatOwners[currentSeatIndex];

    if (direction === "next" && !validateFields(currentSeat)) {
      toast.error("Please fill all required fields before proceeding.");

      return;
    }

    // Save current seat data before navigating
    setSeatOwners((prev) => {
      const updatedSeatOwners = [...prev];
      updatedSeatOwners[currentSeatIndex] = { ...currentSeat };
      setPassengers(updatedSeatOwners); // Sync with the global store
      return updatedSeatOwners;
    });

    // Navigate to the next or previous seat
    setCurrentSeatIndex((prevIndex) => {
      const newIndex =
        direction === "prev"
          ? Math.max(prevIndex - 1, 0)
          : Math.min(prevIndex + 1, seatOwners.length - 1);

      // Initialize new seat if data doesn't exist yet
      if (direction === "next" && !validateFields(seatOwners[newIndex])) {
        setSeatOwners((prev) => {
          const updatedSeatOwners = [...prev];
          updatedSeatOwners[newIndex] = {
            ...updatedSeatOwners[newIndex],
            first_name: "",
            last_name: "",
            gender: "",
            date_of_birth: "",
            nationality: "",
            phone_number: "",
            citizen_id: "",
            passport_number: "",
          };
          return updatedSeatOwners;
        });
      }

      return newIndex;
    });
  };

  const handleBookerEmailField = (bookerEmail: string) => {
    setBookerEmailField(bookerEmail);
    setBookerEmail(bookerEmail);
  };

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email.trim());
  };

  return (
    <Box
      sx={{
        marginTop: "40px",
        backgroundColor: "white",
        borderRadius: "20px",
        padding: "20px",
        color: "black",
        boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Box sx={{ textAlign: "center", marginBottom: "20px" }}>
        <Typography
          sx={{
            fontSize: "1.3rem",
            fontWeight: "500",
            marginBottom: "16px",
          }}
        >
          Enter your email
        </Typography>
        <TextField
          fullWidth
          label="Booker Email*"
          value={bookerEmail}
          onChange={(e) => handleBookerEmailField(e.target.value)}
          variant="outlined"
        />
      </Box>
      <Box
        sx={{
          borderRadius: "20px",
          textAlign: "center",
        }}
      >
        <Typography
          sx={{
            fontSize: "1.3rem",
            fontWeight: "500",
            marginBottom: "16px",
          }}
        >
          {payload.flight_class} -{" "}
          {constructSeatId(seatOwners[currentSeatIndex])}
        </Typography>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "16px",
          }}
        >
          <TextField
            fullWidth
            label="First Name*"
            value={seatOwners[currentSeatIndex].first_name}
            onChange={(e) =>
              handleInputChange(
                constructSeatId(seatOwners[currentSeatIndex]),
                "first_name",
                e.target.value
              )
            }
            variant="outlined"
            sx={textFieldStyles}
          />
          <TextField
            fullWidth
            label="Last Name*"
            value={seatOwners[currentSeatIndex].last_name}
            onChange={(e) =>
              handleInputChange(
                constructSeatId(seatOwners[currentSeatIndex]),
                "last_name",
                e.target.value
              )
            }
            variant="outlined"
            sx={textFieldStyles}
          />
          <TextField
            fullWidth
            label="Gender*"
            select
            value={seatOwners[currentSeatIndex].gender}
            onChange={(e) =>
              handleInputChange(
                constructSeatId(seatOwners[currentSeatIndex]),
                "gender",
                e.target.value
              )
            }
            variant="outlined"
            sx={textFieldStyles}
          >
            <MenuItem value="Male">Male</MenuItem>
            <MenuItem value="Female">Female</MenuItem>
          </TextField>
          <TextField
            fullWidth
            label="Date of Birth*"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={seatOwners[currentSeatIndex].date_of_birth}
            onChange={(e) =>
              handleInputChange(
                constructSeatId(seatOwners[currentSeatIndex]),
                "date_of_birth",
                e.target.value
              )
            }
            variant="outlined"
            sx={textFieldStyles}
          />
          <TextField
            fullWidth
            label="Nationality*"
            value={seatOwners[currentSeatIndex].nationality}
            onChange={(e) =>
              handleInputChange(
                constructSeatId(seatOwners[currentSeatIndex]),
                "nationality",
                e.target.value
              )
            }
            variant="outlined"
            sx={textFieldStyles}
          />
          <TextField
            fullWidth
            label="Phone Number"
            value={seatOwners[currentSeatIndex].phone_number}
            onChange={(e) =>
              handleInputChange(
                constructSeatId(seatOwners[currentSeatIndex]),
                "phone_number",
                e.target.value
              )
            }
            variant="outlined"
            sx={textFieldStyles}
          />
          <TextField
            fullWidth
            label="Citizen Identification Number"
            value={seatOwners[currentSeatIndex].citizen_id}
            onChange={(e) =>
              handleInputChange(
                constructSeatId(seatOwners[currentSeatIndex]),
                "citizen_id",
                e.target.value
              )
            }
            variant="outlined"
            sx={textFieldStyles}
          />
          <TextField
            fullWidth
            label="Passport Number"
            value={seatOwners[currentSeatIndex].passport_number}
            onChange={(e) =>
              handleInputChange(
                constructSeatId(seatOwners[currentSeatIndex]),
                "passport_number",
                e.target.value
              )
            }
            variant="outlined"
            sx={textFieldStyles}
          />
        </Box>
        <Box
          sx={{
            marginTop: "20px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Button
            variant="outlined"
            disableRipple
            disabled={currentSeatIndex === 0}
            onClick={() => handleNavigation("prev")}
            sx={{
              backgroundColor: "white",
              borderRadius: "8px",
              color: "#1e90ff",
              width: "150px",
              fontSize: "1rem",
              textTransform: "none",
              padding: "10px 20px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              border: "1px solid #1e90ff",
              transition: "all 0.3s ease",
              "&:hover": {
                backgroundColor: "#1e90ff",
                color: "white ",
                border: "1px solid #1e90ff",
              },
              "&:disabled": {
                backgroundColor: "white",
                color: "white",
                border: "1px solid white",
                boxShadow: "none",
              },
            }}
          >
            Previous
          </Button>
          <Button
            variant="outlined"
            disabled={currentSeatIndex === seatOwners.length - 1}
            onClick={() => handleNavigation("next")}
            sx={{
              backgroundColor: "white",
              borderRadius: "8px",
              color: "#1e90ff",
              width: "150px",
              fontSize: "1rem",
              textTransform: "none",
              border: "1px solid #1e90ff",
              padding: "10px 20px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              transition: "all 0.3s ease",
              "&:hover": {
                backgroundColor: "#1e90ff",
                color: "white ",
                border: "1px solid #1e90ff",
              },
              "&:disabled": {
                backgroundColor: "white",
                color: "white",
                border: "1px solid white",
                boxShadow: "none",
              },
            }}
          >
            Next
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

const textFieldStyles = {
  margin: "auto",
  "& .MuiOutlinedInput-root": {
    borderRadius: "8px",
    "& fieldset": { borderColor: "#b0c4de" },
    "&:hover fieldset": { borderColor: "#1e90ff", color: "#1e90ff" },
    "&.Mui-focused fieldset": { borderColor: "#1e90ff", color: "#1e90ff" },
  },

  "& .MuiInputLabel-root": {
    position: "absolute",
    top: "-8px",
    left: "12px",
    fontSize: "0.75rem",
    color: "rgb(0,0,0, 0.6)",
    backgroundColor: "white",
    padding: "0 4px",
    transform: "none",
    zIndex: 1,
  },

  "& .MuiInputLabel-shrink": {
    backgroundColor: "white",
    padding: "0 4px",
  },
};

export default SeatDetail;
