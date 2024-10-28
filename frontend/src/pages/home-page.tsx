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

const HomePage = () => {
  return (
    <Box>
      <Header />
      <Box
        sx={{
          backgroundColor: "wheat",
          padding: "20px",
          borderRadius: "20px",
        }}
      >
        <Box marginBottom="20px" display="flex" gap="4px">
          <Button
            sx={{
              backgroundColor: "rgb(236,236,236)",
              borderRadius: "8px",
              padding: "10px 20px",
            }}
          >
            Flights
          </Button>
          <Button
            sx={{
              backgroundColor: "rgb(236,236,236)",
              borderRadius: "8px",
              padding: "10px 20px",
            }}
          >
            Hotel
          </Button>
          <Button
            sx={{
              backgroundColor: "rgb(236,236,236)",
              borderRadius: "8px",
              padding: "10px 20px",
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
            <Button sx={{ flex: 1, backgroundColor: "rgb(236,236,236)" }}>
              Flight
            </Button>
            <Button sx={{ flex: 1, backgroundColor: "rgb(236,236,236)" }}>
              Stopover
            </Button>
            <Button sx={{ flex: 1, backgroundColor: "rgb(236,236,236)" }}>
              Manage Booking / Check in
            </Button>
            <Button sx={{ flex: 1, backgroundColor: "rgb(236,236,236)" }}>
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
        <Box display="flex" gap="10px" marginBottom="20px">
          <Input placeholder="From" />
          <Input placeholder="To" />
        </Box>
        <Box display="flex" gap="10px" marginBottom="20px">
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
    </Box>
  );
};

export default HomePage;
