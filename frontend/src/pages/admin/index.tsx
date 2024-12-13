import { useState, useEffect } from "react";
import './css/admin.css';
import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Autocomplete
} from "@mui/material";
import FlightList from "../../components/admin/flight-list";
import { createFlight } from "../../hooks/flight-hook";
import { fetchAirplanes } from "../../hooks/flight-hook";
import DatePicker from "react-datepicker";
import { fetchAirport } from "hooks/airport-hook";
const AdminPage = () => {
  const [flightModalOpen, setFlightModalOpen] = useState(false);
  const [airplaneModalOpen, setAirplaneModalOpen] = useState(false);
  const [newsModalOpen, setNewsModalOpen] = useState(false);

  const [newFlight, setNewFlight] = useState({
    flightNumber: "",
    airplaneRegistrationNumber: "",
    departure: 0,
    destination: 0,
    departureTime: new Date(),
    arrivalTime: new Date(),
    price: 0.0,
  });

  const [newAirplane, setNewAirplane] = useState({
    airplane_model_id: 0,
    registration_number: "",
    flight_seats: [
      {
        flight_class: "Economy",
        class_multiplier: 1,
        child_multiplier: 0.5,
        max_row_seat: 20,
        max_col_seat: "6"
      },
      {
        flight_class: "Business",
        class_multiplier: 3,
        child_multiplier: 0.7,
        max_row_seat: 5,
        max_col_seat: "4"
      },
      {
        flight_class: "FirstClass",
        class_multiplier: 5,
        child_multiplier: 0.8,
        max_row_seat: 2,
        max_col_seat: "3"
      }
    ]
  });

  const [newNews, setNewNews] = useState({
    imageUrl: "",
    title: "",
    content: "",
  });

  const [airplaneSuggestions, setAirplaneSuggestions] = useState<{ registration_number: string }[]>([]);
  const [airports, setAirports] = useState<{ airport_id: number; city: string; airport_code: string }[]>([]);

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

  // Fetch máy bay
  useEffect(() => {
    const fetchInitialAirplanes = async () => {
      try {
        const data = await fetchAirplanes();
        setAirplaneSuggestions(data);
      } catch (error) {
        console.error("Failed to fetch airplane suggestions:", error);
      }
    };

    fetchInitialAirplanes();
  }, []);


  const handleFlightModalOpen = () => {
    setFlightModalOpen(true);
  };

  const handleFlightModalClose = () => {
    setFlightModalOpen(false);
    setNewFlight({
      flightNumber: "",
      airplaneRegistrationNumber: "",
      departure: 0,
      destination: 0,
      departureTime: new Date(),
      arrivalTime: new Date(),
      price: 0.0,
    });
  };

  const handleAirplaneModalOpen = () => {
    setAirplaneModalOpen(true);
  };

  const handleAirplaneModalClose = () => {
    setAirplaneModalOpen(false);
    setNewAirplane({
      airplane_model_id: 0,
      registration_number: "",
      flight_seats: [
        {
          flight_class: "",
          class_multiplier: 1,
          child_multiplier: 1,
          max_row_seat: 1,
          max_col_seat: "A"
        }
      ]
    });
  };

  const handleNewsModalOpen = () => setNewsModalOpen(true);
  const handleNewsModalClose = () => {
    setNewsModalOpen(false);
    setNewNews({
      imageUrl: "",
      title: "",
      content: "",
    });
  };

  const handleFlightChange = (field: string, value: any) => {
    setNewFlight({ ...newFlight, [field]: value });
  };

  const handleAirplaneChange = (field: string, value: string | number, seatIndex?: number) => {
    const updatedAirplane = { ...newAirplane };

    if (seatIndex !== undefined) {
      updatedAirplane.flight_seats[seatIndex] = {
        ...updatedAirplane.flight_seats[seatIndex],
        [field]: value
      };
    } else {
      updatedAirplane[field] = value;
    }

    setNewAirplane({ ...newAirplane, [field]: value });
  };

  const handleNewsChange = (field: string, value: string) => {
    setNewNews({ ...newNews, [field]: value });
  };

  const handleSaveFlight = async () => {
    try {
      const payload = {
        flight_number: newFlight.flightNumber,
        registration_number: newFlight.airplaneRegistrationNumber,
        estimated_departure_time: newFlight.departureTime.toISOString().split("T")[0],
        estimated_arrival_time: newFlight.arrivalTime.toISOString().split("T")[0],
        departure_airport_id: newFlight.departure,
        destination_airport_id: newFlight.destination,
        flight_price: newFlight.price,
        status: "Scheduled", // Default status or you can add a field in the UI to select this
      };

      const createdFlight = await createFlight(payload);
      console.log("Flight created successfully:", createdFlight);
      handleFlightModalClose();
    } catch (error) {
      console.error("Failed to save flight:", error);
    }
  };


  const handleSaveAirplane = () => {
    console.log("New Airplane Data:", newAirplane);
    // Logic to save the new airplane
    handleAirplaneModalClose();
  };

  const handleSaveNews = () => {
    console.log("New News Data:", newNews);
    handleNewsModalClose();
  };


  return (
    <Box>
      <Box padding={2}>
        <Typography variant="h4">Admin Page</Typography>
        <Button
          onClick={handleAirplaneModalOpen}
          sx={{
            backgroundColor: "#1e90ff",
            color: "white",
            textTransform: "none",
            fontSize: "1rem",
            fontWeight: "bold",
            borderRadius: "8px",
            padding: "10px 20px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            marginRight: "10px",
            "&:hover": { backgroundColor: "#2177cb" },
          }}
        >
          Add Airplane
        </Button>
        <Button
          onClick={handleFlightModalOpen}
          sx={{
            marginRight: "10px",
            backgroundColor: "#1e90ff",
            color: "white",
            textTransform: "none",
            fontSize: "1rem",
            fontWeight: "bold",
            borderRadius: "8px",
            padding: "10px 20px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            "&:hover": { backgroundColor: "#2177cb" },
          }}
        >
          Add Flight
        </Button>
        <Button
          onClick={handleNewsModalOpen}
          sx={{
            backgroundColor: "#1e90ff",
            color: "white",
            textTransform: "none",
            fontSize: "1rem",
            fontWeight: "bold",
            borderRadius: "8px",
            padding: "10px 20px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            "&:hover": { backgroundColor: "#2177cb" },
          }}
        >
          Add News
        </Button>
      </Box>
      <FlightList />
      {/* Add Flight Modal */}
      <Dialog open={flightModalOpen} onClose={handleFlightModalClose} fullWidth>
        <DialogTitle>Add New Flight</DialogTitle>
        <DialogContent>
          <TextField
            label="Flight Number"
            fullWidth
            margin="dense"
            value={newFlight.flightNumber}
            onChange={(e) => handleFlightChange("flightNumber", e.target.value)}
          />
          {/* <Autocomplete
            options={airports}
            getOptionLabel={(option) => `${option.city} (${option.airport_code})`}
            onChange={(e, value) =>
              handleFlightChange("departure", value ? value.airport_id : 0)
            }
            renderInput={(params) => (
              <TextField {...params} label="Departure" fullWidth margin="dense" />
            )}
          />
          <Autocomplete
            options={airports}
            getOptionLabel={(option) => `${option.city} (${option.airport_code})`}
            onChange={(e, value) =>
              handleFlightChange("destination", value ? value.airport_id : 0)
            }
            renderInput={(params) => (
              <TextField {...params} label="Destination" fullWidth margin="dense" />
            )}
          /> */}
          {/* <label htmlFor="departure">Departure:</label> */}
          <select
            id="departure"
            value={newFlight.departure || ""}
            className="custom-select"
            onChange={(e) => handleFlightChange("departure", Number(e.target.value))}
          >
            <option value="" disabled>
              Select Departure Airport
            </option>
            {airports.map((airport) => (
              <option key={airport.airport_id} value={airport.airport_id}>
                {`${airport.city} (${airport.airport_code})`}
              </option>
            ))}
          </select>

          {/* <label htmlFor="destination">Destination:</label> */}
          <select
            id="destination"
            className="custom-select"
            value={newFlight.destination || ""}
            onChange={(e) => handleFlightChange("destination", Number(e.target.value))}
          >
            <option value="" disabled>
              Select Destination Airport
            </option>
            {airports.map((airport) => (
              <option key={airport.airport_id} value={airport.airport_id}>
                {`${airport.city} (${airport.airport_code})`}
              </option>
            ))}
          </select>
          {/* <label htmlFor="airplane">Airplane Registration Number:</label> */}
          <select
            id="airplane"
            className="custom-select"
            value={newFlight.airplaneRegistrationNumber || ""}
            onChange={(e) => handleFlightChange("airplaneRegistrationNumber", e.target.value)}
          >
            <option value="" disabled>
              Select Airplane Registration Number
            </option>
            {airplaneSuggestions.map((airplane) => (
              <option key={airplane.registration_number} value={airplane.registration_number}>
                {airplane.registration_number}
              </option>
            ))}
          </select>

          {/* <Autocomplete
            options={airplaneSuggestions.map((airplane) => airplane.registration_number)}
            value={newFlight.airplaneRegistrationNumber}
            onChange={(e, value) => handleFlightChange("airplaneRegistrationNumber", value)}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Airplane Registration Number"
                fullWidth
                margin="dense"
              />
            )}
          /> */}
          <DatePicker
            selected={newFlight.departureTime}
            onChange={(date) => handleFlightChange("departureTime", date)}
            showTimeSelect
            dateFormat="Pp"
            customInput={<TextField label="Departure Time" fullWidth margin="dense" />}
          />
          <DatePicker
            selected={newFlight.arrivalTime}
            onChange={(date) => handleFlightChange("arrivalTime", date)}
            showTimeSelect
            dateFormat="Pp"
            customInput={<TextField label="Arrival Time" fullWidth margin="dense" />}
          />
          <TextField
            label="Price"
            fullWidth
            margin="dense"
            value={newFlight.price}
            onChange={(e) => handleFlightChange("price", e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleFlightModalClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSaveFlight} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Add Airplane Modal */}
      <Dialog
        open={airplaneModalOpen}
        onClose={handleAirplaneModalClose}
        fullWidth
      >
        <DialogTitle>Add New Airplane</DialogTitle>
        <DialogContent>
          <TextField
            label="Airplane Model ID"
            type="number"
            fullWidth
            margin="dense"
            value={newAirplane.airplane_model_id}
            onChange={(e) => handleAirplaneChange("airplane_model_id", Number(e.target.value))}
          />
          <TextField
            label="Airplane Registration Number"
            fullWidth
            margin="dense"
            value={newAirplane.registration_number}
            onChange={(e) => handleAirplaneChange("registration_number", e.target.value)}
          />
          {newAirplane.flight_seats.map((seat, index) => (
            <Box key={seat.flight_class} sx={{ border: '1px solid #ccc', padding: 2, marginTop: 2 }}>
              <Typography variant="subtitle1">{seat.flight_class} Seats Configuration</Typography>
              <TextField
                label="Class Multiplier"
                type="number"
                fullWidth
                margin="dense"
                value={seat.class_multiplier}
                onChange={(e) => handleAirplaneChange("class_multiplier", Number(e.target.value), index)}
              />
              <TextField
                label="Child Multiplier"
                type="number"
                fullWidth
                margin="dense"
                value={seat.child_multiplier}
                onChange={(e) => handleAirplaneChange("child_multiplier", Number(e.target.value), index)}
              />
              <TextField
                label="Max Row Seat"
                type="number"
                fullWidth
                margin="dense"
                value={seat.max_row_seat}
                onChange={(e) => handleAirplaneChange("max_row_seat", Number(e.target.value), index)}
              />
              <TextField
                label="Max Column Seat"
                fullWidth
                margin="dense"
                value={seat.max_col_seat}
                onChange={(e) => handleAirplaneChange("max_col_seat", e.target.value, index)}
              />
            </Box>
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAirplaneModalClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSaveAirplane} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>{" "}
      {/* Add News Modal */}
      <Dialog open={newsModalOpen} onClose={handleNewsModalClose} fullWidth>
        <DialogTitle>Add New News</DialogTitle>
        <DialogContent>
          <TextField
            label="Image URL"
            fullWidth
            margin="dense"
            value={newNews.imageUrl}
            onChange={(e) => handleNewsChange("imageUrl", e.target.value)}
          />
          <TextField
            label="Title"
            fullWidth
            margin="dense"
            value={newNews.title}
            onChange={(e) => handleNewsChange("title", e.target.value)}
          />
          <TextField
            label="Content"
            fullWidth
            margin="dense"
            multiline
            rows={4}
            value={newNews.content}
            onChange={(e) => handleNewsChange("content", e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleNewsModalClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSaveNews} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AdminPage;
