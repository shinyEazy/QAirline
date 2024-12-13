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
import { useState, useEffect } from "react";

interface Airplane {
  airplane_id: number;
  airplane_model: string;
  registration_number: string;
  manufacturer: string;
  capacity: number;
}

const mockAirplaneData: Airplane[] = [
  {
    airplane_id: 1,
    airplane_model: "Boeing 737",
    registration_number: "N12345",
    manufacturer: "Boeing",
    capacity: 200,
  },
  {
    airplane_id: 2,
    airplane_model: "Airbus A320",
    registration_number: "A54321",
    manufacturer: "Airbus",
    capacity: 180,
  },
  {
    airplane_id: 3,
    airplane_model: "Boeing 747",
    registration_number: "B98765",
    manufacturer: "Boeing",
    capacity: 400,
  },
  {
    airplane_id: 4,
    airplane_model: "Embraer E190",
    registration_number: "E67890",
    manufacturer: "Embraer",
    capacity: 100,
  },
];

const AirplaneList = () => {
  const [airplaneData, setAirplaneData] = useState<Airplane[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedAirplaneId, setSelectedAirplaneId] = useState<number | null>(
    null
  );

  useEffect(() => {
    // Simulate fetching airplane data
    setAirplaneData(mockAirplaneData);
  }, []);

  const handleDeleteClick = (airplane_id: number) => {
    setSelectedAirplaneId(airplane_id);
    setDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (selectedAirplaneId !== null) {
      setAirplaneData((prevData) =>
        prevData
          .filter((airplane) => airplane.airplane_id !== selectedAirplaneId)
          .map((airplane, index) => ({ ...airplane, airplane_id: index + 1 }))
      );
      setSelectedAirplaneId(null);
    }
    setDialogOpen(false);
  };

  const handleCancelDelete = () => {
    setSelectedAirplaneId(null);
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
                Airplane ID
              </TableCell>
              <TableCell
                sx={{
                  color: "white",
                  fontWeight: "bold",
                  border: "1px solid #ddd",
                  textAlign: "center",
                }}
              >
                Model
              </TableCell>
              <TableCell
                sx={{
                  color: "white",
                  fontWeight: "bold",
                  border: "1px solid #ddd",
                  textAlign: "center",
                }}
              >
                Registration Number
              </TableCell>
              <TableCell
                sx={{
                  color: "white",
                  fontWeight: "bold",
                  border: "1px solid #ddd",
                  textAlign: "center",
                }}
              >
                Manufacturer
              </TableCell>
              <TableCell
                sx={{
                  color: "white",
                  fontWeight: "bold",
                  border: "1px solid #ddd",
                  textAlign: "center",
                }}
              >
                Capacity
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
            {airplaneData.map((airplane, index) => (
              <TableRow
                key={airplane.airplane_id}
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
                  {airplane.airplane_id}
                </TableCell>
                <TableCell
                  sx={{ border: "1px solid #ddd", textAlign: "center" }}
                >
                  {airplane.airplane_model}
                </TableCell>
                <TableCell
                  sx={{ border: "1px solid #ddd", textAlign: "center" }}
                >
                  {airplane.registration_number}
                </TableCell>
                <TableCell
                  sx={{ border: "1px solid #ddd", textAlign: "center" }}
                >
                  {airplane.manufacturer}
                </TableCell>
                <TableCell
                  sx={{ border: "1px solid #ddd", textAlign: "center" }}
                >
                  {airplane.capacity}
                </TableCell>
                <TableCell
                  sx={{ border: "1px solid #ddd", textAlign: "center" }}
                >
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleDeleteClick(airplane.airplane_id)}
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
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this airplane?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="error" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AirplaneList;
