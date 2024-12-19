import { Box, Divider, Typography } from "@mui/material";
import { useFlightStore } from "hooks/flight-search-hook";

const FlightRoute = () => {
  const { selectedFlight } = useFlightStore();

  if (!selectedFlight) {
    return <Typography>No flight selected</Typography>;
  }

  return (
    <Box
      sx={{
        backgroundColor: "white",
        borderRadius: "20px",
        padding: "20px",
        color: "black",
        boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Typography variant="h6">Your Booking Detail</Typography>
      <Box display="flex" alignItems="center" marginTop="20px">
        <Box textAlign="center" sx={{ minWidth: "80px" }}>
          <Typography fontSize="1.2rem">
            <strong>{selectedFlight.departureTime}</strong>
          </Typography>
          <Typography fontSize="1rem" color="text.secondary">
            {selectedFlight.departure_airport_code}
          </Typography>
        </Box>

        <Box
          sx={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            mx: 2,
          }}
        >
          <Box display="flex" flexDirection="column" alignItems="center">
            <img
              src="/route-plan.png"
              alt="Route Plan"
              style={{
                width: "100%",
                maxWidth: "150px",
                height: "auto",
              }}
            />
            <Typography fontSize="1rem" color="text.secondary">
              One-way
            </Typography>
          </Box>
        </Box>

        <Box textAlign="center" sx={{ minWidth: "80px" }}>
          <Typography fontSize="1.2rem">
            <strong>{selectedFlight.arrivalTime}</strong>
          </Typography>
          <Typography fontSize="1rem" color="text.secondary">
            {selectedFlight.arrival_airport_code}
          </Typography>
        </Box>
      </Box>
      <Box display="flex" justifyContent="space-between" marginTop="20px">
        <Box>
          <Typography variant="h6">Departure</Typography>
          <Typography>{selectedFlight.flightDate}</Typography>
        </Box>
        <Divider orientation="vertical" flexItem />
        <Box>
          <Typography variant="h6">Arrival</Typography>
          <Typography>{selectedFlight.flightDate}</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default FlightRoute;
