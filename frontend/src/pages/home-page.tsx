import {
  Box,
  Input,
  Button,
  RadioGroup,
  FormControl,
  FormControlLabel,
  Radio,
  Typography,
} from "@mui/material";
import "../styles.css";
import Header from "../components/Header";
// import FlightSearch from "components/FlightSearch";

const HomePage = () => {
  return (
    <Box>
      <Header />
      <Box
        sx={{
          backgroundColor: "wheat",
          padding: "40px",
          borderRadius: "20px",
          margin: "20px 80px",
          color: "black",
        }}
      >
        <Box marginBottom="20px" display="flex" gap="4px">
          <Button
            sx={{
              backgroundColor: "rgb(236,236,236)",
              borderRadius: "8px",
              padding: "10px 20px",
              color: "black",
            }}
          >
            Flights
          </Button>
          <Button
            sx={{
              backgroundColor: "rgb(236,236,236)",
              borderRadius: "8px",
              padding: "10px 20px",
              color: "black",
            }}
          >
            Hotel
          </Button>
          <Button
            sx={{
              backgroundColor: "rgb(236,236,236)",
              borderRadius: "8px",
              padding: "10px 20px",
              color: "black",
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
          <Box width="100%" display="flex" gap="4px">
            <Button
              sx={{
                flex: 1,
                backgroundColor: "rgb(236,236,236)",
                color: "black",
              }}
            >
              Flight
            </Button>
            <Button
              sx={{
                flex: 1,
                backgroundColor: "rgb(236,236,236)",
                color: "black",
              }}
            >
              Stopover
            </Button>
            <Button
              sx={{
                flex: 1,
                backgroundColor: "rgb(236,236,236)",
                color: "black",
              }}
            >
              Manage Booking / Check in
            </Button>
            <Button
              sx={{
                flex: 1,
                backgroundColor: "rgb(236,236,236)",
                color: "black",
              }}
            >
              Flight Status
            </Button>
          </Box>
        </Box>
        <FormControl>
          <RadioGroup row defaultValue="oneway">
            <FormControlLabel
              value="oneway"
              control={<Radio />}
              label="One way"
            />
            <FormControlLabel
              value="roundtrip"
              control={<Radio />}
              label="Round-trip"
            />
            <FormControlLabel
              value="multicity"
              control={<Radio />}
              label="Multi-City"
            />
          </RadioGroup>
        </FormControl>
        <Box
          display="flex"
          gap="10px"
          marginBottom="20px"
          sx={{
            backgroundColor: "rgb(231,235,255)",
            padding: "32px 20px",
            borderRadius: "8px",
          }}
        >
          <Input placeholder="From" />
          <Input placeholder="To" />
          <Input placeholder="Departing" />
          <Input placeholder="Returning" />
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
      {/* <FlightSearch /> */}
    </Box>
  );
};

export default HomePage;
