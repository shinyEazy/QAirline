import { useState, useEffect } from "react";
import {
  Box,
  Button,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField,
  Typography,
  Divider,
  Checkbox,
} from "@mui/material";
import DatePicker from "react-datepicker";
import { useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightArrowLeft } from "@fortawesome/free-solid-svg-icons";
import "react-datepicker/dist/react-datepicker.css";
import "./css/DatePickerStyles.css";
import { Flight } from "types/flight";
interface FlightSearchProps {
  setFlights: React.Dispatch<React.SetStateAction<Flight[]>>;
}
const FlightSearch: React.FC<FlightSearchProps> = ({ setFlights }) => {
  const [departureCity, setDepartureCity] = useState("");
  const [arrivalCity, setArrivalCity] = useState("");
  const [departing, setDeparting] = useState(new Date());
  const [returning, setReturning] = useState(() => {
    const today = new Date();
    today.setDate(today.getDate() + 2);
    return today;
  });
  const [showReturnDate, setShowReturnDate] = useState(false);
  const [tripType, setTripType] = useState("oneway");
  const [isRoundTrip, setIsRoundTrip] = useState(false);
  const location = useLocation();
  const naviagate = useNavigate();

  // useEffect(() => {
  //   window.scrollTo(0, 0);
  // }, [location]);

  useEffect(() => {
    if (tripType === "roundtrip") {
      setShowReturnDate(true);
    } else {
      setShowReturnDate(false);
    }
  }, [tripType]);
  const handleSearch = async () => {
    const searchParams = new URLSearchParams({
      departure_city: departureCity,
      arrival_city: arrivalCity,
      departure_time: departing.toISOString().split("T")[0],
    });

    if (tripType === "roundtrip") {
      searchParams.append("return_date", returning.toISOString().split("T")[0]);
    }
    fetch(`http://localhost:8000/api/flights/search/?${searchParams.toString()}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Data:", data);
        setFlights(data);
      })
      .catch((error) => {
        console.error("Error fetching flights:", error);
      });
    // naviagate('/flight-listing?${searchParams.toString()}');
  };
  return (
    <Box
      sx={{
        borderRadius: "20px",
        margin: "40px 80px",
      }}
    >
      <Box bgcolor="#1e90ff" borderRadius="16px">
        {/* Trip Type */}
        <FormControl fullWidth sx={{ padding: "20px" }}>
          <RadioGroup
            row
            defaultValue="roundtrip"
            sx={{
              justifyContent: "flex-start",
              marginLeft: "12px",
              "@media (max-width:800px)": {
                flexDirection: "column",
                gap: "10px", // Adjust spacing for stacked layout
              },
            }}
          >
            <FormControlLabel
              value="oneway"
              control={
                <Radio
                  sx={{
                    display: "none",
                  }}
                />
              }
              label={
                <Box
                  onClick={() => {
                    setTripType("oneway");
                    setIsRoundTrip(false);
                  }}
                  sx={{
                    color: "white",
                    textTransform: "none",
                    fontSize: "1rem",
                    border:
                      tripType === "oneway"
                        ? "1px solid white"
                        : "1px solid transparent",
                    fontWeight: "bold",
                    borderRadius: "8px",
                    marginRight: "10px",
                    padding: "10px 40px",
                    "&:hover": { border: "1px solid white" },
                  }}
                >
                  One-way
                </Box>
              }
            />
            <FormControlLabel
              value="roundtrip"
              control={<Radio sx={{ display: "none" }} />}
              label={
                <Box
                  onClick={() => {
                    setTripType("roundtrip");
                    setIsRoundTrip(true);
                  }}
                  sx={{
                    color: "white",
                    textTransform: "none",
                    fontSize: "1rem",
                    fontWeight: "bold",
                    borderRadius: "8px",
                    padding: "10px 40px",
                    border:
                      tripType === "roundtrip"
                        ? "1px solid white"
                        : "1px solid transparent",
                    "&:hover": { border: "1px solid white", cursor: "pointer" },
                  }}
                >
                  Round-trip
                </Box>
              }
            />
          </RadioGroup>
        </FormControl>
        {/* Input Fields */}
        <Box
          gap="10px"
          bgcolor="white"
          borderRadius="0 0 12px 12px"
          sx={{ padding: "20px 40px" }}
          color="#1e90ff"
        >
          <Box
            display="flex"
            gap="10px"
            alignItems="center"
            flexWrap="wrap"
            sx={{
              flexDirection: {
                xs: "column", // Extra small screens
                md: "row", // Medium screens (default row for larger screens)
              },
              "@media (max-width:1000px)": {
                flexDirection: "column",
                gap: "20px", // Adjust spacing for stacked layout
              },
              "@media (max-width:800px)": {
                flexDirection: "column",
                gap: "0",
              },
            }}
          >
            <Box
              width="100%"
              flex={1}
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              margin="20px 0"
              gap="20px"
              sx={{
                "@media (max-width:800px)": {
                  flexDirection: "column",
                  gap: "10px",
                },
              }}
            >
              <Box>
                <Typography
                  sx={{
                    color: "rgba(0, 0, 0, 0.6)",
                    marginBottom: "10px",
                  }}
                >
                  From
                </Typography>
                <TextField
                  fullWidth
                  value={departureCity}
                  onChange={(e) => setDepartureCity(e.target.value)}
                  variant="standard"
                  InputProps={{
                    disableUnderline: false,
                    style: {
                      backgroundColor: "transparent",
                    },
                  }}
                  sx={{
                    "& .MuiInput-root": {
                      fontSize: "1.3rem",
                      borderRadius: "10px",
                      backgroundColor: "transparent",
                    },
                  }}
                />
              </Box>
              <FontAwesomeIcon
                icon={faArrowRightArrowLeft}
                style={{
                  color: "rgba(0, 0, 0, 0.6)",
                  fontSize: "0.8rem",
                  border: "1px solid rgba(0, 0, 0, 0.6)",
                  borderRadius: "50%",
                  padding: "4px",
                }}
              />
              <Box>
                <Typography
                  sx={{
                    color: "rgba(0, 0, 0, 0.6)",
                    marginBottom: "10px",
                  }}
                >
                  To
                </Typography>
                <TextField
                  fullWidth
                  value={arrivalCity}
                  onChange={(e) => setArrivalCity(e.target.value)}
                  variant="standard"
                  InputProps={{
                    disableUnderline: false,
                    style: {
                      backgroundColor: "transparent",
                    },
                  }}
                  sx={{
                    "& .MuiInput-root": {
                      fontSize: "1.3rem",
                      borderRadius: "10px",
                      backgroundColor: "transparent",
                    },
                  }}
                />
              </Box>
            </Box>
            <Divider
              orientation="vertical"
              flexItem
              sx={{ mx: 2, backgroundColor: "rgba(0, 0, 0, 0.2)" }}
            />
            <Box
              width="100%"
              flex={1}
              display="flex"
              justifyContent="space-between"
              sx={{
                "@media (max-width:1350px)": {
                  gap: "60px",
                },
                "@media (max-width:800px)": {
                  flexDirection: "column",
                  gap: "20px",
                  justifyContent: "center",
                  alignItems: "center",
                },
              }}
            >
              <Box
                sx={{
                  "@media (min-width:1400px)": {
                    gap: "60px",
                    flex: "1",
                  },
                  "@media (max-width:1350px)": {
                    gap: "20px",
                  },
                }}
              >
                <Typography
                  sx={{
                    color: "rgba(0, 0, 0, 0.6)",
                    marginBottom: "10px",
                  }}
                >
                  Departure Date
                </Typography>
                <DatePicker
                  selected={departing}
                  onChange={(date) => {
                    if (date) setDeparting(date); // Chỉ cập nhật nếu `date` không phải null
                  }}
                  dateFormat="MMM d, yyyy"
                  customInput={
                    <TextField
                      variant="standard"
                      InputProps={{
                        disableUnderline: false,
                        style: {
                          backgroundColor: "transparent",
                        },
                      }}
                      sx={{
                        "& .MuiInput-root": {
                          fontSize: "1.3rem",
                          borderRadius: "10px",
                          backgroundColor: "transparent",
                        },
                      }}
                    />
                  }
                />
              </Box>

              <Box
                sx={{
                  "@media (min-width:1400px)": {
                    gap: "60px",
                    flex: "1",
                  },
                }}
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={showReturnDate}
                      onChange={(e) => setShowReturnDate(e.target.checked)}
                      disableRipple
                      disabled={isRoundTrip}
                      sx={{
                        color: "#1e90ff",
                        "&.Mui-checked": {
                          color: "#1e90ff",
                        },
                        "& .MuiSvgIcon-root": {
                          fontSize: 1,
                          borderRadius: "4px",
                        },
                      }}
                      icon={
                        <Box
                          sx={{
                            width: 16,
                            height: 16,
                            border: "2px solid rgba(0, 0, 0, 0.4)",
                            borderRadius: "4px",
                            backgroundColor: "white",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "start",
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="rgba(0, 0, 0, 0.4)"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            width="16"
                            height="16"
                          >
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        </Box>
                      }
                      checkedIcon={
                        <Box
                          sx={{
                            width: 16,
                            height: 16,
                            border: "2px solid #1e90ff",
                            borderRadius: "4px",
                            backgroundColor: "#1e90ff",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="white"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            width="16"
                            height="16"
                          >
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        </Box>
                      }
                    />
                  }
                  label="Return date"
                  sx={{
                    position: "relative",
                    top: "-5px",
                    color: "rgba(0, 0, 0, 0.6)",
                  }}
                />

                {showReturnDate && (
                  <Box>
                    <DatePicker
                      selected={returning}
                      onChange={(date) => {
                        if (date) setReturning(date)
                      }}
                      dateFormat="MMM d, yyyy"
                      customInput={
                        <TextField
                          variant="standard"
                          InputProps={{
                            disableUnderline: false,
                            style: {
                              backgroundColor: "transparent",
                            },
                          }}
                          sx={{
                            "& .MuiInput-root": {
                              fontSize: "1.3rem",
                              borderRadius: "10px",
                              backgroundColor: "transparent",
                            },
                          }}
                        />
                      }
                    />
                  </Box>
                )}
              </Box>
            </Box>
          </Box>
          {/* Search Button */}
          <Box display="flex" justifyContent="center">
            <Button
              sx={{
                width: "40%",
                backgroundColor: "#1e90ff",
                color: "white",
                textTransform: "none",
                fontSize: "1rem",
                fontWeight: "bold",
                borderRadius: "8px",
                padding: "10px 20px",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                transform: "translateY(40px)",
                "&:hover": { backgroundColor: "#2177cb" },
              }}
              onClick={handleSearch}
            >
              Search
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default FlightSearch;
