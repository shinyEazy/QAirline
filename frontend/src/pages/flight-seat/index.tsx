import {
  Box,
  Typography,
  Button,
  Divider,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";
import Header from "components/home-page/Header";
import Footer from "components/home-page/Footer";
import Step from "components/flight-booking/Step";
import BookingDetail from "components/flight-booking/BookingDetail";
import { useNavigate } from "react-router-dom";
import { useState, useMemo } from "react";
import useBookingPayload from "hooks/booking-hook";

const SEAT_PRICE = 100;
const totalSeatsPerClass = 36;

const toggleButtonStyles = {
  width: "150px",
  backgroundColor: "white",
  color: "black",
  fontSize: "1rem",
  fontWeight: "bold",
  borderRadius: "8px",
  padding: "10px 20px",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  "&:hover": { backgroundColor: "#1e90ff", color: "white" },
  "&:focus": {
    color: "white",
    outline: "none",
    backgroundColor: "#1e90ff",
  },
  "&:focus:hover": {
    backgroundColor: "#1e90ff",
  },
  "&:blur": {
    backgroundColor: "white", // Return to original color when blurred
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Optional: Reset shadow on blur
  },
};

const FlightSeat = () => {
  const navigate = useNavigate();
  const { setFlightClass } = useBookingPayload();

  const [selectedClass, setSelectedClass] = useState("Economy");
  const [seats, setSeats] = useState(
    Array.from({ length: totalSeatsPerClass * 3 }, (_, i) => ({
      id: i + 1,
      class:
        i < totalSeatsPerClass
          ? "Business"
          : i < totalSeatsPerClass * 2
          ? "First Class"
          : "Economy",
      available: i % 4 !== 0,
      selected: false,
    }))
  );

  const seatRows = useMemo(() => {
    const filteredSeats = seats.filter((seat) => seat.class === selectedClass);
    const rows = [];
    for (let i = 0; i < filteredSeats.length; i += 6) {
      rows.push(filteredSeats.slice(i, i + 6));
    }
    return rows;
  }, [seats, selectedClass]);

  const toggleSeatSelection = (id) => {
    setSeats((prevSeats) =>
      prevSeats.map((seat) =>
        seat.id === id ? { ...seat, selected: !seat.selected } : seat
      )
    );
  };

  const selectedSeats = useMemo(
    () => seats.filter((seat) => seat.selected && seat.class === selectedClass),
    [seats, selectedClass]
  );

  const totalPrice = useMemo(
    () => selectedSeats.length * SEAT_PRICE,
    [selectedSeats]
  );

  const handleNext = () => {
    setFlightClass(selectedClass);
    navigate("/flight-booking");
  };

  const handleClassChange = (event, newClass) => {
    if (newClass !== null) {
      setSelectedClass(newClass);
    }
  };
  const [focusedButton, setFocusedButton] = useState<string | null>(null);

  const handleClassFocus = (value: string) => setFocusedButton(value);
  const handleClassBlur = () => setFocusedButton(null);

  const toggleButtonStyles = (value: string) => ({
    width: "150px",
    backgroundColor:
      selectedClass === value || focusedButton === value ? "#1e90ff" : "white",
    color:
      selectedClass === value || focusedButton === value ? "white" : "black",
    fontSize: "1rem",
    fontWeight: "bold",
    padding: "10px 20px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    transition: "all 0.3s ease",
    "&:hover": { backgroundColor: "#1e90ff", color: "white" },
  });

  return (
    <div>
      <Header />
      <Box bgcolor="rgb(234,234,234)">
        <Box
          display="flex"
          gap="40px"
          sx={{
            margin: "0px 80px 80px",
          }}
        >
          <Box
            sx={{
              marginTop: "40px",
              flexBasis: "60%",
            }}
          >
            <Step />
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                margin: "40px 0",
              }}
            >
              <Button
                onFocus={() => handleClassFocus("Economy")}
                onBlur={handleClassBlur}
                onClick={() => setSelectedClass("Economy")}
                sx={{
                  ...toggleButtonStyles("Economy"),
                  borderRadius: "8px 0px 0px 8px",
                }}
                disableRipple
              >
                Economy
              </Button>
              <Button
                onFocus={() => handleClassFocus("Business")}
                onBlur={handleClassBlur}
                onClick={() => setSelectedClass("Business")}
                sx={{
                  ...toggleButtonStyles("Business"),
                  borderRadius: "0px",
                }}
                disableRipple
              >
                Business
              </Button>
              <Button
                onFocus={() => handleClassFocus("First Class")}
                onBlur={handleClassBlur}
                onClick={() => setSelectedClass("First Class")}
                sx={{
                  ...toggleButtonStyles("First Class"),
                  borderRadius: "0px 8px 8px 0px",
                }}
                disableRipple
              >
                First Class
              </Button>
            </Box>
            <Box
              display="flex"
              justifyContent="space-evenly"
              marginTop="40px"
              bgcolor="pink"
              padding="20px"
            >
              {/* Seat Matrix */}
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                {seatRows.map((row, rowIndex) => (
                  <Box key={rowIndex} sx={{ display: "flex", gap: 1 }}>
                    {row.map((seat) => (
                      <Button
                        key={seat.id}
                        onClick={() =>
                          seat.available && toggleSeatSelection(seat.id)
                        }
                        disableRipple
                        disabled={!seat.available}
                        sx={{
                          width: 50,
                          height: 50,
                          "&:hover": { backgroundColor: "transparent" },
                        }}
                      >
                        <i
                          className="fa-solid fa-loveseat"
                          style={{
                            color: seat.available
                              ? seat.selected
                                ? "#1e90ff"
                                : "#ebeded"
                              : "gray",
                            fontSize: "2rem",
                          }}
                        ></i>
                      </Button>
                    ))}
                  </Box>
                ))}
              </Box>
            </Box>
            <Box
              padding="20px"
              display="flex"
              flexDirection="column"
              gap="10px"
              justifyContent="center"
            >
              <Box
                display="flex"
                alignItems="center"
                gap="10px"
                justifyContent="center"
              >
                <i
                  className="fa-solid fa-loveseat"
                  style={{
                    color: "#1e90ff",
                    fontSize: "2rem",
                  }}
                ></i>
                <Typography fontSize="1.2rem">Seat you selected</Typography>
              </Box>
              <Box
                display="flex"
                alignItems="center"
                gap="10px"
                justifyContent="center"
              >
                <i
                  className="fa-solid fa-loveseat"
                  style={{
                    color: "white",
                    fontSize: "2rem",
                  }}
                ></i>
                <Typography fontSize="1.2rem">
                  Seat have not been booked
                </Typography>
              </Box>
              <Box
                display="flex"
                alignItems="center"
                gap="10px"
                justifyContent="center"
              >
                <i
                  className="fa-solid fa-loveseat"
                  style={{
                    color: "gray",
                    fontSize: "2rem",
                  }}
                ></i>
                <Typography fontSize="1.2rem">Seat have been booked</Typography>
              </Box>
            </Box>
            <Button
              onClick={handleNext}
              fullWidth
              disabled={selectedSeats.length === 0}
              sx={{
                marginTop: "40px",
                backgroundColor: selectedSeats.length > 0 ? "blue" : "gray",
                borderRadius: "8px",
                color: "white",
                "&:disabled": {
                  color: "lightgray",
                },
              }}
            >
              Next
            </Button>
          </Box>

          <Box
            sx={{
              marginTop: "40px",
              flexBasis: "40%",
              minWidth: "250px",
            }}
          >
            <BookingDetail />
            <Box
              sx={{
                backgroundColor: "white",
                borderRadius: "20px",
                padding: "20px",
                color: "black",
                boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
                marginTop: "40px",
              }}
            >
              <Typography variant="h6">Price Summary</Typography>
              <Box
                display="flex"
                justifyContent="space-between"
                marginTop="20px"
              >
                <Typography>Seat x {selectedSeats.length}</Typography>
                <Typography>{totalPrice}$</Typography>
              </Box>
              <Divider sx={{ margin: "20px 0" }} />
              <Box>
                <Box display="flex" justifyContent="space-between">
                  <Typography>Total</Typography>
                  <Typography>{totalPrice}$</Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
      <Footer />
    </div>
  );
};

export default FlightSeat;
