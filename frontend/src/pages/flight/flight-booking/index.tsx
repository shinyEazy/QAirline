import {
  Box,
  Typography,
  Divider,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  InputAdornment,
  IconButton,
} from "@mui/material";
import Header from "components/home-page/Header";
import Footer from "components/home-page/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlane } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";

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
    paymentStatus: "Paid",
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
    paymentStatus: "Unpaid",
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
    paymentStatus: "Paid",
  },
];

const FlightBooking = () => {
  const [flightNumber, setFlightNumber] = useState("");
  const [selectedFlight, setSelectedFlight] = useState<any>(null);
  const [openDialog, setOpenDialog] = useState(false);

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

  const handleCancelClick = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = (confirm: boolean) => {
    setOpenDialog(false);
    if (confirm) {
      // Logic to cancel the ticket
      console.log("Ticket has been canceled.");
      setSelectedFlight(null);
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
        sx={{
          margin: "100px 80px",
          backgroundImage:
            "url('https://freesvg.org/img/shokunin_World_Map.png')", // Correct syntax for background image
          backgroundPosition: "center",
          opacity: 0.8, // Adjust opacity here
        }}
        borderRadius="20px"
        boxShadow="0 0 10px 0 rgba(0, 0, 0, 0.4)"
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
            <Typography fontSize="2rem" sx={{ letterSpacing: "0.3rem" }}>
              FLIGHT TICKET
            </Typography>
          </Box>
          <Box flex="6" padding="20px">
            <Box display="flex" justifyContent="space-between" height="100%">
              <Box
                minWidth="250px"
                display="flex"
                flexDirection="column"
                justifyContent="space-between"
              >
                <Box display="flex" flexDirection="column">
                  <Typography fontSize="1.2rem" fontWeight="bold">
                    FLIGHT
                  </Typography>
                  <TextField
                    sx={{ maxWidth: "250px", marginTop: "10px" }}
                    value={flightNumber}
                    onChange={handleFlightNumberChange}
                    onKeyDown={handleKeyDown}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => {
                              const flight = mockFlightData.find(
                                (flight) => flight.flightNumber === flightNumber
                              );
                              setSelectedFlight(flight || null);
                            }}
                          >
                            <SearchIcon />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Box>
                <Box display="flex" flexDirection="column">
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
                <Box display="flex">
                  <Typography
                    fontSize="1.2rem"
                    fontWeight="bold"
                    display="flex"
                    alignItems="center"
                    gap="10px"
                  >
                    PAYMENT STATUS:{" "}
                    <span
                      style={{
                        color:
                          selectedFlight?.paymentStatus === "Paid"
                            ? "green"
                            : "red",
                      }}
                    >
                      {selectedFlight ? selectedFlight.paymentStatus : ""}
                    </span>
                    {selectedFlight &&
                      selectedFlight.paymentStatus !== "Paid" && (
                        <Button
                          variant="contained"
                          color="primary"
                          size="small"
                          onClick={() => {
                            const updatedFlight = {
                              ...selectedFlight,
                              paymentStatus: "Paid",
                            };
                            setSelectedFlight(updatedFlight);
                            // Optional: Update the mockFlightData if needed
                            const flightIndex = mockFlightData.findIndex(
                              (flight) =>
                                flight.flightNumber ===
                                selectedFlight.flightNumber
                            );
                            if (flightIndex !== -1) {
                              mockFlightData[flightIndex] = updatedFlight;
                            }
                          }}
                        >
                          Pay Now
                        </Button>
                      )}
                  </Typography>
                </Box>
              </Box>
              <Box
                display="flex"
                flexDirection="column"
                justifyContent="space-between"
              >
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
                >
                  <FontAwesomeIcon
                    icon={faPlane}
                    style={{
                      fontSize: "8rem",
                      alignItems: "center",
                      justifyContent: "center",
                      textAlign: "center",
                    }}
                  />
                </Box>
                <Button
                  variant="contained"
                  color="error"
                  onClick={handleCancelClick}
                  sx={{
                    padding: "4px 10px",
                    visibility: selectedFlight ? "visible" : "hidden",
                  }}
                >
                  Cancel Ticket
                </Button>
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
              sx={{ opacity: "0.6", letterSpacing: "0.5rem" }}
            >
              FLIGHT TICKET
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box bgcolor="white">
        <Footer />
      </Box>
      <Dialog
        open={openDialog}
        onClose={() => handleDialogClose(false)}
        aria-labelledby="confirm-dialog-title"
        aria-describedby="confirm-dialog-description"
      >
        <DialogTitle id="confirm-dialog-title">Cancel Ticket</DialogTitle>
        <DialogContent>
          <DialogContentText id="confirm-dialog-description">
            Are you sure you want to cancel this ticket? This action cannot be
            undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleDialogClose(false)} color="primary">
            No
          </Button>
          <Button onClick={() => handleDialogClose(true)} color="error">
            Yes, Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default FlightBooking;
