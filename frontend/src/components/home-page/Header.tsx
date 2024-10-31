import React, { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const [itemHovered, setItemHovered] = useState(false);
  const [flightHovered, setFlightHovered] = useState(false);
  const [carHovered, setCarHovered] = useState(false);
  const [hotelHovered, setHotelHovered] = useState(false);
  const [pagesHovered, setPagesHovered] = useState(false);
  const [newsHovered, setNewsHovered] = useState(false);

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      padding="20px 80px"
    >
      <Box>
        <Typography variant="h6">QAirline</Typography>
      </Box>
      <Box display="flex" gap="10px">
        <Button
          sx={{
            color: "rgb(77,115,252)",
            fontWeight: "500",
            fontSize: "1.2rem",
            textTransform: "none",
            "&:hover": { backgroundColor: "inherit" },
          }}
        >
          Home
        </Button>
        <Box
          onMouseEnter={() => setFlightHovered(true)}
          onMouseLeave={() => setFlightHovered(false)}
          position="relative"
        >
          <Button
            sx={{
              color: flightHovered ? "rgb(77,115,252)" : "black",
              fontWeight: "500",
              fontSize: "1.2rem",
              textTransform: "none",
              "&:hover": {
                backgroundColor: "inherit",
                color: "rgb(77,115,252)",
                transition: "0.3s ease in out",
              },
            }}
          >
            Flight
          </Button>
          {flightHovered && (
            <Box
              position="absolute"
              left="0"
              bgcolor="rgb(244, 244, 244)"
              borderRadius="8px"
              p="10px"
              mt="5px"
              zIndex={1}
              width="200px"
              margin="0"
            >
              <Button
                onMouseEnter={() => setItemHovered(true)}
                onMouseLeave={() => setItemHovered(false)}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                  color: "black",
                  backgroundColor: "transparent",
                  borderRadius: "4px",
                  textTransform: "none",
                  "&:hover": {
                    backgroundColor: "rgb(77,115,252)",
                    color: "white",
                  },
                  padding: "8px 12px",
                  fontSize: "1rem",
                }}
              >
                Flight Listing
                <ArrowForwardIosIcon sx={{ fontSize: "16px" }} />
              </Button>
              <Button
                onMouseEnter={() => setItemHovered(true)}
                onMouseLeave={() => setItemHovered(false)}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                  color: "black",
                  backgroundColor: "transparent",
                  borderRadius: "4px",
                  textTransform: "none",
                  "&:hover": {
                    backgroundColor: "rgb(77,115,252)",
                    color: "white",
                  },
                  padding: "8px 12px",
                  fontSize: "1rem",
                }}
              >
                Flight Booking
                <ArrowForwardIosIcon sx={{ fontSize: "16px" }} />
              </Button>
            </Box>
          )}
        </Box>
        <Box
          onMouseEnter={() => setCarHovered(true)}
          onMouseLeave={() => setCarHovered(false)}
          position="relative"
        >
          <Button
            sx={{
              color: carHovered ? "rgb(77,115,252)" : "black",
              fontWeight: "500",
              fontSize: "1.2rem",
              textTransform: "none",
              "&:hover": {
                backgroundColor: "inherit",
                color: "rgb(77,115,252)",
                transition: "0.3s ease in out",
              },
            }}
          >
            Car
          </Button>
          {carHovered && (
            <Box
              position="absolute"
              left="0"
              bgcolor="rgb(244, 244, 244)"
              borderRadius="8px"
              p="10px"
              mt="5px"
              zIndex={1}
              width="200px"
              margin="0"
            >
              <Button
                onMouseEnter={() => setItemHovered(true)}
                onMouseLeave={() => setItemHovered(false)}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                  color: "black",
                  backgroundColor: "transparent",
                  borderRadius: "4px",
                  textTransform: "none",
                  "&:hover": {
                    backgroundColor: "rgb(77,115,252)",
                    color: "white",
                  },
                  padding: "8px 12px",
                  fontSize: "1rem",
                }}
              >
                Car Listing
                <ArrowForwardIosIcon sx={{ fontSize: "16px" }} />
              </Button>
              <Button
                onMouseEnter={() => setItemHovered(true)}
                onMouseLeave={() => setItemHovered(false)}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                  color: "black",
                  backgroundColor: "transparent",
                  borderRadius: "4px",
                  textTransform: "none",
                  "&:hover": {
                    backgroundColor: "rgb(77,115,252)",
                    color: "white",
                  },
                  padding: "8px 12px",
                  fontSize: "1rem",
                }}
              >
                Car Booking
                <ArrowForwardIosIcon sx={{ fontSize: "16px" }} />
              </Button>
              <Button
                onMouseEnter={() => setItemHovered(true)}
                onMouseLeave={() => setItemHovered(false)}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                  color: "black",
                  backgroundColor: "transparent",
                  borderRadius: "4px",
                  textTransform: "none",
                  "&:hover": {
                    backgroundColor: "rgb(77,115,252)",
                    color: "white",
                  },
                  padding: "8px 12px",
                  fontSize: "1rem",
                }}
              >
                Car Detail
                <ArrowForwardIosIcon sx={{ fontSize: "16px" }} />
              </Button>
            </Box>
          )}
        </Box>
        <Box
          onMouseEnter={() => setHotelHovered(true)}
          onMouseLeave={() => setHotelHovered(false)}
          position="relative"
        >
          <Button
            sx={{
              color: hotelHovered ? "rgb(77,115,252)" : "black",
              fontWeight: "500",
              fontSize: "1.2rem",
              textTransform: "none",
              "&:hover": {
                backgroundColor: "inherit",
                color: "rgb(77,115,252)",
                transition: "0.3s ease in out",
              },
            }}
          >
            Hotel
          </Button>
          {hotelHovered && (
            <Box
              position="absolute"
              left="0"
              bgcolor="rgb(244, 244, 244)"
              borderRadius="8px"
              p="10px"
              mt="5px"
              zIndex={1}
              width="200px"
              margin="0"
            >
              <Button
                onMouseEnter={() => setItemHovered(true)}
                onMouseLeave={() => setItemHovered(false)}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                  color: "black",
                  backgroundColor: "transparent",
                  borderRadius: "4px",
                  textTransform: "none",
                  "&:hover": {
                    backgroundColor: "rgb(77,115,252)",
                    color: "white",
                  },
                  padding: "8px 12px",
                  fontSize: "1rem",
                }}
              >
                Hotel Listing
                <ArrowForwardIosIcon sx={{ fontSize: "16px" }} />
              </Button>
              <Button
                onMouseEnter={() => setItemHovered(true)}
                onMouseLeave={() => setItemHovered(false)}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                  color: "black",
                  backgroundColor: "transparent",
                  borderRadius: "4px",
                  textTransform: "none",
                  "&:hover": {
                    backgroundColor: "rgb(77,115,252)",
                    color: "white",
                  },
                  padding: "8px 12px",
                  fontSize: "1rem",
                }}
              >
                Hotel Booking
                <ArrowForwardIosIcon sx={{ fontSize: "16px" }} />
              </Button>
              <Button
                onMouseEnter={() => setItemHovered(true)}
                onMouseLeave={() => setItemHovered(false)}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                  color: "black",
                  backgroundColor: "transparent",
                  borderRadius: "4px",
                  textTransform: "none",
                  "&:hover": {
                    backgroundColor: "rgb(77,115,252)",
                    color: "white",
                  },
                  padding: "8px 12px",
                  fontSize: "1rem",
                }}
              >
                Hotel Detail
                <ArrowForwardIosIcon sx={{ fontSize: "16px" }} />
              </Button>
            </Box>
          )}
        </Box>
        <Button
          sx={{
            color: "black",
            fontWeight: "500",
            fontSize: "1.2rem",
            textTransform: "none",
            "&:hover": {
              backgroundColor: "inherit",
              color: "rgb(77,115,252)",
              transition: "0.3s ease in out",
            },
          }}
        >
          Tour Package
        </Button>
        <Box
          onMouseEnter={() => setPagesHovered(true)}
          onMouseLeave={() => setPagesHovered(false)}
          position="relative"
        >
          <Button
            sx={{
              color: pagesHovered ? "rgb(77,115,252)" : "black",
              fontWeight: "500",
              fontSize: "1.2rem",
              textTransform: "none",
              "&:hover": {
                backgroundColor: "inherit",
                color: "rgb(77,115,252)",
                transition: "0.3s ease in out",
              },
            }}
          >
            Pages
          </Button>
          {pagesHovered && (
            <Box
              position="absolute"
              left="0"
              bgcolor="rgb(244, 244, 244)"
              borderRadius="8px"
              p="10px"
              mt="5px"
              zIndex={1}
              width="200px"
              margin="0"
            >
              <Button
                onMouseEnter={() => setItemHovered(true)}
                onMouseLeave={() => setItemHovered(false)}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                  color: "black",
                  backgroundColor: "transparent",
                  borderRadius: "4px",
                  textTransform: "none",
                  "&:hover": {
                    backgroundColor: "rgb(77,115,252)",
                    color: "white",
                  },
                  padding: "8px 12px",
                  fontSize: "1rem",
                }}
              >
                About
                <ArrowForwardIosIcon sx={{ fontSize: "16px" }} />
              </Button>
              <Button
                onMouseEnter={() => setItemHovered(true)}
                onMouseLeave={() => setItemHovered(false)}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                  color: "black",
                  backgroundColor: "transparent",
                  borderRadius: "4px",
                  textTransform: "none",
                  "&:hover": {
                    backgroundColor: "rgb(77,115,252)",
                    color: "white",
                  },
                  padding: "8px 12px",
                  fontSize: "1rem",
                }}
              >
                Contact
                <ArrowForwardIosIcon sx={{ fontSize: "16px" }} />
              </Button>
              <Button
                onMouseEnter={() => setItemHovered(true)}
                onMouseLeave={() => setItemHovered(false)}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                  color: "black",
                  backgroundColor: "transparent",
                  borderRadius: "4px",
                  textTransform: "none",
                  "&:hover": {
                    backgroundColor: "rgb(77,115,252)",
                    color: "white",
                  },
                  padding: "8px 12px",
                  fontSize: "1rem",
                }}
              >
                Privacy Policy
                <ArrowForwardIosIcon sx={{ fontSize: "16px" }} />
              </Button>
              <Button
                onClick={() => navigate("/auth/login")}
                onMouseEnter={() => setItemHovered(true)}
                onMouseLeave={() => setItemHovered(false)}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                  color: "black",
                  backgroundColor: "transparent",
                  borderRadius: "4px",
                  textTransform: "none",
                  "&:hover": {
                    backgroundColor: "rgb(77,115,252)",
                    color: "white",
                  },
                  padding: "8px 12px",
                  fontSize: "1rem",
                }}
              >
                Login
                <ArrowForwardIosIcon sx={{ fontSize: "16px" }} />
              </Button>
              <Button
                onClick={() => navigate("/auth/signup")}
                onMouseEnter={() => setItemHovered(true)}
                onMouseLeave={() => setItemHovered(false)}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                  color: "black",
                  backgroundColor: "transparent",
                  borderRadius: "4px",
                  textTransform: "none",
                  "&:hover": {
                    backgroundColor: "rgb(77,115,252)",
                    color: "white",
                  },
                  padding: "8px 12px",
                  fontSize: "1rem",
                }}
              >
                Sign Up
                <ArrowForwardIosIcon sx={{ fontSize: "16px" }} />
              </Button>
            </Box>
          )}
        </Box>
        <Box
          onMouseEnter={() => setNewsHovered(true)}
          onMouseLeave={() => setNewsHovered(false)}
          position="relative"
        >
          <Button
            sx={{
              color: newsHovered ? "rgb(77,115,252)" : "black",
              fontWeight: "500",
              fontSize: "1.2rem",
              textTransform: "none",
              "&:hover": {
                backgroundColor: "inherit",
                color: "rgb(77,115,252)",
                transition: "0.3s ease in out",
              },
            }}
          >
            News
          </Button>
          {newsHovered && (
            <Box
              position="absolute"
              left="0"
              bgcolor="rgb(244, 244, 244)"
              borderRadius="8px"
              p="10px"
              mt="5px"
              zIndex={1}
              width="200px"
              margin="0"
            >
              <Button
                onMouseEnter={() => setItemHovered(true)}
                onMouseLeave={() => setItemHovered(false)}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                  color: "black",
                  backgroundColor: "transparent",
                  borderRadius: "4px",
                  textTransform: "none",
                  "&:hover": {
                    backgroundColor: "rgb(77,115,252)",
                    color: "white",
                  },
                  padding: "8px 12px",
                  fontSize: "1rem",
                }}
              >
                News Listing
                <ArrowForwardIosIcon sx={{ fontSize: "16px" }} />
              </Button>
              <Button
                onMouseEnter={() => setItemHovered(true)}
                onMouseLeave={() => setItemHovered(false)}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                  color: "black",
                  backgroundColor: "transparent",
                  borderRadius: "4px",
                  textTransform: "none",
                  "&:hover": {
                    backgroundColor: "rgb(77,115,252)",
                    color: "white",
                  },
                  padding: "8px 12px",
                  fontSize: "1rem",
                }}
              >
                News Detail
                <ArrowForwardIosIcon sx={{ fontSize: "16px" }} />
              </Button>
            </Box>
          )}
        </Box>
      </Box>
      <Box display="flex" gap="10px">
        <Button
          onClick={() => navigate("/auth/login")}
          sx={{
            color: "black",
            fontWeight: "500",
            fontSize: "1.2rem",
            textTransform: "none",
            "&:hover": {
              backgroundColor: "inherit",
              color: "rgb(77,115,252)",
              transition: "0.3s ease in out",
            },
          }}
        >
          Login
        </Button>
        <Button
          onClick={() => navigate("/auth/signup")}
          sx={{
            color: "black",
            fontWeight: "500",
            fontSize: "1.2rem",
            textTransform: "none",
            "&:hover": {
              backgroundColor: "inherit",
              color: "rgb(77,115,252)",
              transition: "0.3s ease in out",
            },
          }}
        >
          Signup
        </Button>
      </Box>
    </Box>
  );
};

export default Header;
