import React, { useState } from "react";
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
} from "@mui/material";

interface Payment {
  id: number;
  paymentId: string;
  date: string;
  amount: number;
  method: string;
  status: string;
}

const PaymentHistory = () => {
  const [payments, setPayments] = useState<Payment[]>([
    {
      id: 1,
      paymentId: "TXN001",
      date: "2024-12-01",
      amount: 120.5,
      method: "Credit Card",
      status: "Completed",
    },
    {
      id: 2,
      paymentId: "TXN002",
      date: "2024-12-03",
      amount: 85.0,
      method: "PayPal",
      status: "Pending",
    },
    {
      id: 3,
      paymentId: "TXN003",
      date: "2024-12-05",
      amount: 200.75,
      method: "Debit Card",
      status: "Failed",
    },
  ]);

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "Completed":
        return { color: "green", fontWeight: "bold" };
      case "Pending":
        return { color: "orange", fontWeight: "bold" };
      case "Failed":
        return { color: "red", fontWeight: "bold" };
      default:
        return {};
    }
  };

  return (
    <Box padding={2} bgcolor="rgb(232,232,232)" width="100%">
      {payments.length === 0 ? (
        <Typography>No payment history found.</Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table
            sx={{
              "& th, & td": {
                borderRight: "1px solid #ccc",
              },
              "& th:last-child, & td:last-child": {
                borderRight: "none",
              },
            }}
          >
            <TableHead>
              <TableRow sx={{ backgroundColor: "#1e90ff" }}>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                  ID
                </TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                  Payment ID
                </TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                  Date
                </TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                  Amount ($)
                </TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                  Method
                </TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                  Status
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {payments.map((payment, index) => (
                <TableRow
                  key={payment.id}
                  sx={{
                    backgroundColor: index % 2 === 0 ? "#f5f5f5" : "white",
                    height: "70px",
                    "&:hover": {
                      backgroundColor: "#e0f7fa",
                    },
                  }}
                >
                  <TableCell>{payment.id}</TableCell>
                  <TableCell>{payment.paymentId}</TableCell>
                  <TableCell>
                    {new Date(payment.date).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{payment.amount.toFixed(2)}</TableCell>
                  <TableCell>{payment.method}</TableCell>
                  <TableCell style={getStatusStyle(payment.status)}>
                    {payment.status}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default PaymentHistory;
