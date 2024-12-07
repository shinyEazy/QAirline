import React from "react";
import {
  Box,
  Typography,
  List,
  ListItemButton,
  ListItemText,
  Avatar,
} from "@mui/material";
import { useLocation } from "react-router-dom";
import PaymentIcon from "@mui/icons-material/Payment";
import HistoryIcon from "@mui/icons-material/History";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isActive = (path: string) => location.pathname === path;

  return (
    <Box
      sx={{
        minWidth: "260px",
        backgroundColor: "rgb(245,245,245)",
        display: "flex",
        flexDirection: "column",
        padding: 2,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Box justifyContent="center" width="100%" textAlign="center">
          <Typography
            variant="subtitle1"
            sx={{ fontWeight: "500", fontSize: "1rem" }}
          >
            Welcome to your dashboard!
          </Typography>
        </Box>
      </Box>

      {/* Navigation Links */}
      <List>
        <ListItemButton
          onClick={() => navigate("/user/1/booked-tickets")}
          sx={{
            backgroundColor: isActive("/user/1/booked-tickets")
              ? "#1e90ff"
              : "transparent",
            color: isActive("/user/1/booked-tickets") ? "white" : "black",

            textTransform: "none",
            fontSize: "1rem",
            fontWeight: "bold",
            borderRadius: "8px",
            padding: "10px 20px",
            marginBottom: "4px",
            transition: "all 0.3s ease",
            "&:hover": { backgroundColor: "#1e90ff", color: "white" },
          }}
        >
          <PaymentIcon sx={{ marginRight: 1 }} />
          <ListItemText primary="Booked Tickets" />
        </ListItemButton>
        <ListItemButton
          onClick={() => navigate("/user/1/payment-history")}
          sx={{
            backgroundColor: isActive("/user/1/payment-history")
              ? "#1e90ff"
              : "transparent",
            color: isActive("/user/1/payment-history") ? "white" : "black",
            textTransform: "none",
            fontSize: "1rem",
            fontWeight: "bold",
            borderRadius: "8px",
            padding: "10px 20px",
            marginBottom: "4px",
            transition: "all 0.3s ease",
            "&:hover": { backgroundColor: "#1e90ff", color: "white" },
          }}
        >
          <HistoryIcon sx={{ marginRight: 1 }} />
          <ListItemText primary="Payment History" />
        </ListItemButton>
        <ListItemButton
          sx={{
            color: "black",
            textTransform: "none",
            fontSize: "1rem",
            fontWeight: "bold",
            borderRadius: "8px",
            padding: "10px 20px",
            transition: "all 0.3s ease",
            "&:hover": { backgroundColor: "#1e90ff", color: "white" },
          }}
        >
          <LogoutIcon sx={{ marginRight: 1 }} />
          <ListItemText primary="Sign out" />
        </ListItemButton>
      </List>
    </Box>
  );
};

export default Sidebar;
