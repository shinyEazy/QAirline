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
} from "@mui/material";
import DatePicker from "react-datepicker";
import { useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightArrowLeft,
  faPlane,
  faHotel,
  faHotTubPerson,
} from "@fortawesome/free-solid-svg-icons";
import "react-datepicker/dist/react-datepicker.css";
import "./css/DatePickerStyles.css";

const FlightSearch = () => {
  const location = useLocation();
  // useEffect(() => {
  //   window.scrollTo(0, 0);
  // }, [location]);

  const navigate = useNavigate();
  const [departing, setDeparting] = useState(new Date());
  const [returning, setReturning] = useState(() => {
    const today = new Date();
    today.setDate(today.getDate() + 2);
    return today;
  });

  return (
    <Box
      sx={{
        maxWidth: "1200px",
        padding: "20px",
        borderRadius: "20px",
        margin: "40px auto",
      }}
    >
      {/* Header Section */}
      <Box padding="20px" display="flex" justifyContent="flex-start">
        <Button
          sx={{
            backgroundColor: "#1e90ff",
            color: "white",
            textTransform: "none",
            fontSize: "1rem",
            fontWeight: "bold",
            borderRadius: "8px",
            marginRight: "20px",
            padding: "10px 20px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            "&:hover": { backgroundColor: "#2177cb" },
          }}
        >
          <FontAwesomeIcon icon={faPlane} style={{ marginRight: "5px" }} />
          Flight
        </Button>
        <Button
          sx={{
            backgroundColor: "white",
            color: "#1e90ff",
            textTransform: "none",
            fontSize: "1rem",
            fontWeight: "bold",
            borderRadius: "8px",
            marginRight: "20px",
            padding: "10px 40px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            "&:hover": { backgroundColor: "#1e90ff", color: "white" },
          }}
        >
          <FontAwesomeIcon icon={faHotel} style={{ marginRight: "5px" }} />
          Hotel
        </Button>
      </Box>

      <Box bgcolor="#1e90ff" borderRadius="16px">
        {/* Trip Type */}
        <FormControl fullWidth sx={{ padding: "20px" }}>
          <RadioGroup
            row
            defaultValue="roundtrip"
            sx={{ justifyContent: "flex-start", marginLeft: "12px" }}
          >
            <FormControlLabel
              value="oneway"
              control={<Radio sx={{ display: "none" }} />}
              label={
                <Box
                  sx={{
                    color: "white",
                    textTransform: "none",
                    fontSize: "1rem",
                    fontWeight: "bold",
                    borderRadius: "8px",
                    marginRight: "10px",
                    padding: "10px 40px",
                    border: "1px solid white",
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
                  sx={{
                    color: "white",
                    textTransform: "none",
                    fontSize: "1rem",
                    fontWeight: "bold",
                    borderRadius: "8px",
                    padding: "10px 40px",
                    border: "1px solid transparent",
                    "&:hover": { border: "1px solid white" },
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
          <Box display="flex" gap="10px" alignItems="center">
            <Box
              flex={1}
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              margin="20px 0"
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
                  defaultValue="Hanoi, Vietnam"
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
                  padding: "10px",
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
                  defaultValue="Ho Chi Minh, Vietnam"
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
              flexItem // Ensures the Divider spans the height of the parent flex container
              sx={{ mx: 2, backgroundColor: "rgba(0, 0, 0, 0.2)" }} // Adjusts margin and color
            />
            <Box flex={1} display="flex" justifyContent="space-between">
              <Box>
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
                  onChange={(date) => setDeparting(date)}
                  dateFormat="dd MMM yyyy"
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
              <Box>
                <Typography
                  sx={{
                    color: "rgba(0, 0, 0, 0.6)",
                    marginBottom: "10px",
                  }}
                >
                  Return Date
                </Typography>
                <DatePicker
                  selected={returning}
                  onChange={(date) => setReturning(date)}
                  dateFormat="dd MMM yyyy"
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
                marginRight: "20px",
                padding: "10px 20px",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                transform: "translateY(40px)",
                "&:hover": { backgroundColor: "#2177cb" },
              }}
              onClick={() => navigate("/flight-listing")}
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
