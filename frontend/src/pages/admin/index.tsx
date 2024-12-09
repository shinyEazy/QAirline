import { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import FlightList from "../../components/admin/flight-list";
import { createFlight } from "../../hooks/flight-hook";
const AdminPage = () => {
  const [flightModalOpen, setFlightModalOpen] = useState(false);
  const [airplaneModalOpen, setAirplaneModalOpen] = useState(false);
  const [newsModalOpen, setNewsModalOpen] = useState(false);

  const [newFlight, setNewFlight] = useState({
    flightNumber: "",
    airplaneRegistrationNumber: "",
    departure: "",
    destination: "",
    departureTime: "",
    arrivalTime: "",
    price: 0.0,
  });

  const [newAirplane, setNewAirplane] = useState({
    airplaneId: "",
  });

  const [newNews, setNewNews] = useState({
    imageUrl: "",
    title: "",
    content: "",
  });

  const handleFlightModalOpen = () => {
    setFlightModalOpen(true);
  };

  const handleFlightModalClose = () => {
    setFlightModalOpen(false);
    setNewFlight({
      flightNumber: "",
      airplaneRegistrationNumber: "",
      departure: "",
      destination: "",
      departureTime: "",
      arrivalTime: "",
      price: 0.0,
    });
  };

  const handleAirplaneModalOpen = () => {
    setAirplaneModalOpen(true);
  };

  const handleAirplaneModalClose = () => {
    setAirplaneModalOpen(false);
    setNewAirplane({
      airplaneId: "",
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

  const handleFlightChange = (field: string, value: string) => {
    setNewFlight({ ...newFlight, [field]: value });
  };

  const handleAirplaneChange = (value: string) => {
    setNewAirplane({ ...newAirplane, airplaneId: value });
  };

  const handleNewsChange = (field: string, value: string) => {
    setNewNews({ ...newNews, [field]: value });
  };

  const handleSaveFlight = async () => {
    try {
      const payload = {
        flight_number: newFlight.flightNumber,
        registration_number: newFlight.airplaneRegistrationNumber,
        estimated_departure_time: newFlight.departureTime,
        estimated_arrival_time: newFlight.arrivalTime,
        destination_airport_id: 30, // Assuming it's a number
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
          <TextField
            label="Airplane Registration Number"
            fullWidth
            margin="dense"
            value={newFlight.airplaneRegistrationNumber}
            onChange={(e) => handleFlightChange("airplaneRegistrationNumber", e.target.value)}
          />
          <TextField
            label="Departure"
            fullWidth
            margin="dense"
            value={newFlight.departure}
            onChange={(e) => handleFlightChange("departure", e.target.value)}
          />
          <TextField
            label="Destination"
            fullWidth
            margin="dense"
            value={newFlight.destination}
            onChange={(e) => handleFlightChange("destination", e.target.value)}
          />
          <TextField
            label="Departure Time"
            fullWidth
            margin="dense"
            value={newFlight.departureTime}
            onChange={(e) =>
              handleFlightChange("departureTime", e.target.value)
            }
          />
          <TextField
            label="Arrival Time"
            fullWidth
            margin="dense"
            value={newFlight.arrivalTime}
            onChange={(e) => handleFlightChange("arrivalTime", e.target.value)}
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
            label="Airplane Registration Number"
            fullWidth
            margin="dense"
            value={newAirplane.airplaneId}
            onChange={(e) => handleAirplaneChange(e.target.value)}
          />
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
