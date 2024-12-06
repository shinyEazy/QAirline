import React, { useState } from "react";
import { Grid, Box, Typography, TextField, Button, Link } from "@mui/material";
import { Checkbox, FormControlLabel } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { handleUserAuthentication } from "hooks/auth-hook";
import { handleUserSignup } from "hooks/user-hook";

const SignUp = () => {
  const [checked, setChecked] = React.useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("")
  const handleChange = (event: any) => {
    setChecked(event.target.checked);
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
              Sign up
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Already have an account?{" "}
              <Link
                component={RouterLink}
                to="/auth/login"
                underline="none"
                sx={{
                  color: "#1e90ff",
                  fontWeight: "500",
                  "&:hover": { textDecoration: "underline" },
                }}
              >
                Login
              </Link>
            </Typography>
          </Box>
          <Box component="form" noValidate mt={2}>
            <TextField
              fullWidth
              label="First name"
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
              label="Last name"
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
              label="Username"
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
              type="password"
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
              label="Confirm password"
              variant="outlined"
              margin="normal"
              type="password"
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
            <FormControlLabel
              control={
                <Checkbox
                  checked={checked}
                  onChange={handleChange}
                  color="primary"
                />
              }
              label={
                <span>
                  I have read the{" "}
                  <Link
                    href="#"
                    underline="none"
                    sx={{
                      color: "#1e90ff",
                      fontSize: "1rem",
                      "&:hover": { textDecoration: "underline" },
                    }}
                  >
                    terms and conditions
                  </Link>
                </span>
              }
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
              Sign up
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

export default SignUp;
