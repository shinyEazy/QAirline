import React, { useState } from "react";
import {
  Grid,
  Box,
  Typography,
  TextField,
  Button,
  Link,
  InputAdornment,
  IconButton,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import FacebookIcon from "@mui/icons-material/Facebook";
import GoogleIcon from "@mui/icons-material/Google";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { Link as RouterLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <Grid container style={{ minHeight: "100vh" }}>
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: -1,
        }}
      >
        <source src="/live.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      {/* Left Section with Video Background */}
      <Grid
        item
        xs={12}
        md={6}
        style={{
          position: "relative",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          overflow: "hidden",
          backgroundColor: "#f8f8f2",
        }}
      >
        {/* Content Box */}
        <Box
          display="flex"
          flexDirection="column"
          padding={3}
          width="100%"
          maxWidth={450}
          bgcolor="rgba(255, 255, 255, 0.85)"
          borderRadius="12px"
          boxShadow="0 4px 20px rgba(0, 0, 0, 0.1)"
        >
          <Box display="flex" justifyContent="center" mb={2}>
            <Typography
              variant="h3"
              gutterBottom
              fontWeight="500"
              color="primary"
            >
              Login
            </Typography>
          </Box>
          <Box component="form" noValidate>
            <TextField
              fullWidth
              label="Email"
              variant="outlined"
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
              type={showPassword ? "text" : "password"}
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

            {/* Remember Me and Forgot Password Row */}
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              mt={1}
            >
              <FormControlLabel
                control={<Checkbox color="primary" />}
                label="Remember me"
              />
              <Link
                component={RouterLink}
                to="/auth/recovery"
                underline="none"
                sx={{
                  color: "#1e90ff",
                  fontSize: "1rem",
                  "&:hover": { textDecoration: "underline" },
                }}
              >
                Forgot password?
              </Link>
            </Box>
            <Box display="flex" justifyContent="center">
              <Button
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

          {/* Divider */}
          <Typography
            textAlign="center"
            marginTop={3}
            color="textSecondary"
            fontSize="1rem"
          >
            or use your account
          </Typography>

          {/* Social Login Icons */}
          <Box display="flex" justifyContent="center" gap={2} marginTop={2}>
            <IconButton
              sx={{
                backgroundColor: "#3b5998",
                color: "#fff",
                "&:hover": { backgroundColor: "#2d4373" },
              }}
            >
              <FacebookIcon />
            </IconButton>
            <IconButton
              sx={{
                backgroundColor: "#db4437",
                color: "#fff",
                "&:hover": { backgroundColor: "#a33327" },
              }}
            >
              <GoogleIcon />
            </IconButton>
            <IconButton
              sx={{
                backgroundColor: "#0077b5",
                color: "#fff",
                "&:hover": { backgroundColor: "#005582" },
              }}
            >
              <LinkedInIcon />
            </IconButton>
          </Box>
        </Box>
      </Grid>
      <Grid
        item
        xs={12}
        md={6}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "white",
          flexDirection: "column",
          padding: "20px",
        }}
      >
        <Box textAlign="center" mt={4}>
          <Typography
            variant="h2"
            sx={{
              fontWeight: "500",
              color: "#ffffff",
              textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
              mb: 2,
            }}
          >
            Start your
            <Typography
              variant="h2"
              component="span"
              sx={{
                display: "block",
                fontWeight: "inherit",
                color: "inherit",
                textShadow: "inherit",
              }}
            >
              journey now
            </Typography>
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "rgba(255, 255, 255, 0.85)",
              textShadow: "1px 1px 3px rgba(0, 0, 0, 0.5)",
              mb: 3,
            }}
          >
            If you don't have an account yet, join us
            <span style={{ display: "block" }}>and start your journey</span>
          </Typography>
          <Button
            onClick={() => navigate("/auth/signup")}
            sx={{
              width: "300px",
              position: "relative",
              padding: "12px 24px",
              textTransform: "none",
              fontWeight: "500",
              fontSize: "1rem",
              color: "#ffffff",
              background: "rgba(255, 255, 255, 0.2)",
              border: "2px solid #ffffff",
              borderRadius: "50px",
              overflow: "hidden",
              transition: "all 0.3s ease-in-out",
              "&:hover": {
                background: "rgba(255, 255, 255, 0.3)",
                transform: "scale(1.05)",
                "&::after": {
                  transform: "translateX(0)",
                  opacity: 1,
                },
              },
              "&::after": {
                content: "'→'",
                position: "absolute",
                right: "32px",
                bottom: "2px",
                opacity: 0,
                transform: "translateX(-10px)",
                transition: "all 0.3s ease-in-out",
                fontSize: "1.9rem",
                fontWeight: "bold",
              },
            }}
          >
            Sign up
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Login;
