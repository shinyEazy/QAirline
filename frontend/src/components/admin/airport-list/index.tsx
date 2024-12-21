import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { deleteAirport, fetchAirport } from "hooks/airport-hook";
import { useState, useEffect } from "react";
import { Airport } from "types/airport";
import { toast } from "react-toastify";

const AirportList = () => {
  const [airportData, setAirportData] = useState<Airport[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedAirportId, setSelectedAirportId] = useState<number | null>(
    null
  );

  useEffect(() => {
    const loadAirport = async () => {
      try {
        const airports = await fetchAirport();
        setAirportData(airports);
      } catch (err) {
        console.error("Error fetching airports", err);
      }
    };

    loadAirport();
  }, []);

  const handleDeleteClick = async (airport_id: number) => {
    try {
      const response = await deleteAirport(airport_id);
      console.log("Delete airport", response);
      setSelectedAirportId(airport_id);
    } catch (err) {
      console.error("Error deleting airport", err);
    }
    setDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (selectedAirportId !== null) {
      setAirportData((prevData) =>
        prevData
          .filter((airport) => airport.airport_id !== selectedAirportId)
          .map((airport, index) => ({ ...airport, airport_id: index + 1 }))
      );
      setSelectedAirportId(null);
    }
    setDialogOpen(false);
    toast.dismiss();
    toast.success("Airport deleted successfully!");
  };

  const handleCancelDelete = () => {
    setSelectedAirportId(null);
    setDialogOpen(false);
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
                Airport ID
              </TableCell>
              <TableCell
                sx={{
                  color: "white",
                  fontWeight: "bold",
                  border: "1px solid #ddd",
                  textAlign: "center",
                }}
              >
                Airport Code
              </TableCell>
              <TableCell
                sx={{
                  color: "white",
                  fontWeight: "bold",
                  border: "1px solid #ddd",
                  textAlign: "center",
                }}
              >
                City
              </TableCell>
              <TableCell
                sx={{
                  color: "white",
                  fontWeight: "bold",
                  border: "1px solid #ddd",
                  textAlign: "center",
                }}
              >
                Name
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
            {airportData.map((airport, index) => (
              <TableRow
                key={airport.airport_id}
                sx={{
                  backgroundColor: index % 2 === 0 ? "#f9f9f9" : "white",
                  "&:hover": {
                    backgroundColor: "#e0f7fa",
                  },
                }}
              >
                <TableCell
                  sx={{ border: "1px solid #ddd", textAlign: "center" }}
                >
                  {airport.airport_id}
                </TableCell>
                <TableCell
                  sx={{ border: "1px solid #ddd", textAlign: "center" }}
                >
                  {airport.airport_code}
                </TableCell>
                <TableCell
                  sx={{ border: "1px solid #ddd", textAlign: "center" }}
                >
                  {airport.city}
                </TableCell>
                <TableCell
                  sx={{ border: "1px solid #ddd", textAlign: "center" }}
                >
                  {airport.name}
                </TableCell>
                <TableCell
                  sx={{ border: "1px solid #ddd", textAlign: "center" }}
                >
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleDeleteClick(airport.airport_id)}
                    sx={{ boxShadow: "none" }}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={dialogOpen} onClose={handleCancelDelete}>
        <DialogTitle sx={{ fontWeight: "bold", color: "#1e90ff" }}>
          Confirm Delete
        </DialogTitle>
        <DialogContent>
          Are you sure you want to delete this airport?
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCancelDelete}
            color="primary"
            sx={{ fontWeight: "bold" }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirmDelete}
            color="error"
            sx={{ fontWeight: "bold" }}
            autoFocus
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AirportList;
