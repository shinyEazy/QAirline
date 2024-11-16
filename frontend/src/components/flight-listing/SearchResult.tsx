import { Box, Typography, Button, Divider, Collapse } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const SearchResult = () => {
  const [expandedDetails, setExpandedDetails] = useState({});

  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  const navigate = useNavigate();

  const toggleDetails = (id) => {
    setExpandedDetails((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const flights = [
    {
      id: 1,
      departureTime: "07:00",
      arrivalTime: "09:10",
      from: "HAN",
      to: "PQC",
      seatsLeft: 666,
      flightNumber: "VN 7239",
      price: "$240",
      flightDate: "Monday, 14 August",
      flightRoute: "Hà Nội - Đà Nẵng",
      departureDetailTime: "06:00 Hà Nội",
      departureAirport: "Sân bay Nội Bài, Việt Nam",
      arrivalDetailTime: "07:25 Đà Nẵng",
      arrivalAirport: "Sân bay Đà Nẵng, Việt Nam",
      duration: "1 giờ 25 phút",
    },
    {
      id: 2,
      departureTime: "07:00",
      arrivalTime: "09:10",
      from: "HAN",
      to: "PQC",
      seatsLeft: 666,
      flightNumber: "VN 7239",
      price: "$240",
      flightDate: "Monday, 14 August",
      flightRoute: "Hà Nội - Đà Nẵng",
      departureDetailTime: "06:00 Hà Nội",
      departureAirport: "Sân bay Nội Bài, Việt Nam",
      arrivalDetailTime: "07:25 Đà Nẵng",
      arrivalAirport: "Sân bay Đà Nẵng, Việt Nam",
      duration: "1 giờ 25 phút",
    },
    {
      id: 3,
      departureTime: "07:00",
      arrivalTime: "09:10",
      from: "HAN",
      to: "PQC",
      seatsLeft: 666,
      flightNumber: "VN 7239",
      price: "$240",
      flightDate: "Monday, 14 August",
      flightRoute: "Hà Nội - Đà Nẵng",
      departureDetailTime: "06:00 Hà Nội",
      departureAirport: "Sân bay Nội Bài, Việt Nam",
      arrivalDetailTime: "07:25 Đà Nẵng",
      arrivalAirport: "Sân bay Đà Nẵng, Việt Nam",
      duration: "1 giờ 25 phút",
    },
  ];

  return (
    <Box>
      {flights.map((flight) => (
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
          <Box display="flex" justifyContent="space-between" width="100%">
            <Box display="flex" alignItems="center">
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
                    Bay thẳng
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

            <Box
              display="flex"
              flexDirection="column"
              justifyContent="center"
              sx={{ textAlign: "left", minWidth: "100px" }}
            >
              <Typography>Số lượng vé còn lại: {flight.seatsLeft}</Typography>
              <Typography>Số hiệu: {flight.flightNumber}</Typography>
            </Box>

            <Box sx={{ textAlign: "center" }}>
              <Typography fontSize="1rem" sx={{ fontWeight: 500 }}>
                Price: {flight.price}
              </Typography>
              <Button
                onClick={() => {
                  navigate("/flight-booking");
                  window.scrollTo(0, 0);
                }}
                variant="contained"
                color="primary"
                sx={{
                  borderRadi: "8px",
                  textTransform: "none",
                  padding: "6px 16px",
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
              {expandedDetails[flight.id] ? "Hide Detail" : "Flight Detail"}
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
              >
                <Typography variant="h6" color="primary">
                  {flight.flightRoute}
                </Typography>
                <Typography>
                  Khởi hành vào: Thứ Hai, 11 tháng 11, 2024
                </Typography>
                <Typography>Thời gian bay: 2 giờ 10 phút</Typography>
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
                    <Typography>{flight.duration}</Typography>
                    <Box
                      sx={{
                        width: "2px",
                        backgroundColor: "teal",
                        height: "150px",
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
                    <Typography variant="caption" color="text.secondary">
                      Nhà ga 1
                    </Typography>
                    <Box sx={{ my: 2 }} />
                    <Typography variant="h6" color="primary">
                      {flight.arrivalDetailTime}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {flight.arrivalAirport}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Nhà ga 1
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Collapse>
        </Box>
      ))}
    </Box>
  );
};

export default SearchResult;
