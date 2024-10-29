import React from "react";
import {
  Grid,
  Box,
  Typography,
  TextField,
  Button,
  Link,
  IconButton,
} from "@mui/material";
import ArrowBack from "@mui/icons-material/ArrowBack"; // Importing ArrowBack icon
import { useNavigate } from "react-router-dom"; // Importing useNavigate hook

const Recovery = () => {
  const navigate = useNavigate();

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
          {" "}
          <IconButton
            onClick={() => navigate("/auth/login")}
            edge="start"
            sx={{ width: "48px", marginBottom: "20px" }}
          >
            <ArrowBack />
          </IconButton>
          <Box
            alignItems="start"
            display="flex"
            style={{ alignItems: "center" }}
          >
            <Typography variant="h4" fontWeight="400" fontSize="2.3rem">
              Reset password
            </Typography>
          </Box>
          <Box component="form" noValidate mt={2}>
            <TextField
              fullWidth
              label="Email address"
              variant="outlined"
              sx={{
                margin: "auto",
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
              Send recovery link
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

export default Recovery;
