import React, { useState } from "react";
import { Grid, Box, Typography, TextField, Button, Link } from "@mui/material";
import { InputAdornment, IconButton } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Link as RouterLink } from "react-router-dom";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

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
          <Box alignItems="start">
            <Typography
              variant="h4"
              gutterBottom
              fontWeight="500"
              color="primary"
            >
              Login
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Don't have an account?{" "}
              <Link
                component={RouterLink}
                to="/auth/signup"
                underline="none"
                sx={{
                  color: "#1e90ff",
                  fontWeight: "500",
                  "&:hover": { textDecoration: "underline" },
                }}
              >
                Sign up
              </Link>
            </Typography>
          </Box>
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
            <TextField
              fullWidth
              label="Password"
              variant="outlined"
              margin="normal"
              type={showPassword ? "text" : "password"}
              sx={{
                margin: "10px auto 20px",
                "& .MuiOutlinedInput-root": {
                  borderRadius: "8px",
                  "& fieldset": { borderColor: "#b0c4de" },
                  "&:hover fieldset": { borderColor: "#1e90ff" },
                  "&.Mui-focused fieldset": { borderColor: "#1e90ff" },
                },
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleClickShowPassword}
                      edge="end"
                      aria-label="toggle password visibility"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Link
              component={RouterLink}
              to="/auth/recovery"
              underline="none"
              sx={{
                color: "#1e90ff",
                fontSize: "0.95rem",
                "&:hover": { textDecoration: "underline" },
              }}
            >
              Forgot password?
            </Link>
            <Button
              fullWidth
              variant="contained"
              sx={{
                marginTop: "16px",
                backgroundColor: "#1e90ff",
                borderRadius: "12px",
                textTransform: "none",
                padding: "8px",
                color: "#ffffff",
                fontWeight: "500",
                "&:hover": {
                  backgroundColor: "#4682b4",
                  boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
                  transform: "translateY(-2px)",
                  transition: "all 0.3s ease",
                },
              }}
            >
              Login
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
        ></img>

        <img
          src="/globe.png"
          alt="tmp"
          style={{ marginTop: "20px", borderRadius: "8px", maxWidth: "80%" }}
        />
      </Grid>
    </Grid>
  );
};

export default Login;
