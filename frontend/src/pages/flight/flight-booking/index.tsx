import { Box, Typography, Divider, TextField } from "@mui/material";
import Header from "components/home-page/Header";
import Footer from "components/home-page/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlane } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

const mockFlightData = [
  {
    flightNumber: "AAB1187",
    boardingTime: "12:00",
    row: "3",
    seat: "10B",
    passengerName: "John Doe",
    from: "New York (JFK)",
    to: "Los Angeles (LAX)",
    date: "2024-12-20",
    ticketClass: "Business",
  },
  {
    flightNumber: "AAB1188",
    boardingTime: "14:00",
    row: "5",
    seat: "12A",
    passengerName: "Jane Smith",
    from: "San Francisco (SFO)",
    to: "Chicago (ORD)",
    date: "2024-12-21",
    ticketClass: "Economy",
  },
  {
    flightNumber: "AAB1189",
    boardingTime: "16:00",
    row: "2",
    seat: "1C",
    passengerName: "Alice Brown",
    from: "Miami (MIA)",
    to: "Houston (IAH)",
    date: "2024-12-22",
    ticketClass: "First Class",
  },
];

const FlightBooking = () => {
  const [flightNumber, setFlightNumber] = useState("");
  const [selectedFlight, setSelectedFlight] = useState<any>(null);

  const handleFlightNumberChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFlightNumber(event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      const flight = mockFlightData.find(
        (flight) => flight.flightNumber === flightNumber
      );
      setSelectedFlight(flight || null);
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      minHeight="100vh"
      bgcolor="rgb(245,245,245)"
    >
      <Header />
      <Box
        sx={{ margin: "100px 80px" }}
        borderRadius="20px"
        boxShadow="0 0 10px 0 rgba(0, 0, 0, 0.4)"
        bgcolor="white"
      >
        <Box
          bgcolor="rgb(19,118,177)"
          borderRadius="20px 20px 0 0 "
          color="white"
          padding="10px 0 10px 100px"
        >
          <Typography fontSize="1.8rem">
            <FontAwesomeIcon icon={faPlane} style={{ marginRight: "8px" }} />
            BOARDING PASS
          </Typography>
        </Box>
        <Divider />
        <Box display="flex">
          <Box
            flex="1"
            sx={{
              padding: " 0",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              display: "flex",
              transform: "rotate(180deg)",
              writingMode: "vertical-lr",
            }}
          >
            <Typography fontSize="2rem">FLIGHT TICKET</Typography>
          </Box>
          <Box flex="6" padding="20px">
            <Box display="flex" justifyContent="space-evenly" height="100%">
              <Box minWidth="250px" display="flex" flexDirection="column">
                <Box>
                  <Typography fontSize="1.2rem" fontWeight="bold">
                    FLIGHT
                  </Typography>
                  <TextField
                    sx={{ maxWidth: "250px", marginTop: "10px" }}
                    value={flightNumber}
                    onChange={handleFlightNumberChange}
                    onKeyDown={handleKeyDown}
                  />
                </Box>
                <Box display="flex" flexDirection="column" marginTop="30%">
                  <Typography fontSize="1.2rem" fontWeight="bold">
                    FROM: {selectedFlight ? selectedFlight.from : ""}
                  </Typography>
                  <Typography
                    fontSize="1.2rem"
                    fontWeight="bold"
                    marginTop="10px"
                  >
                    DATE: {selectedFlight ? selectedFlight.date : ""}
                  </Typography>
                </Box>
              </Box>
              <Box display="flex" flexDirection="column">
                <Box display="flex" gap="80px">
                  <Box>
                    <Typography fontSize="1.2rem" fontWeight="bold">
                      BOARDING TIME
                    </Typography>
                    <Typography
                      fontSize="1.8rem"
                      fontWeight="bold"
                      textAlign="center"
                    >
                      {selectedFlight ? selectedFlight.boardingTime : ""}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography fontSize="1.2rem" fontWeight="bold">
                      ROW
                    </Typography>
                    <Typography
                      fontSize="1.8rem"
                      fontWeight="bold"
                      textAlign="center"
                    >
                      {selectedFlight ? selectedFlight.row : ""}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography fontSize="1.2rem" fontWeight="bold">
                      SEAT
                    </Typography>
                    <Typography fontSize="1.8rem" fontWeight="bold">
                      {selectedFlight ? selectedFlight.seat : ""}
                    </Typography>
                  </Box>
                </Box>
                <Box
                  alignItems="center"
                  justifyContent="center"
                  textAlign="center"
                  marginTop="40px"
                >
                  <FontAwesomeIcon
                    icon={faPlane}
                    style={{
                      fontSize: "10rem",
                      alignItems: "center",
                      justifyContent: "center",
                      textAlign: "center",
                    }}
                  />
                </Box>
              </Box>
            </Box>
            <Box marginTop="80px"></Box>
          </Box>
          <Box
            sx={{
              width: "3px",
              backgroundImage:
                "linear-gradient(to bottom, black 50%, transparent 50%)",
              backgroundSize: "2px 10px",
              backgroundRepeat: "repeat-y",
              margin: "0 16px",
            }}
          />
          <Box
            flex="3"
            padding="20px"
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
            gap="40px"
          >
            <Box
              display="flex"
              gap="10px"
              alignItems="center"
              justifyContent="space-between"
            >
              <Box>
                <Typography fontSize="1.2rem" fontWeight="bold">
                  SEAT
                </Typography>
                <Typography fontSize="1.8rem" fontWeight="bold">
                  {selectedFlight ? selectedFlight.seat : ""}
                </Typography>
              </Box>
              <Typography fontSize="1.8rem" sx={{ opacity: "0.6" }}>
                {selectedFlight ? selectedFlight.ticketClass : ""}
              </Typography>
            </Box>
            <Box display="flex" flexDirection="column" gap="10px">
              <Typography fontSize="1.2rem" fontWeight="bold">
                FROM: {selectedFlight ? selectedFlight.from : ""}
              </Typography>
              <Typography fontSize="1.2rem" fontWeight="bold">
                PASSENGER NAME:{" "}
                {selectedFlight ? selectedFlight.passengerName : ""}
              </Typography>
              <Typography fontSize="1.2rem" fontWeight="bold">
                TO: {selectedFlight ? selectedFlight.to : ""}
              </Typography>
              <Typography fontSize="1.2rem" fontWeight="bold">
                DATE: {selectedFlight ? selectedFlight.date : ""}
              </Typography>
            </Box>
            <Typography
              fontSize="1.5rem"
              textAlign="center"
              sx={{ opacity: "0.6" }}
            >
              FLIGHT TICKET
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box bgcolor="white">
        <Footer />
      </Box>
    </Box>
  );
};

export default FlightBooking;
