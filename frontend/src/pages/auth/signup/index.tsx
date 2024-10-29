import React, { useState } from "react";
import { Grid, Box, Typography, TextField, Button, Link } from "@mui/material";
import { Checkbox, FormControlLabel } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

const SignUp = () => {
  const [checked, setChecked] = React.useState(false);

  const handleChange = (event: any) => {
    setChecked(event.target.checked);
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
              Sign up
            </Typography>
            <Typography variant="body2">
              <span style={{ opacity: 0.7 }}>Already have an account? </span>
              <Link
                component={RouterLink}
                to="/auth/login"
                underline="none"
                sx={{
                  color: "rgb(99, 91, 255)",
                  "&:hover": {
                    textDecoration: "underline",
                  },
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
              label="Last name"
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
              type="password"
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
              label="Confirm password"
              variant="outlined"
              margin="normal"
              type="password"
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
            <FormControlLabel
              control={
                <Checkbox
                  checked={checked}
                  onChange={handleChange}
                  color="primary" // You can customize the color
                />
              }
              label={
                <span>
                  I have read the{" "}
                  <Link
                    href="#"
                    underline="none"
                    sx={{
                      color: "rgb(99,91,255)",
                      "&:hover": {
                        textDecoration: "underline",
                      },
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
              Sign up
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

export default SignUp;
