import { Box, Typography, Button, Divider, Grid } from "@mui/material";
import Header from "components/home-page/Header";
import Footer from "components/home-page/Footer";
import StepFlightSeat from "components/flight/flight-seat/step-flight-seat";
import FlightRoute from "components/flight/flight-detail/flight-route";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useMemo } from "react";
import useBookingStore from "hooks/booking-hook";
import { fetchFlightSeats } from "hooks/flight-hook";
import {
  defaultPassenger,
  Passenger,
  updatePassengerSeat,
} from "types/passenger";
import Loading from "components/loading";

interface PriceSummary {
  [className: string]: {
    count: number;
    total: number;
  };
}

const SEAT_PRICE = 100;

const FlightSeat = () => {
  const navigate = useNavigate();
  const {
    setNumberOfAdultsAndChildren,
    setPassengers,
    getPayload,
    setFlightClass,
  } = useBookingStore();

  const [matrix, setMatrix] = useState([]);
  const [loading, setLoading] = useState(true);
  const [letters, setLetters] = useState([]);
  const [seats, setSeats] = useState([]);

  // Fetch flight seats on component mount
  useEffect(() => {
    const fetchSeats = async () => {
      try {
        const fetchedMatrix = await fetchFlightSeats(getPayload().flight_id);
        setMatrix(fetchedMatrix);
      } catch (error) {
        console.error("Error fetching flight seats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSeats();
  }, []);

  // Generate letters dynamically based on the number of columns in the first row of the first seat class
  const [selectedClass, setSelectedClass] = useState("Economy");

  useEffect(() => {
    if (matrix.length > 0 && matrix[0].length > 0) {
      const generateLetters = (length) => {
        const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        return Array.from({ length }, (_, i) => alphabet[i % alphabet.length]);
      };
      // const generatedLetters = generateLetters(matrix[1][0].length - 1);
      console.log(matrix[1][1][0].length);
      let generatedLetters;
      if (selectedClass === "Economy") {
        generatedLetters = generateLetters(matrix[0][1][0].length);
      } else if (selectedClass === "Business") {
        generatedLetters = generateLetters(matrix[1][1][0].length);
      } else if (selectedClass === "First Class") {
        generatedLetters = generateLetters(matrix[2][1][0].length);
      }
      setLetters(generatedLetters);
      const seatArray = [];

      for (let i = 0; i < matrix.length; i++) {
        const [seatClass, seatMatrix] = matrix[i];
        const classRows = []; // Holds rows of the current seat class
        for (let row = 0; row < seatMatrix.length; row++) {
          const rowArray = []; // Temporary array for the current row
          for (let col = 0; col < seatMatrix[row].length; col++) {
            rowArray.push({
              id: row + 1 + String.fromCharCode(col + 65) + seatClass[0],
              class: seatClass,
              available: !seatMatrix[row][col], // Use matrix value
              selected: false,
            });
          }
          classRows.push(rowArray); // Add the row to the class-specific rows
        }
        seatArray.push(classRows); // Add the class-specific rows to the main array
      }

      setSeats(seatArray); // 3D array: [ [ [row1], [row2] ], [ [row1], [row2] ] ]
    }
  }, [matrix, selectedClass]);

  const seatRows = useMemo(() => {
    // Flatten and filter only rows belonging to the selected class
    const filteredSeats = seats
      .flat() // Flatten by one level: [ [row1], [row2] ] -> [row1, row2]
      .filter((row) => row[0]?.class === selectedClass); // Ensure the first seat in row matches the class

    return filteredSeats
      .map((row) => {
        // Break rows into chunks of 6 if needed
        const chunks = [];
        for (let i = 0; i < row.length; i += row.length) {
          chunks.push(row.slice(i, i + row.length));
        }
        return chunks;
      })
      .flat(); // Flatten again to keep rows consistent
  }, [seats, selectedClass]);

  const toggleSeatSelection = (id: string) => {
    setSeats((prevSeats) =>
      prevSeats.map((classRows) =>
        classRows.map((row) =>
          row.map((seat) =>
            seat.id === id ? { ...seat, selected: !seat.selected } : seat
          )
        )
      )
    );
  };

  const selectedSeats = useMemo(() => {
    return seats
      .flat(2) // Flatten by two levels to get a flat array of seats
      .filter((seat) => seat.selected);
  }, [seats]);

  const priceSummary = useMemo<PriceSummary>(() => {
    const classPrices = {
      Economy: SEAT_PRICE,
      Business: SEAT_PRICE * 1.5,
      "First Class": SEAT_PRICE * 2,
    };

    return seats
      .flat(2) // Flatten by two levels to get a flat array of seats
      .reduce((acc, seat) => {
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

    let passengers: [Passenger] = [];
    selectedSeats.forEach((seat) => {
      let dummyPassenger = defaultPassenger;

      dummyPassenger = updatePassengerSeat(
        dummyPassenger,
        seat.id.slice(0, -1)
      );
      passengers.push(dummyPassenger);
    });

    setPassengers(passengers);
    setNumberOfAdultsAndChildren(passengers.length, 0);
    navigate("/flight/detail", {
      state: {
        selectedSeats,
      },
    });
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

  if (loading) {
    return <Loading />;
  }

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
                  {letters.slice(0, letters.length / 2).map((label) => (
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
                  {letters
                    .slice(letters.length / 2, letters.length)
                    .map((label) => (
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
                    {row.slice(0, row.length / 2).map((seat) => (
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
                    {row.slice(row.length / 2, row.length).map((seat) => (
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
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <Button
                onClick={() => navigate("/flight/list")}
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
            <FlightRoute />
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
