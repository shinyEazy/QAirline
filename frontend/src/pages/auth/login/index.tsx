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
      <Grid
        item
        xs={12}
        md={6}
        style={{
          backgroundColor: "#fff",
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
        >
          <Box alignItems="start">
            <Typography
              variant="h4"
              gutterBottom
              fontWeight="600"
              fontSize="2.3rem"
            >
              Login
            </Typography>
            <Typography variant="body2">
              <span style={{ opacity: 0.7 }}>Don't have an account? </span>
              <Link
                component={RouterLink}
                to="/auth/signup"
                underline="none"
                sx={{
                  color: "rgb(99,91,255)",
                  "&:hover": {
                    textDecoration: "underline",
                  },
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
                  "& fieldset": {
                    borderColor: "#bdbdbd",
                  },
                  "&:hover fieldset": {
                    borderColor: "black",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "rgb(99,91,255)",
                  },
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
                  "& fieldset": {
                    borderColor: "#bdbdbd",
                  },
                  "&:hover fieldset": {
                    borderColor: "black",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "rgb(99,91,255)",
                  },
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
              href="#"
              variant="body2"
              underline="none"
              style={{
                display: "inline",
                textAlign: "left",
                color: "rgb(99, 91, 255)",
                fontSize: "0.95rem",
                cursor: "pointer",
              }}
              sx={{
                "&:hover": {
                  textDecoration: "underline",
                },
              }}
            >
              Forgot password?
            </Link>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              sx={{
                marginTop: "16px",
                backgroundColor: "rgb(99, 91, 255)",
                borderRadius: "12px",
                textTransform: "none",
                padding: "8px",
                "&:hover": {
                  backgroundColor: "rgb(78, 54, 245)",
                  boxShadow: "none",
                  transition: "transform 0.3s ease, background-color 0.3s ease",
                },
              }}
            >
              Login
            </Button>
          </Box>
        </Box>
      </Grid>

      <Grid
        item
        xs={12}
        md={6}
        style={{
          backgroundColor: "#1c1c2b",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "#fff",
        }}
      >
        <Box textAlign="center" padding={3}>
          <Typography variant="h4" gutterBottom>
            Welcome to QAirline
          </Typography>

          <img
            src="https://via.placeholder.com/400"
            alt="tmp"
            style={{ marginTop: "20px", borderRadius: "8px", maxWidth: "80%" }}
          />
        </Box>
      </Grid>
    </Grid>
  );
};

export default Login;
