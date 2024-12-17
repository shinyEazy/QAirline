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
import { fetchFlights, updateFlight } from "hooks/flight-hook";
import { getPassengerInFlight } from "hooks/passenger-hook";
import { Passenger, NewPassenger } from "types/passenger";
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



// const passengersByFlightId: Record<string, Passenger[]> = {
//   1: [
//     {
//       passengerId: 1,
//       firstName: "John",
//       lastName: "Doe",
//       dob: "1990-01-01",
//       class: "Economy",
//       seat: "A1",
//     },
//     {
//       passengerId: 2,
//       firstName: "Jane",
//       lastName: "Smith",
//       dob: "1985-05-15",
//       class: "First Class",
//       seat: "B2",
//     },
//     {
//       passengerId: 3,
//       firstName: "Alice",
//       lastName: "Johnson",
//       dob: "1992-07-21",
//       class: "Business",
//       seat: "C3",
//     },
//     {
//       passengerId: 4,
//       firstName: "Joshep",
//       lastName: "Zues",
//       dob: "1992-07-21",
//       class: "Business",
//       seat: "A4",
//     },
//   ],
// };

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
  const [selectedPassengers, setSelectedPassengers] = useState<NewPassenger[]>([]);
  const [error, setError] = useState<string | null>(null);
  const sortFlightsByID = (flights: Flight[]) => {
    return [...flights].sort((a, b) => a.flight_id - b.flight_id);
  };
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

  const handleView = async (flightId: number) => {
    try {
      const passengers = await getPassengerInFlight(flightId);
      console.log(passengers);
      const classPriority: Record<string, number> = {
        "First Class": 1,
        Business: 2,
        Economy: 3,
      };

      const sortedPassengers = [...passengers].sort((a, b) => {
        // Compare by class priority
        const classDiff =
          (classPriority[a.flight_class] || Infinity) -
          (classPriority[b.flight_class] || Infinity);
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

        const seatA = parseSeat(a.seat_col);
        const seatB = parseSeat(b.seat_col);

        if (seatA.letter !== seatB.letter) {
          return seatA.letter.localeCompare(seatB.letter);
        }
        return seatA.number - seatB.number;
      });

      setSelectedPassengers(sortedPassengers);
      setOpenView(true);
    } catch (error) {
      setError("Failed to fetch passengers");
      console.error("Error fetching passengers", error);
    }
  };

  const handleChange = (field: keyof Flight, value: string) => {
    if (selectedFlight) {
      setSelectedFlight({ ...selectedFlight, [field]: value });
    }
  };

  const handleSave = async () => {
    if (selectedFlight) {
      try {
        const {
          registration_number,
          estimated_departure_time,
          actual_departure_time,
          estimated_arrival_time,
          actual_arrival_time,
          flight_price,
          status,
        } = selectedFlight;
        const { departure_city, destination_city } = selectedFlight;

        // Tạo payload với chỉ các trường cần thiết
        const payload = {
          registration_number,
          estimated_departure_time,
          actual_departure_time: actual_departure_time || "",
          estimated_arrival_time,
          actual_arrival_time: actual_arrival_time || "",
          flight_price,
          status,
        };
        // Gọi API để cập nhật chuyến bay
        const updatedFlight = await updateFlight(
          selectedFlight.flight_id,
          payload
        );
        updatedFlight.departure_city = departure_city;
        updatedFlight.destination_city = destination_city;

        // Cập nhật lại danh sách chuyến bay trong state
        setFlightData(
          flightData.map((flight) =>
            flight.flight_id === selectedFlight.flight_id
              ? updatedFlight
              : flight
          )
        );

        // Đóng modal sau khi cập nhật thành công
        setOpen(false);
      } catch (error) {
        setError("Failed to update flight");
        console.error("Error updating flight", error);
      }
    }
  };

  const formatDateTime = (dateTime: string) => {
    return new Date(dateTime).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <Box padding={2} width="100vw">
      <TableContainer
        component={Paper}
        sx={{ boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", borderRadius: 2 }}
      >
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#1e90ff" }}>
              <TableCell
                sx={{
                  color: "white",
                  fontWeight: "bold",
                  border: "1px solid #ddd",
                  textAlign: "center",
                }}
              >
                ID
              </TableCell>
              <TableCell
                sx={{
                  color: "white",
                  fontWeight: "bold",
                  border: "1px solid #ddd",
                  textAlign: "center",
                }}
              >
                Flight Number
              </TableCell>
              <TableCell
                sx={{
                  color: "white",
                  fontWeight: "bold",
                  border: "1px solid #ddd",
                  textAlign: "center",
                }}
              >
                Airplane Registration Number
              </TableCell>
              <TableCell
                sx={{
                  color: "white",
                  fontWeight: "bold",
                  border: "1px solid #ddd",
                  textAlign: "center",
                }}
              >
                Departure
              </TableCell>
              <TableCell
                sx={{
                  color: "white",
                  fontWeight: "bold",
                  border: "1px solid #ddd",
                  textAlign: "center",
                }}
              >
                Destination
              </TableCell>
              <TableCell
                sx={{
                  color: "white",
                  fontWeight: "bold",
                  border: "1px solid #ddd",
                  textAlign: "center",
                }}
              >
                Departure Time
              </TableCell>
              <TableCell
                sx={{
                  color: "white",
                  fontWeight: "bold",
                  border: "1px solid #ddd",
                  textAlign: "center",
                }}
              >
                Arrival Time
              </TableCell>
              <TableCell
                sx={{
                  color: "white",
                  fontWeight: "bold",
                  border: "1px solid #ddd",
                  textAlign: "center",
                }}
              >
                Price
              </TableCell>
              <TableCell
                sx={{
                  color: "white",
                  fontWeight: "bold",
                  border: "1px solid #ddd",
                  textAlign: "center",
                }}
              >
                Status
              </TableCell>
              <TableCell
                sx={{
                  color: "white",
                  fontWeight: "bold",
                  border: "1px solid #ddd",
                  textAlign: "center",
                }}
              >
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortFlightsByID(flightData).map((flight, index) => (
              <TableRow
                key={flight.flight_id}
                sx={{
                  backgroundColor: index % 2 === 0 ? "#f5f5f5" : "white",
                  "&:hover": {
                    backgroundColor: "#e0f7fa",
                  },
                }}
              >
                <TableCell
                  sx={{ border: "1px solid #ddd", textAlign: "center" }}
                >
                  {flight.flight_id}
                </TableCell>
                <TableCell
                  sx={{ border: "1px solid #ddd", textAlign: "center" }}
                >
                  {flight.flight_number}
                </TableCell>
                <TableCell
                  sx={{ border: "1px solid #ddd", textAlign: "center" }}
                >
                  {flight.registration_number}
                </TableCell>
                <TableCell
                  sx={{ border: "1px solid #ddd", textAlign: "center" }}
                >
                  {flight.departure_city}
                </TableCell>
                <TableCell
                  sx={{ border: "1px solid #ddd", textAlign: "center" }}
                >
                  {flight.destination_city}
                </TableCell>
                <TableCell
                  sx={{ border: "1px solid #ddd", textAlign: "center" }}
                >
                  {formatDateTime(flight.estimated_departure_time)}
                </TableCell>
                <TableCell
                  sx={{ border: "1px solid #ddd", textAlign: "center" }}
                >
                  {formatDateTime(flight.estimated_arrival_time)}
                </TableCell>
                <TableCell
                  sx={{ border: "1px solid #ddd", textAlign: "center" }}
                >
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
                <TableCell
                  sx={{ border: "1px solid #ddd", textAlign: "center" }}
                >
                  <Button
                    onClick={() => handleView(flight.flight_id)}
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
                  <TableCell>Name</TableCell>
                  <TableCell>DOB</TableCell>
                  <TableCell>Seat</TableCell>
                  <TableCell>Class</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {selectedPassengers.map((passenger, index) => (
                  <TableRow >
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{passenger.first_name + " " + passenger.last_name}</TableCell>
                    <TableCell>{passenger.date_of_birth}</TableCell>
                    <TableCell>{passenger.flight_class}</TableCell>
                    <TableCell>
                      {passenger.seat_col + " - " + passenger.seat_row}
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
            onChange={(e) =>
              handleChange("registration_number", e.target.value)
            }
          />
          <Box display="flex" gap={2}>
            <TextField
              label="Departure Time"
              fullWidth
              margin="dense"
              value={selectedFlight?.estimated_departure_time || ""}
              onChange={(e) =>
                handleChange("estimated_departure_time", e.target.value)
              }
            />
            <TextField
              label="Arrival Time"
              fullWidth
              margin="dense"
              value={selectedFlight?.estimated_arrival_time || ""}
              onChange={(e) =>
                handleChange("estimated_arrival_time", e.target.value)
              }
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
            <MenuItem value="On Time">On Time</MenuItem>
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
