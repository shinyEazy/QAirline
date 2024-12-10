import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
} from "@mui/material";
import { useState, useEffect } from "react";
import { fetchFlights } from "hooks/flight-hook";

interface Flight {
  flight_id: number;
  flight_number: string;
  registration_number: string;
  departure_city: string;
  destination_city: string;
  estimated_departure_time: string;
  estimated_arrival_time: string;
  actual_departure_time?: string;
  actual_arrival_time?: string;
  status: "Landed" | "Delayed" | "Canceled" | "Departed" | "On time";
  flight_price: number;
}

interface Passenger {
  passengerId: number;
  firstName: string;
  lastName: string;
  dob: string;
  class: string;
  seat: string;
}

// const flights: Flight[] = [
//   {
//     id: 1,
//     flightId: "1",
//     registrationNumber: "MH370",
//     departure: "Hanoi",
//     destination: "Ho Chi Minh",
//     departureTime: "10:00 - Dec 04, 2024",
//     arrivalTime: "12:00 - Dec 04, 2024",
//     price: "$100 - $200",
//     status: "On time",
//   },
//   {
//     id: 2,
//     flightId: "2",
//     registrationNumber: "MH370",
//     departure: "Hanoi",
//     destination: "Ho Chi Minh",
//     departureTime: "10:00 - Dec 04, 2024",
//     arrivalTime: "12:00 - Dec 04, 2024",
//     price: "$100 - $200",
//     status: "Delayed",
//   },
//   {
//     id: 3,
//     flightId: "3",
//     registrationNumber: "MH370",
//     departure: "Hanoi",
//     destination: "Ho Chi Minh",
//     departureTime: "10:00 - Dec 04, 2024",
//     arrivalTime: "12:00 - Dec 04, 2024",
//     price: "$100 - $200",
//     status: "Canceled",
//   },
//   {
//     id: 4,
//     flightId: "4",
//     registrationNumber: "MH370",
//     departure: "Hanoi",
//     destination: "Ho Chi Minh",
//     departureTime: "10:00 - Dec 04, 2024",
//     arrivalTime: "12:00 - Dec 04, 2024",
//     price: "$100 - $200",
//     status: "Departed",
//   },
//   {
//     id: 5,
//     flightId: "5",
//     registrationNumber: "MH370",
//     departure: "Hanoi",
//     destination: "Ho Chi Minh",
//     departureTime: "10:00 - Dec 04, 2024",
//     arrivalTime: "12:00 - Dec 04, 2024",
//     price: "$100 - $200",
//     status: "Landed",
//   },
// ];

const passengersByFlightId: Record<string, Passenger[]> = {
  1: [
    {
      passengerId: 1,
      firstName: "John",
      lastName: "Doe",
      dob: "1990-01-01",
      class: "Economy",
      seat: "A1",
    },
    {
      passengerId: 2,
      firstName: "Jane",
      lastName: "Smith",
      dob: "1985-05-15",
      class: "First Class",
      seat: "B2",
    },
    {
      passengerId: 3,
      firstName: "Alice",
      lastName: "Johnson",
      dob: "1992-07-21",
      class: "Business",
      seat: "C3",
    },
    {
      passengerId: 4,
      firstName: "Joshep",
      lastName: "Zues",
      dob: "1992-07-21",
      class: "Business",
      seat: "A4",
    },
  ],
};

