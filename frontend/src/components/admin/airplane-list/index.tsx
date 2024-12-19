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
  TextField,
} from "@mui/material";
import { fetchAirplane } from "hooks/airplane-hook";
import { useState, useEffect } from "react";
import { Airplanes } from "types/airplane";

const AirplaneList = () => {
  const [airplaneData, setAirplaneData] = useState<Airplanes[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedAirplane, setSelectedAirplane] = useState<Airplanes | null>(
    null
  );

  useEffect(() => {
    const loadAirplane = async () => {
      try {
        const airplanes = await fetchAirplane();
        setAirplaneData(airplanes);
      } catch (err) {
        console.error("Error fetching airports", err);
      }
    };

    loadAirplane();
  }, []);

  const handleEditClick = (airplane: Airplanes) => {
    setSelectedAirplane({ ...airplane });
    setDialogOpen(true);
  };

  const handleSave = () => {
    if (selectedAirplane) {
      setAirplaneData((prevData) =>
        prevData.map((airplane) =>
          airplane.airplane_id === selectedAirplane.airplane_id
            ? { ...selectedAirplane }
            : airplane
        )
      );
    }
    setDialogOpen(false);
    setSelectedAirplane(null);
  };

  const handleChange = (field: keyof Airplanes, value: string | number) => {
    setSelectedAirplane((prev) => (prev ? { ...prev, [field]: value } : null));
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
                  {airplane.total_seats}
                </TableCell>
                <TableCell
                  sx={{ border: "1px solid #ddd", textAlign: "center" }}
                >
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleEditClick(airplane)}
                  >
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} fullWidth>
        <DialogTitle>Edit Airplane</DialogTitle>
        <DialogContent>
          <TextField
            label="Model"
            fullWidth
            margin="dense"
            value={selectedAirplane?.airplane_model || ""}
            onChange={(e) => handleChange("airplane_model", e.target.value)}
          />
          <TextField
            label="Registration Number"
            fullWidth
            margin="dense"
            value={selectedAirplane?.registration_number || ""}
            onChange={(e) =>
              handleChange("registration_number", e.target.value)
            }
          />
          <TextField
            label="Manufacturer"
            fullWidth
            margin="dense"
            value={selectedAirplane?.manufacturer || ""}
            onChange={(e) => handleChange("manufacturer", e.target.value)}
          />
          <TextField
            label="Capacity"
            fullWidth
            margin="dense"
            value={selectedAirplane?.total_seats || ""}
            onChange={(e) =>
              handleChange("total_seats", Number(e.target.value))
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)} color="secondary">
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

export default AirplaneList;
