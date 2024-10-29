import React, { useState } from "react";
import {
  Box,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  TextField,
  TextFieldProps,
  Button,
  FormControlLabel,
  RadioGroup,
  Radio,
  Input,
} from "@mui/material";
import { LocalizationProvider, DesktopDatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightArrowLeft } from "@fortawesome/free-solid-svg-icons";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../css/DatePickerStyles.css";

function FlightSearch() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [departing, setDeparting] = useState(new Date());
  const [returning, setReturning] = useState(() => {
    const today = new Date();
    today.setDate(today.getDate() + 2);
    return today;
  });

  return (
    <Box
      sx={{
        backgroundColor: "wheat",
        padding: "40px",
        borderRadius: "20px",
        margin: "20px 80px",
        color: "black",
      }}
    >
      <Box marginBottom="20px" display="flex" gap="2px">
        <Button
          sx={{
            backgroundColor: "rgb(77,115,252)",
            borderRadius: "8px",
            padding: "10px 20px",
            color: "white",
            textTransform: "none",
            fontSize: "1.2rem",
            "&:hover": {
              backgroundColor: "rgb(77,115,252)",
              color: "white",
            },
          }}
        >
          Flights
        </Button>
        <Button
          sx={{
            backgroundColor: "white",
            borderRadius: "8px",
            padding: "10px 20px",
            color: "black",
            textTransform: "none",
            fontSize: "1.2rem",
            "&:hover": {
              backgroundColor: "rgb(77,115,252)",
              color: "white",
            },
          }}
        >
          Hotel
        </Button>
        <Button
          sx={{
            backgroundColor: "white",
            borderRadius: "8px",
            padding: "10px 20px",
            color: "black",
            textTransform: "none",
            fontSize: "1.2rem",
            "&:hover": {
              backgroundColor: "rgb(77,115,252)",
              color: "white",
            },
          }}
        >
          Car Rentals
        </Button>
      </Box>
      <Box
        width="100%"
        display="flex"
        justifyContent="space-evenly"
        marginBottom="20px"
      >
        <Box width="100%" display="flex" gap="2px">
          <Button
            sx={{
              flex: 1,
              backgroundColor: "rgb(77,115,252)",
              color: "white",
              textTransform: "none",
              fontSize: "1rem",
              "&:hover": {
                backgroundColor: "rgb(77,115,252)",
                color: "white",
              },
            }}
          >
            Flight
          </Button>
          <Button
            sx={{
              flex: 1,
              backgroundColor: "white",
              color: "black",
              textTransform: "none",
              fontSize: "1rem",
              "&:hover": {
                backgroundColor: "rgb(77,115,252)",
                color: "white",
              },
            }}
          >
            Stopover
          </Button>
          <Button
            sx={{
              flex: 1,
              backgroundColor: "white",
              color: "black",
              textTransform: "none",
              fontSize: "1rem",
              "&:hover": {
                backgroundColor: "rgb(77,115,252)",
                color: "white",
              },
            }}
          >
            Manage Booking / Check in
          </Button>
          <Button
            sx={{
              flex: 1,
              backgroundColor: "white",
              color: "black",
              textTransform: "none",
              fontSize: "1rem",
              "&:hover": {
                backgroundColor: "rgb(77,115,252)",
                color: "white",
              },
            }}
          >
            Flight Status
          </Button>
        </Box>
      </Box>
      <FormControl sx={{ margin: "20px auto 40px" }}>
        <RadioGroup row defaultValue="oneway" sx={{ gap: "20px" }}>
          <FormControlLabel
            value="oneway"
            control={
              <Radio
                sx={{ width: "32px", height: "32px", marginLeft: "5px" }}
              />
            }
            label="One way"
          />
          <FormControlLabel
            value="roundtrip"
            control={<Radio sx={{ width: "32px", height: "32px" }} />}
            label="Round-trip"
          />
          <FormControlLabel
            value="multicity"
            control={<Radio sx={{ width: "32px", height: "32px" }} />}
            label="Multi-City"
          />
        </RadioGroup>
      </FormControl>
      <Box
        alignItems="center"
        display="flex"
        gap="10px"
        marginBottom="20px"
        sx={{
          backgroundColor: "rgb(231,235,255)",
          padding: "32px 20px",
          borderRadius: "8px",
        }}
      >
        <TextField
          label="From"
          variant="outlined"
          sx={{
            width: "250px",
            margin: "10px auto",
            "& .MuiOutlinedInput-root": {
              borderRadius: "8px",
              "& fieldset": {
                borderColor: "#bdbdbd",
              },
              "&:hover fieldset": {
                borderColor: "black",
              },
              "&.Mui-focused fieldset": {
                borderColor: "rgb(99,91,255)",
              },
            },
          }}
        />
        <FontAwesomeIcon icon={faArrowRightArrowLeft} />

        <TextField
          label="To"
          variant="outlined"
          sx={{
            width: "250px",
            margin: "10px auto",
            "& .MuiOutlinedInput-root": {
              borderRadius: "8px",
              "& fieldset": {
                borderColor: "#bdbdbd",
              },
              "&:hover fieldset": {
                borderColor: "black",
              },
              "&.Mui-focused fieldset": {
                borderColor: "rgb(99,91,255)",
              },
            },
          }}
        />
        <Box
          sx={{
            display: "flex",
            gap: "20px",
            padding: "20px",
            borderRadius: "8px",
          }}
        >
          <FormControl style={{ position: "relative" }}>
            <InputLabel
              htmlFor="departing-date-picker"
              style={{
                fontSize: "12px",
                color: "#8a8a8a",
                position: "absolute",
                top: "0px",
                left: "12px",
                backgroundColor: "rgb(231, 235, 255)",
                padding: "0 4px",
                transform: "translateY(-50%)",
              }}
            >
              Departing
            </InputLabel>
            <DatePicker
              id="departing-date-picker"
              selected={departing}
              onChange={(date) => setDeparting(date)}
              dateFormat="MMM d, yyyy"
              placeholderText="Select a date"
              className="custom-date-picker"
            />
          </FormControl>

          <FormControl style={{ position: "relative" }}>
            <InputLabel
              htmlFor="returning-date-picker"
              style={{
                fontSize: "12px",
                color: "#8a8a8a",
                position: "absolute",
                top: "0px",
                left: "12px",
                backgroundColor: "rgb(231, 235, 255)",
                padding: "0 4px",
                transform: "translateY(-50%)",
              }}
            >
              Returning
            </InputLabel>
            <DatePicker
              id="returning-date-picker"
              selected={returning}
              onChange={(date) => setReturning(date)}
              dateFormat="MMM d, yyyy"
              placeholderText="Select a date"
              className="custom-date-picker"
            />
          </FormControl>
        </Box>
        <Input placeholder="Passengers and Class" />
      </Box>
      <Box display="flex" justifyContent="flex-end">
        <Button
          variant="contained"
          sx={{ backgroundColor: "rgb(236,236,236)" }}
        >
          Show Flight
        </Button>
      </Box>
    </Box>
  );
}

export default FlightSearch;
