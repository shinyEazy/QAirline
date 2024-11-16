import React, { useState } from "react";
import {
  Grid,
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
} from "@mui/material";
import ArrowBack from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

const Recovery = () => {
  const navigate = useNavigate();

  return (
    <Grid container style={{ minHeight: "100vh" }}>
      {/* Left Section */}
      <Grid
        item
        xs={12}
        md={6}
        style={{
          background: "linear-gradient(to bottom, #87ceeb, #1e90ff)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          display="flex"
          flexDirection="column"
          padding={3}
          width="100%"
          maxWidth={450}
          bgcolor="#ffffff"
          borderRadius="12px"
          boxShadow="0 4px 20px rgba(0, 0, 0, 0.1)"
        >
          <IconButton
            onClick={() => navigate("/auth/login")}
            edge="start"
            sx={{
              width: "48px",
              marginBottom: "20px",
              color: "#1e90ff",
              "&:hover": { backgroundColor: "#e6f7ff" },
            }}
          >
            <ArrowBack />
          </IconButton>
          <Typography
            variant="h4"
            gutterBottom
            fontWeight="500"
            color="primary"
          >
            Reset Password
          </Typography>
          <Typography variant="body2" color="textSecondary" mb={3}>
            Enter your email address, and we'll send you a link to reset your
            password.
          </Typography>
          <Box component="form" noValidate mt={2}>
            <TextField
              fullWidth
              label="Email address"
              variant="outlined"
              sx={{
                margin: "10px auto",
                "& .MuiOutlinedInput-root": {
                  borderRadius: "8px",
                  "& fieldset": { borderColor: "#b0c4de" },
                  "&:hover fieldset": { borderColor: "#1e90ff" },
                  "&.Mui-focused fieldset": { borderColor: "#1e90ff" },
                },
              }}
            />
            <Button
              fullWidth
              variant="contained"
              sx={{
                marginTop: "16px",
                background: "linear-gradient(to right, #1e90ff, #87ceeb)",
                borderRadius: "12px",
                textTransform: "none",
                padding: "8px",
                color: "#ffffff",
                fontWeight: "500",
                "&:hover": {
                  background: "linear-gradient(to right, #1c86ee, #4682b4)",
                  boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
                  transform: "translateY(-2px)",
                  transition: "all 0.3s ease",
                },
              }}
            >
              Send Recovery Link
            </Button>
          </Box>
        </Box>
      </Grid>

      {/* Right Section */}
      <Grid
        item
        xs={12}
        md={6}
        style={{
          backgroundColor: "#f0f8ff",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "#1e90ff",
          flexDirection: "column",
          padding: "20px",
        }}
      >
        <Typography variant="h3" sx={{ fontWeight: "500" }}>
          Welcome to
        </Typography>
        <img
          src="/logo2.png"
          style={{ width: "100%", maxWidth: "400px" }}
          alt="Brand Logo"
        />
        <img
          src="/globe.png"
          alt="World Illustration"
          style={{ marginTop: "20px", borderRadius: "8px", maxWidth: "80%" }}
        />
      </Grid>
    </Grid>
  );
};

export default Recovery;
