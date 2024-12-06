import React, { useState } from "react";
import {
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
import "../login/login.css";
import { useEffect } from "react";
import { handleUserAuthentication } from "hooks/auth-hook";
import { handleUserSignup } from "hooks/user-hook";
const Login = () => {
  const [checked, setChecked] = React.useState(false);
  const [isRightPanelActive, setIsRightPanelActive] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("")
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("")
  const [error, setError] = useState("");

  const handleSignupSubmission = async () => {
    setError(''); // Reset error message 
    try {
      await handleUserSignup(firstname, lastname, username, password); // Handle successful signup (e.g., show success message or redirect) 
    } catch (err) { setError(err.message); }
  };

  const handleLoginSubmission = async () => {
    setError('');
    try {
      await handleUserAuthentication(username, password);
    } catch (err) { setError(err.message) }
  }
  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleChange = (event: any) => {
    setChecked(event.target.checked);
  };

  const handleRegisterClick = () => {
    setIsRightPanelActive(true);
  };

  const handleLoginClick = () => {
    setIsRightPanelActive(false);
  };


  const [isMobile, setIsMobile] = useState(window.innerWidth < 750);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 750);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <div
      className={`container ${isRightPanelActive ? "right-panel-active" : ""}`}
      id="container"
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <video
        autoPlay
        loop
        muted
        className="background-video"
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

      <Box>
        {/* Register Form */}
        <Box className="form-container register-container">
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
                  Sign up
                </Typography>
              </Box>
              <TextField
                fullWidth
                label="First name"
                variant="outlined"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}

                sx={{
                  borderRadius: "8px",
                  margin: "10px auto",
                  backgroundColor: "#f0f8ff",
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
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}

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
                label="Username"
                variant="outlined"
                value={username}
                onChange={(e) => setUsername(e.target.value)}

                sx={{
                  borderRadius: "8px",
                  margin: "10px auto",
                  backgroundColor: "#f0f8ff",
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}

                sx={{
                  borderRadius: "8px",
                  margin: "10px auto",
                  backgroundColor: "#f0f8ff",
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
                  borderRadius: "8px",
                  margin: "10px auto",
                  backgroundColor: "#f0f8ff",
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "8px",
                    "& fieldset": { borderColor: "#b0c4de" },
                    "&:hover fieldset": { borderColor: "#1e90ff" },
                    "&.Mui-focused fieldset": { borderColor: "#1e90ff" },
                  },
                }}
              />
              <Box width="100%" display="flex" justifyContent="start">
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
              </Box>
              <Box display="flex" justifyContent="center" width="100%">
                <Button
                  className="auth-button"
                  variant="contained"

                  onClick={handleSignupSubmission}
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
                  Sign up
                </Button>
              </Box>

              <Typography textAlign="center" marginTop={2} fontSize="1rem" sx={{ color: "#ff0000" }}>
                {error}
              </Typography>
              <Typography textAlign="center" marginTop={2} fontSize="1rem">
                or use your account
              </Typography>
              <Box display="flex" justifyContent="center" gap={2} marginTop={1}>
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
              {isMobile && (
                <Box>
                  <Typography textAlign="center" marginTop={1} fontSize="1rem">
                    Already have an account?{" "}
                    <span
                      onClick={handleLoginClick}
                      style={{
                        cursor: "pointer",
                        textDecoration: "none",
                        borderBottom: "1px solid transparent",
                        transition: "border-color 0.3s",
                      }}
                      onMouseEnter={(e) =>
                        (e.target.style.borderBottom = "2px solid #000")
                      }
                      onMouseLeave={(e) =>
                        (e.target.style.borderBottom = "2px solid transparent")
                      }
                    >
                      Login
                    </span>
                  </Typography>
                </Box>
              )}
            </Box>
          </Box>
        </Box>
        {/* Login Form */}
        <Box className="form-container login-container">
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
                value={username}
                onChange={(e) => setUsername(e.target.value)} //Update state on input change
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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

              <Box
                width="100%"
                display="flex"
                justifyContent="space-between"
                alignItems="center"
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
              <Box display="flex" justifyContent="center" width="100%">
                <Button
                  variant="contained"
                  onClick={handleLoginSubmission}
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
              <Typography textAlign="center" marginTop={2} fontSize="1rem" sx={{ color: "#ff0000" }}>
                {error}
              </Typography>

              <Typography textAlign="center" marginTop={2} fontSize="1rem">
                or use your account
              </Typography>

              <Box display="flex" justifyContent="center" gap={2} marginTop={1}>
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
              {isMobile && (
                <Box>
                  <Typography textAlign="center" marginTop={1} fontSize="1rem">
                    Don't have an account?{" "}
                    <span
                      onClick={handleRegisterClick}
                      style={{
                        cursor: "pointer",
                        textDecoration: "none",
                        borderBottom: "1px solid transparent",
                        transition: "border-color 0.3s",
                      }}
                      onMouseEnter={(e) =>
                        (e.target.style.borderBottom = "2px solid #000")
                      }
                      onMouseLeave={(e) =>
                        (e.target.style.borderBottom = "2px solid transparent")
                      }
                    >
                      Sign up
                    </span>
                  </Typography>
                </Box>
              )}
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Overlay */}
      <div className="overlay-container">
        <div className="overlay">
          <div className="overlay-panel overlay-left">
            <Typography
              marginBottom={2}
              variant="h2"
              sx={{
                fontWeight: "500",
                color: "#ffffff",
              }}
            >
              Hello friends
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: "white",
              }}
            >
              If you already have an account, login
              <span style={{ display: "block", marginTop: "10px" }}>
                here and have fun
              </span>
            </Typography>
            <Button
              onClick={handleLoginClick}
              className="ghost"
              sx={{
                marginTop: "20px",
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
                  content: "'←'",
                  position: "absolute",
                  left: "32px",
                  bottom: "2px",
                  opacity: 0,
                  transform: "translateX(-10px)",
                  transition: "all 0.3s ease-in-out",
                  fontSize: "1.9rem",
                  fontWeight: "bold",
                },
              }}
            >
              Login
            </Button>
          </div>
          <div className="overlay-panel overlay-right">
            <Box textAlign="center" mt={4}>
              <Typography
                variant="h2"
                sx={{
                  fontWeight: "500",
                  color: "#ffffff",
                }}
              >
                Start your
                <Typography
                  marginBottom={2}
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
                  color: "white",
                }}
              >
                If you don't have an account yet, join us
                <span style={{ display: "block", marginTop: "10px" }}>
                  and start your journey
                </span>
              </Typography>
              <Button
                onClick={handleRegisterClick}
                className="ghost"
                sx={{
                  marginTop: "20px",
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