const FlightList = () => {

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "On Time":
        return { color: "green", fontWeight: "bold" };
      case "Delayed":
        return { color: "orange", fontWeight: "bold" };
      case "Canceled":
        return { color: "red", fontWeight: "bold" };
      case "Scheduled":
        return { color: "blue", fontWeight: "bold" };
      case "Landed":
        return { color: "purple", fontWeight: "bold" };
      default:
        return {};
    }
  };

  const [flightData, setFlightData] = useState<Flight[]>([]);
  const [selectedFlight, setSelectedFlight] = useState<Flight | null>(null);
  const [open, setOpen] = useState(false);
  const [openView, setOpenView] = useState(false);
  const [selectedPassengers, setSelectedPassengers] = useState<Passenger[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadFlights = async () => {
      try {
        const flights = await fetchFlights();
        setFlightData(flights);
      } catch (err) {
        setError("Failed to fetch flights");
      }
    };

    loadFlights();
  }, []);

  const handleEdit = (flight: Flight) => {
    setSelectedFlight({ ...flight });
    setOpen(true);
  };

  const handleView = (flightId: string) => {
    const passengers = passengersByFlightId[flightId] || [];
    console.log(passengers);
    const classPriority: Record<string, number> = {
      "First Class": 1,
      Business: 2,
      Economy: 3,
    };

    const sortedPassengers = [...passengers].sort((a, b) => {
      // Compare by class priority
      const classDiff =
        (classPriority[a.class] || Infinity) -
        (classPriority[b.class] || Infinity);
      if (classDiff !== 0) return classDiff;

      // Compare by seat order (e.g., "A1" vs "B2")
      const parseSeat = (seat: string) => {
        const match = seat.match(/^([A-Za-z])(\d+)$/);
        if (match) {
          const [, letter, number] = match;
          return { letter, number: parseInt(number, 10) };
        }
        return { letter: "", number: Infinity };
      };

      const seatA = parseSeat(a.seat);
      const seatB = parseSeat(b.seat);

      if (seatA.letter !== seatB.letter) {
        return seatA.letter.localeCompare(seatB.letter);
      }
      return seatA.number - seatB.number;
    });

    setSelectedPassengers(sortedPassengers);
    setOpenView(true);
  };

  const handleChange = (field: keyof Flight, value: string) => {
    if (selectedFlight) {
      setSelectedFlight({ ...selectedFlight, [field]: value });
    }
  };

  const handleSave = () => {
    if (selectedFlight) {
      setFlightData(
        flightData.map((flight) =>
          flight.flight_id === selectedFlight.flight_id ? selectedFlight : flight
        )
      );
    }
    setOpen(false);
  };

  const formatDateTime = (dateTime: string) => {
    return new Date(dateTime).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <Box padding={2}>
      <Typography variant="h4" gutterBottom>
        Flight Management
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#1e90ff" }}>
              <TableCell
                sx={{
                  color: "white",
                  fontWeight: "bold",
                  border: "1px solid #ddd",
                }}
              >
                ID
              </TableCell>
              <TableCell
                sx={{
                  color: "white",
                  fontWeight: "bold",
                  border: "1px solid #ddd",
                }}
              >
                Flight Number
              </TableCell>
              <TableCell
                sx={{
                  color: "white",
                  fontWeight: "bold",
                  border: "1px solid #ddd",
                }}
              >
                Airplane Registration Number
              </TableCell>
              <TableCell
                sx={{
                  color: "white",
                  fontWeight: "bold",
                  border: "1px solid #ddd",
                }}
              >
                Departure
              </TableCell>
              <TableCell
                sx={{
                  color: "white",
                  fontWeight: "bold",
                  border: "1px solid #ddd",
                }}
              >
                Destination
              </TableCell>
              <TableCell
                sx={{
                  color: "white",
                  fontWeight: "bold",
                  border: "1px solid #ddd",
                }}
              >
                Departure Time
              </TableCell>
              <TableCell
                sx={{
                  color: "white",
                  fontWeight: "bold",
                  border: "1px solid #ddd",
                }}
              >
                Arrival Time
              </TableCell>
              <TableCell
                sx={{
                  color: "white",
                  fontWeight: "bold",
                  border: "1px solid #ddd",
                }}
              >
                Price
              </TableCell>
              <TableCell
                sx={{
                  color: "white",
                  fontWeight: "bold",
                  border: "1px solid #ddd",
                }}
              >
                Status
              </TableCell>
              <TableCell
                sx={{
                  color: "white",
                  fontWeight: "bold",
                  border: "1px solid #ddd",
                }}
              >
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {flightData.map((flight, index) => (
              <TableRow
                key={flight.flight_id}
                sx={{
                  backgroundColor: index % 2 === 0 ? "#f5f5f5" : "white",
                  "&:hover": {
                    backgroundColor: "#e0f7fa", // Light blue hover color
                  },
                }}
              >
                <TableCell sx={{ border: "1px solid #ddd" }}>
                  {flight.flight_id}
                </TableCell>
                <TableCell sx={{ border: "1px solid #ddd" }}>
                  {flight.flight_number}
                </TableCell>
                <TableCell sx={{ border: "1px solid #ddd" }}>
                  {flight.registration_number}
                </TableCell>
                <TableCell sx={{ border: "1px solid #ddd" }}>
                  {flight.departure_city}
                </TableCell>
                <TableCell sx={{ border: "1px solid #ddd" }}>
                  {flight.destination_city}
                </TableCell>
                <TableCell sx={{ border: "1px solid #ddd" }}>
                  {formatDateTime(flight.estimated_departure_time)}
                </TableCell>
                <TableCell sx={{ border: "1px solid #ddd" }}>
                  {formatDateTime(flight.estimated_arrival_time)}
                </TableCell>
                <TableCell sx={{ border: "1px solid #ddd" }}>
                  {flight.flight_price}
                </TableCell>
                <TableCell
                  sx={{
                    border: "1px solid #ddd",
                    ...getStatusStyle(flight.status),
                  }}
                >
                  {flight.status}
                </TableCell>
                <TableCell sx={{ border: "1px solid #ddd" }}>
                  <Button
                    onClick={() => handleView("1")}
                    variant="contained"
                    size="small"
                    color="primary"
                  >
                    View
                  </Button>
                  <Button
                    onClick={() => handleEdit(flight)}
                    variant="contained"
                    size="small"
                    color="secondary"
                    sx={{ marginLeft: "8px" }}
                  >
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* View Passengers Dialog */}
      <Dialog open={openView} onClose={() => setOpenView(false)} fullWidth>
        <DialogTitle>Passenger List</DialogTitle>
        <DialogContent>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>First Name</TableCell>
                  <TableCell>Last Name</TableCell>
                  <TableCell>Date of Birth</TableCell>
                  <TableCell>Seat</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {selectedPassengers.map((passenger, index) => (
                  <TableRow key={passenger.passengerId}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{passenger.firstName}</TableCell>
                    <TableCell>{passenger.lastName}</TableCell>
                    <TableCell>{passenger.dob}</TableCell>
                    <TableCell>
                      {passenger.class + " - " + passenger.seat}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenView(false)} color="secondary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Flight Dialog */}
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth>
        <DialogTitle>Edit Flight</DialogTitle>
        <DialogContent>
          <TextField
            label="Airplane Registration Number"
            fullWidth
            margin="dense"
            value={selectedFlight?.registration_number || ""}
            onChange={(e) => handleChange("registration_number", e.target.value)}
          />
          <Box display="flex" gap={2}>
            <TextField
              label="Departure Time"
              fullWidth
              margin="dense"
              value={selectedFlight?.estimated_departure_time || ""}
              onChange={(e) => handleChange("estimated_departure_time", e.target.value)}
            />
            <TextField
              label="Arrival Time"
              fullWidth
              margin="dense"
              value={selectedFlight?.estimated_arrival_time || ""}
              onChange={(e) => handleChange("estimated_arrival_time", e.target.value)}
            />
          </Box>
          <TextField
            label="Price"
            fullWidth
            margin="dense"
            value={selectedFlight?.flight_price || ""}
            onChange={(e) => handleChange("flight_price", e.target.value)}
          />
          <Select
            fullWidth
            value={selectedFlight?.status || ""}
            onChange={(e) => handleChange("status", e.target.value)}
            displayEmpty
            margin="dense"
            sx={{ marginTop: 1 }}
          >
            <MenuItem value="On time">On time</MenuItem>
            <MenuItem value="Delayed">Delayed</MenuItem>
            <MenuItem value="Canceled">Canceled</MenuItem>
            <MenuItem value="Departed">Departed</MenuItem>
            <MenuItem value="Landed">Landed</MenuItem>
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default FlightList;
