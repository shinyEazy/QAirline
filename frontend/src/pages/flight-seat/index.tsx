import { Box, Typography, Button, Divider } from "@mui/material";
import Header from "components/home-page/Header";
import Footer from "components/home-page/Footer";
import Step from "components/flight-booking/Step";
import BookingDetail from "components/flight-booking/BookingDetail";
import { useNavigate } from "react-router-dom";
import { useState, useMemo } from "react";
import useBookingPayload from "hooks/booking-hook";
const SEAT_PRICE = 100;

const FlightSeat = () => {
  const navigate = useNavigate();

  const [seats, setSeats] = useState(
    Array.from({ length: 36 }, (_, i) => ({
      id: i + 1,
      available: i % 4 !== 0,
      selected: false,
    }))
  );

  const seatRows = [];
  for (let i = 0; i < seats.length; i += 6) {
    seatRows.push(seats.slice(i, i + 6));
  }

  const toggleSeatSelection = (id: number) => {
    setSeats((prevSeats) =>
      prevSeats.map((seat) =>
        seat.id === id ? { ...seat, selected: !seat.selected } : seat
      )
    );
  };

  const selectedSeats = useMemo(
    () => seats.filter((seat) => seat.selected),
    [seats]
  );

  const totalPrice = useMemo(
    () => selectedSeats.length * SEAT_PRICE,
    [selectedSeats]
  );
  const { setFlightClass } = useBookingPayload();
  const handleNext = () => {
    setFlightClass("Economy");
    navigate("/flight-booking");
  };
  return (
    <div>
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
                  color: "#ebeded",
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
            <Box display="flex" justifyContent="space-between" marginTop="20px">
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
      <Footer />
    </div>
  );
};

export default FlightSeat;
