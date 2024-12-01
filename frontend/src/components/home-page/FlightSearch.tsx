import { useState, useEffect } from "react";
import {
  Box,
  Button,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField,
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
            padding: "10px 40px",
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
                    marginRight: "20px",
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
                    marginRight: "20px",
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
          borderRadius="12px"
          sx={{ padding: "20px" }}
        >
          <Box display="flex" gap="10px">
            <Box display="flex" gap="10px" alignItems="center">
              <TextField
                label="From"
                variant="outlined"
                fullWidth
                InputProps={{
                  style: {
                    borderRadius: "10px",
                    backgroundColor: "rgba(240, 240, 240, 0.8)",
                  },
                }}
              />
              <FontAwesomeIcon icon={faArrowRightArrowLeft} />
              <TextField
                label="To"
                variant="outlined"
                fullWidth
                InputProps={{
                  style: {
                    borderRadius: "10px",
                    backgroundColor: "rgba(240, 240, 240, 0.8)",
                  },
                }}
              />
            </Box>
            <Box display="flex" gap="10px">
              <DatePicker
                selected={departing}
                onChange={(date) => setDeparting(date)}
                dateFormat="dd MMM yyyy"
                customInput={
                  <TextField
                    label="Departure Date"
                    variant="outlined"
                    fullWidth
                    InputProps={{
                      style: {
                        borderRadius: "10px",
                        backgroundColor: "rgba(240, 240, 240, 0.8)",
                      },
                    }}
                  />
                }
              />
              <DatePicker
                selected={returning}
                onChange={(date) => setReturning(date)}
                dateFormat="dd MMM yyyy"
                customInput={
                  <TextField
                    label="Return Date"
                    variant="outlined"
                    fullWidth
                    InputProps={{
                      style: {
                        borderRadius: "10px",
                        backgroundColor: "rgba(240, 240, 240, 0.8)",
                      },
                    }}
                  />
                }
              />
            </Box>
          </Box>
          <Box>
            {/* Search Button */}
            <Button
              fullWidth
              sx={{
                marginTop: "20px",
                padding: "10px 0",
                borderRadius: "8px",
                backgroundColor: "rgb(77,115,252)",
                color: "white",
                textTransform: "none",
                fontSize: "1rem",
                "&:hover": { backgroundColor: "rgb(60,90,200)" },
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
