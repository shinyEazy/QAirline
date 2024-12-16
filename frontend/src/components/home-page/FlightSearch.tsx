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
  Select,
  MenuItem,
} from "@mui/material";
import DatePicker from "react-datepicker";
import { useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightArrowLeft } from "@fortawesome/free-solid-svg-icons";
import "react-datepicker/dist/react-datepicker.css";
import "./css/DatePickerStyles.css";
import "./css/test.css";
import { Flight } from "types/flight";
import { useFlightSearchStore } from "hooks/flight-search-hook";
import { fetchAirport } from "hooks/airport-hook";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const FlightSearch: React.FC = () => {
  const navigate = useNavigate();
  const [airports, setAirports] = useState<
    { airport_id: number; city: string; airport_code: string }[]
  >([]);

  useEffect(() => {
    const fetchInitialAirports = async () => {
      try {
        const data = await fetchAirport();
        setAirports(data);
      } catch (error) {
        console.error("Failed to fetch airports:", error);
      }
    };

    fetchInitialAirports();
  }, []);

  // useEffect(() => {
  //   window.scrollTo(0, 0);
  // }, [location]);

  const {
    departureCity,
    arrivalCity,
    departing,
    returning,
    tripType,
    showReturnDate,
    isRoundTrip,
    setDepartureCity,
    setArrivalCity,
    setDeparting,
    setReturning,
    setShowReturnDate,
    setIsRoundTrip,
    setTripType,
    setFlights,
    loading,
    setLoading,
  } = useFlightSearchStore();

  const options = airports.map((airport) => ({
    value: airport.city,
    label: `${airport.city} (${airport.airport_code})`,
  }));

  const handleChange = (selectedOption) => {
    setDepartureCity(selectedOption ? selectedOption.value : "");
  };

  useEffect(() => {
    if (tripType === "roundtrip") {
      setShowReturnDate(true);
    } else {
      setShowReturnDate(false);
    }
  }, [tripType]);

  const handleSearch = async () => {
    setLoading(true);

    toast.dismiss();

    const searchParams = new URLSearchParams({
      departure_city: departureCity,
      arrival_city: arrivalCity,
      departure_time: departing.toISOString().split("T")[0],
    });

    if (departureCity === "" || arrivalCity === "") {
      toast.error("Please select departure and arrival cities");
      setLoading(false);
      return;
    }

    if (tripType === "roundtrip") {
      searchParams.append("return_date", returning.toISOString().split("T")[0]);
    }

    try {
      const response = await fetch(
        `http://localhost:8000/api/flights/search/?${searchParams.toString()}`
      );

      if (response.status === 200) {
        const data = await response.json();
        setFlights(data);
        navigate(`/flight/list?${searchParams.toString()}`);
        toast.success("Flights fetched successfully!");
      } else {
        setFlights([]);
        navigate(`/flight/list`);
        toast.info("No flights found for your search criteria.");
      }
    } catch (error) {
      console.error("Error fetching flights:", error);
      toast.error("An unexpected error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        borderRadius: "20px",
        margin: "40px 80px",
        "@media (max-width:1000px)": {
          margin: "40px 20px 20px",
        },
      }}
    >
      <Box bgcolor="#1e9faf" borderRadius="16px">
        {/* Trip Type */}
        <FormControl fullWidth sx={{ padding: "20px" }}>
          <RadioGroup
            row
            defaultValue="roundtrip"
            sx={{
              justifyContent: "flex-start",
              marginLeft: "12px",
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
              "@media (max-width:1000px)": {
                flexDirection: "column",
                gap: "20px",
              },
            }}
          >
            <Box
              flex={1}
              display="flex"
              alignItems="center"
              gap="20px"
              sx={{
                "@media (max-width:1000px)": {
                  width: "100%",
                },
              }}
            >
              <Box flex={1}>
                <Typography
                  sx={{
                    color: "rgba(0, 0, 0, 0.6)",
                    marginBottom: "10px",
                  }}
                >
                  From
                </Typography>
                <Select
                  labelId="departure-label"
                  id="departure"
                  value={departureCity}
                  onChange={(e) => setDepartureCity(e.target.value)}
                  displayEmpty
                  MenuProps={{
                    PaperProps: {
                      sx: {
                        maxHeight: 200,
                        overflow: "auto",
                        "&::-webkit-scrollbar": {
                          width: "8px",
                          height: "8px",
                        },
                        "&::-webkit-scrollbar-track": {
                          background: "#f0f0f0",
                          borderRadius: "8px",
                        },
                        "&::-webkit-scrollbar-thumb": {
                          background: "#888",
                          borderRadius: "8px",
                        },
                        "&::-webkit-scrollbar-thumb:hover": {
                          background: "#555",
                        },
                        "&::-webkit-scrollbar-corner": {
                          background: "#f0f0f0",
                        },
                      },
                    },
                  }}
                  sx={{
                    width: "100%",
                    minHeight: "40px",
                    marginBottom: "0",
                    marginTop: "0",
                    fontSize: "1rem",
                    border: "none",
                    backgroundColor: "transparent",
                    boxShadow: "none",
                    "& .MuiOutlinedInput-root": {
                      border: "none",
                    },
                    "& .MuiOutlinedInput-notchedOutline": {
                      border: "none",
                    },
                    "&:focus": {
                      border: "none",
                    },
                  }}
                >
                  <MenuItem value="" disabled>
                    Select city
                  </MenuItem>
                  {airports.map((airport) => (
                    <MenuItem
                      key={airport.airport_id}
                      value={airport.city}
                      sx={{
                        "&:hover": {
                          backgroundColor: "#1e90ff",
                          color: "#fff",
                        },
                        "&.Mui-selected": {
                          backgroundColor: "#1e90ff",
                          color: "#fff",
                        },
                        "&.Mui-selected:hover": {
                          backgroundColor: "#1e90ff",
                          color: "#fff",
                        },
                      }}
                    >
                      {`${airport.city} (${airport.airport_code})`}
                    </MenuItem>
                  ))}
                </Select>
              </Box>
              <FontAwesomeIcon
                icon={faArrowRightArrowLeft}
                style={{
                  color: "white",
                  fontSize: "1rem",
                  border: "1px solid #1e90ff",
                  borderRadius: "50%",
                  padding: "8px",
                  backgroundColor: "#1e90ff",
                  transition: "all 0.3s ease-in-out",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#2177cb";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#1e90ff";
                }}
              />
              <Box flex={1}>
                <Typography
                  sx={{
                    color: "rgba(0, 0, 0, 0.6)",
                    marginBottom: "10px",
                  }}
                >
                  To
                </Typography>
                <Select
                  labelId="arrival-label"
                  id="departure"
                  value={arrivalCity || ""}
                  onChange={(e) => setArrivalCity(e.target.value)}
                  displayEmpty
                  MenuProps={{
                    PaperProps: {
                      sx: {
                        maxHeight: 200,
                        overflowY: "auto",
                        "&::-webkit-scrollbar": {
                          width: "8px",
                          height: "8px",
                        },
                        "&::-webkit-scrollbar-track": {
                          background: "#f0f0f0",
                          borderRadius: "8px",
                        },
                        "&::-webkit-scrollbar-thumb": {
                          background: "#888",
                          borderRadius: "8px",
                        },
                        "&::-webkit-scrollbar-thumb:hover": {
                          background: "#555",
                        },
                        "&::-webkit-scrollbar-corner": {
                          background: "#f0f0f0",
                        },
                      },
                    },
                  }}
                  sx={{
                    width: "100%",
                    height: "40px",
                    marginBottom: "0",
                    marginTop: "0",
                    fontSize: "1rem",
                    border: "none",
                    backgroundColor: "transparent",
                    boxShadow: "none",
                    "& .MuiOutlinedInput-root": {
                      border: "none",
                    },
                    "& .MuiOutlinedInput-notchedOutline": {
                      border: "none",
                    },
                    "&:focus": {
                      border: "none",
                    },
                  }}
                >
                  <MenuItem value="" disabled>
                    Select city
                  </MenuItem>
                  {airports.map((airport) => (
                    <MenuItem
                      key={airport.airport_id}
                      value={airport.city}
                      sx={{
                        "&:hover": {
                          backgroundColor: "#1e90ff",
                          color: "#fff",
                        },
                        "&.Mui-selected": {
                          backgroundColor: "#1e90ff",
                          color: "#fff",
                        },
                        "&.Mui-selected:hover": {
                          backgroundColor: "#1e90ff",
                          color: "#fff",
                        },
                      }}
                    >
                      {`${airport.city} (${airport.airport_code})`}
                    </MenuItem>
                  ))}
                </Select>
              </Box>
            </Box>
            <Divider
              orientation="vertical"
              flexItem
              sx={{ mx: 2, backgroundColor: "rgba(0, 0, 0, 0.2)" }}
            />
            <Box
              flex={1}
              display="flex"
              sx={{
                "@media (max-width:1350px)": {
                  gap: "20px",
                },
                "@media (max-width:1000px)": {
                  width: "100%",
                },
              }}
            >
              <Box flex={1} sx={{}}>
                <Typography
                  sx={{
                    color: "rgba(0, 0, 0, 0.6)",
                    marginBottom: "10px",
                  }}
                >
                  Departure Date
                </Typography>
                <Box flex={1}>
                  <DatePicker
                    selected={departing}
                    onChange={(date) => {
                      if (date) setDeparting(date);
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
                          width: "100%",
                          "& .MuiInput-root": {
                            fontSize: "1.3rem",
                            borderRadius: "10px",
                            backgroundColor: "transparent",
                          },
                          "@media (max-width:1000px)": {},
                        }}
                      />
                    }
                    wrapperClassName="datepicker-custom"
                  />
                  <style>
                    {`
  .datepicker-custom {
    display: block !important;
    width: 100% !important;
  }
`}
                  </style>
                </Box>
              </Box>
              <FontAwesomeIcon
                icon={faArrowRightArrowLeft}
                visibility="hidden"
                style={{
                  fontSize: "1rem",
                  border: "1px solid #1e90ff",
                  borderRadius: "50%",
                  padding: "8px",
                }}
              />
              <Box flex={1} sx={{}}>
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
                        if (date) setReturning(date);
                      }}
                      dateFormat="MMM d, yyyy"
                      customInput={
                        <TextField
                          fullWidth
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
                      wrapperClassName="datepicker-custom"
                    />
                    <style>
                      {`
  .datepicker-custom {
    display: block !important;
    width: 100% !important;
  }
`}
                    </style>
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
