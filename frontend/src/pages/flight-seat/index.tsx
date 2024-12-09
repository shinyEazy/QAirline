import { Box, Typography, Button, Divider, Grid } from "@mui/material";
import Header from "components/home-page/Header";
import Footer from "components/home-page/Footer";
import StepFlightSeat from "components/flight-seat/step-flight-seat.tsx";
import BookingDetail from "components/flight-booking/BookingDetail";
import { useNavigate } from "react-router-dom";
import { useState, useMemo } from "react";
import useBookingPayload from "hooks/booking-hook";

interface PriceSummary {
  [className: string]: {
    count: number;
    total: number;
  };
}

const SEAT_PRICE = 100;
const totalSeatsPerClass = 36;

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

  const priceSummary = useMemo<PriceSummary>(() => {
    const classPrices = {
      Economy: SEAT_PRICE,
      Business: SEAT_PRICE * 1.5,
      "First Class": SEAT_PRICE * 2,
    };

    return seats.reduce((acc, seat) => {
      if (seat.selected) {
        if (!acc[seat.class]) acc[seat.class] = { count: 0, total: 0 };
        acc[seat.class].count += 1;
        acc[seat.class].total +=
          classPrices[seat.class as keyof typeof classPrices];
      }
      return acc;
    }, {} as PriceSummary);
  }, [seats]);

  const handleNext = () => {
    setFlightClass(selectedClass);
    navigate("/flight-booking");
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
            margin: "0px 80px 0px",
          }}
        >
          <Box
            sx={{
              marginTop: "40px",
              flexBasis: "70%",
            }}
          >
            <StepFlightSeat />
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
              justifyContent="center"
              flexDirection="column"
              marginTop="40px"
              bgcolor="white"
              padding="40px"
              borderRadius="20px"
              boxShadow="0px 4px 20px rgba(0, 0, 0, 0.1)"
            >
              {/* Seat Matrix */}
              <Box display="flex" flexDirection="column" gap={2}>
                <Grid container spacing={2} justifyContent="center">
                  <Grid item xs={1} />
                  {["A", "B", "C"].map((label) => (
                    <Grid
                      item
                      key={label}
                      xs={1}
                      display="flex"
                      justifyContent="center"
                    >
                      <Typography fontWeight="bold" fontSize="1.5rem">
                        {label}
                      </Typography>
                    </Grid>
                  ))}
                  <Grid item xs={1} />
                  {["D", "E", "F"].map((label) => (
                    <Grid
                      item
                      key={label}
                      xs={1}
                      display="flex"
                      justifyContent="center"
                    >
                      <Typography fontWeight="bold" fontSize="1.5rem">
                        {label}
                      </Typography>
                    </Grid>
                  ))}
                </Grid>
                {seatRows.map((row, rowIndex) => (
                  <Grid
                    container
                    spacing={1}
                    key={rowIndex}
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Grid item xs={1} display="flex" justifyContent="center">
                      <Typography fontWeight="bold" fontSize="1.5rem">
                        {rowIndex + 1}
                      </Typography>
                    </Grid>
                    {row.slice(0, 3).map((seat) => (
                      <Grid
                        item
                        key={seat.id}
                        xs={1}
                        display="flex"
                        justifyContent="center"
                      >
                        <Button
                          disableRipple
                          disabled={!seat.available}
                          sx={{
                            width: 50,
                            height: 50,
                            "&:hover": {
                              backgroundColor: "transparent",
                              cursor: "default",
                            },
                          }}
                        >
                          <i
                            onClick={() =>
                              seat.available && toggleSeatSelection(seat.id)
                            }
                            className="fa-solid fa-loveseat"
                            style={{
                              color: seat.available
                                ? seat.selected
                                  ? "#1e90ff"
                                  : "#d3d3d3"
                                : "#808080",
                              fontSize: "2rem",
                              cursor: "pointer",
                            }}
                          ></i>
                        </Button>
                      </Grid>
                    ))}
                    <Grid item xs={1} />
                    {row.slice(3, 6).map((seat) => (
                      <Grid
                        item
                        key={seat.id}
                        xs={1}
                        display="flex"
                        justifyContent="center"
                      >
                        <Button
                          disableRipple
                          disabled={!seat.available}
                          sx={{
                            width: 50,
                            height: 50,
                            "&:hover": {
                              backgroundColor: "transparent",
                              cursor: "default",
                            },
                          }}
                        >
                          <i
                            onClick={() =>
                              seat.available && toggleSeatSelection(seat.id)
                            }
                            className="fa-solid fa-loveseat"
                            style={{
                              color: seat.available
                                ? seat.selected
                                  ? "#1e90ff"
                                  : "#d3d3d3"
                                : "#808080",
                              fontSize: "2rem",
                              cursor: "pointer",
                            }}
                          ></i>
                        </Button>
                      </Grid>
                    ))}
                  </Grid>
                ))}
              </Box>
              <Box marginTop="40px">
                <Box
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
                    <Typography fontSize="1.2rem">
                      Seats you've selected
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
                        color: "#d3d3d3",
                        fontSize: "2rem",
                      }}
                    ></i>
                    <Typography fontSize="1.2rem">
                      Seats have not been booked
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
                    <Typography fontSize="1.2rem">
                      Seats have been booked
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                width: "100%",
              }}
            >
              <Button
                onClick={handleNext}
                fullWidth
                disabled={selectedSeats.length === 0}
                sx={{
                  marginTop: "40px",
                  marginBottom: "40px",
                  backgroundColor:
                    selectedSeats.length > 0 ? "#1e90ff" : "#d3d3d3",
                  borderRadius: "8px",
                  color: selectedSeats.length > 0 ? "white" : "black",
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
      <Footer />
    </div>
  );
};

export default FlightSeat;
