import {
  Box,
  Typography,
  Button,
  Divider,
  Collapse,
  CircularProgress,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Flight } from "types/flight";
import useBookingStore from "hooks/booking-hook";
import { useFlightStore } from "hooks/flight-search-hook";
import ReactLoading from "react-loading";
import useFilterStore from "hooks/flight-fitler-hook";
interface SearchResultProps {
  flights: Flight[];
  loading: boolean;
}

const SearchResult: React.FC<SearchResultProps> = ({
  flights = [],
  loading,
}) => {
  const [expandedDetails, setExpandedDetails] = useState<
    Record<number, boolean>
  >({});
  const { setSelectedFlight } = useFlightStore();
  const { setFlightId } = useBookingStore();
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const navigate = useNavigate();
  console.log("loading", loading);
  const toggleDetails = (id: number) => {
    setExpandedDetails((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleBookNow = (flight: Flight) => {
    if (!flight) {
      return;
    }
    setFlightId(flight.id);
    setSelectedFlight(flight);
    navigate("/flight/seat");
  };
  const selectedPrice = useFilterStore((state) => state.selectedPrice);
  const selectedDepartureTime = useFilterStore((state) => state.selectedDepartureTime);
  const selectedArrivalTime = useFilterStore((state) => state.selectedArrivalTime);
  const isTimeInRange = (time: string, startTime: string, endTime: string): boolean => {
    // Convert times to minutes for easy comparison
    const timeToMinutes = (t: string) => {
      const [hours, minutes] = t.split(':').map(Number);
      return hours * 60 + minutes;
    };

    const timeMinutes = timeToMinutes(time);
    const startMinutes = timeToMinutes(startTime);
    const endMinutes = timeToMinutes(endTime);

    return timeMinutes >= startMinutes && timeMinutes <= endMinutes;
  };
  const filterFlights = (flights: Flight[]) => {
    return flights.filter((flight) => {
      const isPriceValid = selectedPrice === -1 ? true : flight.price <= selectedPrice;
      const isDepartureTimeValid =
        !selectedDepartureTime || selectedDepartureTime === "00:00 - 23:59"
          ? true
          : isTimeInRange(
            flight.departureTime,
            selectedDepartureTime.split("-")[0],
            selectedDepartureTime.split("-")[1]
          );

      const isArrivalTimeValid =
        !selectedArrivalTime || selectedArrivalTime === "00:00 - 23:59"
          ? true
          : isTimeInRange(
            flight.arrivalTime,
            selectedArrivalTime.split("-")[0],
            selectedArrivalTime.split("-")[1]
          );


      return isPriceValid && isDepartureTimeValid && isArrivalTimeValid;
    });
  };
  const filteredFlights = filterFlights(flights);
  console.log("filteredFlights", filteredFlights);
  return (
    <Box>
      {loading ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
          sx={{ marginTop: "40px" }}
        >
          <ReactLoading
            type={"bars"}
            color={"#1e90ff"}
            height={100}
            width={100}
          />
          <Typography variant="h5" color="#1e90ff">
            Please wait while we are loading the flights...
          </Typography>
        </Box>
      ) : flights.length === 0 ? (
        <Typography
          variant="h6"
          textAlign="center"
          color="text.secondary"
          sx={{ marginTop: "40px" }}
        >
          No flights found. Please try a different search.
        </Typography>
      ) : (
        filteredFlights.map((flight) => (
          <Box
            key={flight.id}
            sx={{
              backgroundColor: "#f5f7fa",
              borderRadius: "16px",
              padding: "20px",
              margin: "40px auto",
              display: "flex",
              flexDirection: "column",
              boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Box
              display="flex"
              justifyContent="space-between"
              flexWrap="wrap"
              width="100%"
              sx={{
                "@media (max-width:1250px)": {
                  justifyContent: "center",
                },
              }}
            >
              {/* Flight Details Section */}
              <Box
                display="flex"
                alignItems="center"
                sx={{
                  "@media (max-width:1250px)": {
                    order: 1,
                    width: "100%",
                    justifyContent: "space-evenly",
                    marginBottom: "10px",
                  },
                  "@media (max-width:600px)": {
                    order: 1,
                    width: "100%",
                    alignItems: "center",
                  },
                }}
              >
                <Box textAlign="center" sx={{ minWidth: "80px" }}>
                  <Typography fontSize="1.2rem">
                    <strong>{flight.departureTime}</strong>
                  </Typography>
                  <Typography fontSize="1rem" color="text.secondary">
                    {flight.from}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative",
                    mx: 2,
                  }}
                >
                  <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                  >
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
                      Fly straight
                    </Typography>
                  </Box>
                </Box>

                <Box textAlign="center" sx={{ minWidth: "80px" }}>
                  <Typography fontSize="1.2rem">
                    <strong>{flight.arrivalTime}</strong>
                  </Typography>
                  <Typography fontSize="1rem" color="text.secondary">
                    {flight.to}
                  </Typography>
                </Box>
              </Box>

              {/* Flight Info Section */}
              <Box
                display="flex"
                flexDirection="column"
                justifyContent="center"
                sx={{
                  textAlign: "left",
                  minWidth: "100px",
                  "@media (max-width:1250px)": {
                    order: 2,
                    width: "50%",
                  },
                  "@media (max-width:600px)": {
                    order: 2,
                    width: "100%",
                    alignItems: "center",
                  },
                }}
              >
                <Typography>Remaining seats: {flight.seatsLeft}</Typography>
                <Typography>Flight number: {flight.flightNumber}</Typography>
              </Box>
              {/* Price and Book Now Button Section */}
              <Box
                sx={{
                  textAlign: "center",
                  "@media (max-width:1250px)": {
                    order: 3,
                    width: "50%",
                    textAlign: "right",
                  },
                  "@media (max-width:600px)": {
                    order: 3,
                    width: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: "10px",
                    textAlign: "center",
                  },
                }}
              >
                <Typography fontSize="1rem" sx={{ fontWeight: 500 }}>
                  Price: {flight.price}$
                </Typography>
                <Button
                  onClick={() => {
                    handleBookNow(flight);
                    window.scrollTo(0, 0);
                  }}
                  variant="contained"
                  sx={{
                    marginTop: "10px",
                    backgroundColor: "#1e90ff",
                    color: "white",
                    textTransform: "none",
                    fontSize: "1rem",
                    borderRadius: "8px",
                    padding: "10px 40px",
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                    "&:hover": { backgroundColor: "#2177cb" },
                  }}
                >
                  Book Now
                </Button>
              </Box>
            </Box>

            <Divider sx={{ my: 2 }} />

            <Box display="flex" justifyContent="space-between" width="100%">
              <Typography variant="h6">{flight.flightDate}</Typography>
              <Typography
                fontSize="1.2rem"
                fontWeight="500"
                onClick={() => toggleDetails(flight.id)}
                sx={{ cursor: "pointer", color: "primary.main" }}
              >
                {expandedDetails[flight.id] ? "Less Detail" : "More Detail"}
              </Typography>
            </Box>

            <Collapse
              in={expandedDetails[flight.id]}
              timeout="auto"
              unmountOnExit
            >
              <Box
                display="flex"
                justifyContent="space-evenly"
                sx={{
                  backgroundColor: "#e7f0fc",
                  borderRadius: "12px",
                  padding: "20px",
                  marginTop: "16px",
                }}
              >
                <Box
                  display="flex"
                  flexDirection="column"
                  justifyContent="center"
                  sx={{ textAlign: "left" }}
                >
                  <Typography variant="h6" color="primary">
                    Available seats:
                  </Typography>
                  {(flight.flight_seat_matrix || []).map(([seatClass, availableSeats], index) => (
                    <Typography key={index} fontSize="1rem" color="text.secondary">
                      {seatClass} - {availableSeats}
                    </Typography>
                  ))}
                </Box>
                <Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      borderRadius: "8px",
                      margin: "auto",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        marginRight: "16px",
                      }}
                    >
                      <Box
                        sx={{
                          width: "2px",
                          backgroundColor: "#1e90ff",
                          height: "120px",
                          marginTop: "8px",
                          marginBottom: "8px",
                          marginLeft: "16px",
                        }}
                      />
                    </Box>
                    <Box>
                      <Typography variant="h6" color="primary">
                        {flight.departureDetailTime}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {flight.departureAirport}
                      </Typography>

                      <Box sx={{ my: 2 }} />
                      <Typography variant="h6" color="primary">
                        {flight.arrivalDetailTime}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {flight.arrivalAirport}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Collapse>
          </Box>
        ))
      )}
    </Box>
  );
};

export default SearchResult;
