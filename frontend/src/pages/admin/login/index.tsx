import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Link,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { handleUserAuthentication } from "hooks/auth-hook";
const AdminLogin = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleLoginSubmission = async () => {
    try {
      await handleUserAuthentication(username, password);
      navigate("/admin");
    } catch (err) {
      console.error("Error authenticating user", err);
    }
  };
  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/admin/login');
  }
  return (
    <Box margin="auto" height="100vh">
      <Box
        display="flex"
        flexDirection="column"
        padding={3}
        width="100%"
        height="100%"
        bgcolor="white"
        justifyContent="center"
        alignItems="center"
      // sx={{
      //   background: "linear-gradient(to right, #b0c4de, #d3d3d3)",
      // }}
      >
        <Box component="form" noValidate maxWidth="450px">
          <Box display="flex" justifyContent="center" mb={2}>
            <Typography variant="h3" fontWeight="500" color="#1e90ff">
              Login
            </Typography>
          </Box>
          <TextField
            fullWidth
            label="Username"
            variant="outlined"
            onChange={(e) => setUsername(e.target.value)}
            sx={{
              margin: "10px auto",
              "& .MuiOutlinedInput-root": {
                borderRadius: "8px",
                backgroundColor: "#f0f8ff",
                "& fieldset": { borderColor: "#b0c4de" },
                "&:hover fieldset": { borderColor: "#1e90ff" },
                "&.Mui-focused fieldset": { borderColor: "#1e90ff" },
              },
            }}
          />
          <TextField
            fullWidth
            label="Password"
            variant="outlined"
            margin="normal"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            sx={{
              margin: "10px auto 20px",
              "& .MuiOutlinedInput-root": {
                borderRadius: "8px",
                backgroundColor: "#f0f8ff",
                "& fieldset": { borderColor: "#b0c4de" },
                "&:hover fieldset": { borderColor: "#1e90ff" },
                "&.Mui-focused fieldset": { borderColor: "#1e90ff" },
              },
            }}
          />

          <Box display="flex" justifyContent="center" width="100%">
            <Button
              onClick={handleLoginSubmission}
              variant="contained"
              sx={{
                marginTop: "20px",
                width: "60%",
                position: "relative",
                padding: "12px 24px",
                textTransform: "none",
                fontWeight: "500",
                fontSize: "1rem",
                color: "#ffffff",
                background: "linear-gradient(to right, #1e90ff, #87ceeb)",
                border: "2px solid transparent",
                borderRadius: "50px",
                overflow: "hidden",
                transition: "all 0.3s ease-in-out",
                "&:hover": {
                  background: "linear-gradient(to right, #1c86ee, #4682b4)",
                  transform: "scale(1.05)",
                  "&::after": {
                    transform: "translateX(0)",
                    opacity: 1,
                  },
                },
              }}
            >
              Login
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default AdminLogin;
