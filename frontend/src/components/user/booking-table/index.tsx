import {
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useState } from "react";

interface Ticket {
  id: number;
  ticketId: number;
  flightId: number;
  flightRoute: string;
  departureTime: string;
  arrivalTime: string;
  seatClass: string;
  seatRow: number;
  seatCol: string;
  isPaid: boolean;
  flightStatus: string;
}

const BookingTable = () => {
  const [tickets, setTickets] = useState<Ticket[]>([
    {
      id: 1,
      ticketId: 1,
      flightId: 101,
      flightRoute: "NYC to LA",
      departureTime: "2024-12-01T10:00",
      arrivalTime: "2024-12-01T14:00",
      seatRow: 12,
      seatCol: "A",
      seatClass: "Economy",
      isPaid: true,
      flightStatus: "On Time",
    },
    {
      id: 2,
      ticketId: 2,
      flightId: 102,
      flightRoute: "LA to SF",
      departureTime: "2024-12-02T15:00",
      arrivalTime: "2024-12-02T16:30",
      seatRow: 15,
      seatCol: "B",
      seatClass: "Business",
      isPaid: false,
      flightStatus: "Cancelled",
    },
    {
      id: 3,
      ticketId: 3,
      flightId: 103,
      flightRoute: "SF to SEA",
      departureTime: "2024-12-03T18:00",
      arrivalTime: "2024-12-03T20:30",
      seatRow: 20,
      seatCol: "C",
      seatClass: "First Class",
      isPaid: true,
      flightStatus: "Delayed",
    },
  ]);

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedTicketId, setSelectedTicketId] = useState<number | null>(null);

  const handleCancelTicket = (ticketId: number) => {
    setSelectedTicketId(ticketId);
    setOpenDialog(true);
  };

  const handleConfirmCancel = () => {
    if (selectedTicketId !== null) {
      setTickets((prevTickets) =>
        prevTickets.map((ticket) =>
          ticket.ticketId === selectedTicketId
            ? { ...ticket, flightStatus: "Cancelled" }
            : ticket
        )
      );
    }
    setOpenDialog(false);
    setSelectedTicketId(null);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedTicketId(null);
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "On Time":
        return { color: "green", fontWeight: "bold" };
      case "Delayed":
        return { color: "orange", fontWeight: "bold" };
      case "Cancelled":
        return { color: "red", fontWeight: "bold" };
      default:
        return {};
    }
  };

  return (
    <Box padding={2} bgcolor="rgb(232,232,232)" width="100%">
      {tickets.length === 0 ? (
        <Typography>No tickets found.</Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table
            sx={{
              "& th, & td": {
                borderRight: "1px solid #ccc", // Adds column lines
              },
              "& th:last-child, & td:last-child": {
                borderRight: "none", // Removes line for the last column
              },
            }}
          >
            <TableHead>
              <TableRow sx={{ backgroundColor: "#1e90ff" }}>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                  ID
                </TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                  Flight ID
                </TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                  Route
                </TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                  Departure
                </TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                  Arrival
                </TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                  Seat
                </TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                  Paid
                </TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                  Status
                </TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tickets.map((ticket, index) => (
                <TableRow
                  key={ticket.id}
                  sx={{
                    backgroundColor: index % 2 === 0 ? "#f5f5f5" : "white",
                    height: "70px",
                    "&:hover": {
                      backgroundColor: "#e0f7fa",
                    },
                  }}
                >
                  <TableCell>{ticket.id}</TableCell>
                  <TableCell>{ticket.flightId}</TableCell>
                  <TableCell>{ticket.flightRoute}</TableCell>
                  <TableCell>
                    {new Date(ticket.departureTime).toLocaleString()}
                  </TableCell>
                  <TableCell>
                    {new Date(ticket.arrivalTime).toLocaleString()}
                  </TableCell>
                  <TableCell>
                    {ticket.seatClass} - {ticket.seatRow}
                    {ticket.seatCol}
                  </TableCell>
                  <TableCell>{ticket.isPaid ? "Yes" : "No"}</TableCell>
                  <TableCell style={getStatusStyle(ticket.flightStatus)}>
                    {ticket.flightStatus}
                  </TableCell>
                  <TableCell>
                    {ticket.flightStatus !== "Cancelled" && (
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => handleCancelTicket(ticket.ticketId)}
                      >
                        Cancel Ticket
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Confirmation Dialog */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure you want to cancel this ticket?"}
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            No
          </Button>
          <Button onClick={handleConfirmCancel} color="secondary" autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default BookingTable;
