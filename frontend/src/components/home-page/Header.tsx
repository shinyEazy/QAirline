import React, { useState } from "react";
import {
  Box,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useNavigate, useLocation } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";
import HomeIcon from "@mui/icons-material/Home";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import HotelIcon from "@mui/icons-material/Hotel";
import NewsIcon from "@mui/icons-material/Newspaper";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useMediaQuery("(max-width:1100px)");

  const [hoveredMenu, setHoveredMenu] = useState<string | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const menuItems = [
    {
      label: "Flight",
      subItems: [
        { label: "Flight Listing", path: "/flight/list" },
        { label: "Flight Booking", path: "/flight/booking" },
      ],
    },
    {
      label: "Car",
      subItems: [
        { label: "Car Listing", path: "/car-listing" },
        { label: "Car Booking", path: "/car-booking" },
        { label: "Car Detail", path: "/car-detail" },
      ],
    },
    {
      label: "Hotel",
      subItems: [
        { label: "Hotel Listing", path: "/hotel-listing" },
        { label: "Hotel Booking", path: "/hotel-booking" },
        { label: "Hotel Detail", path: "/hotel-detail" },
      ],
    },
    {
      label: "Pages",
      subItems: [
        { label: "About", path: "/about" },
        { label: "Contact", path: "/contact" },
        { label: "Privacy Policy", path: "/privacy-policy" },
        { label: "Login", path: "/auth/login" },
        { label: "Sign Up", path: "/auth/signup" },
      ],
    },
    {
      label: "News",
      subItems: [
        { label: "News Listing", path: "/news-listing" },
        { label: "News Detail", path: "/news-detail" },
      ],
    },
  ];

  const buttonStyles = {
    color: "black",
    fontWeight: "500",
    fontSize: "1.2rem",
    textTransform: "none",
    padding: "4px 10px",
    transition: "color 0.3s ease-in-out, transform 0.3s ease-in-out",
    "&:hover": {
      backgroundColor: "inherit",
      color: "#1e90ff",
      transform: "translateY(-4px)",
    },
  };

  const handleMouseEnter = (menu: string) => setHoveredMenu(menu);
  const handleMouseLeave = () => setHoveredMenu(null);

  const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);

  const renderDesktopMenu = () => (
    <Box display="flex" gap="10px">
      <Button
        sx={{
          ...buttonStyles,
          color: location.pathname === "/" ? "#1e90ff" : "black",
          fontWeight: "500",
          fontSize: "1.2rem",
          textTransform: "none",
        }}
        onClick={() => navigate("/")}
      >
        Home
      </Button>
      {menuItems.map((menu) => (
        <Box
          key={menu.label}
          onMouseEnter={() => handleMouseEnter(menu.label)}
          onMouseLeave={handleMouseLeave}
          position="relative"
        >
          <Button
            sx={{
              ...buttonStyles,
              color: location.pathname.includes(menu.label.toLowerCase())
                ? "#1e90ff"
                : "black",
              fontWeight: "500",
              fontSize: "1.2rem",
              textTransform: "none",
            }}
          >
            {menu.label}
          </Button>
          {hoveredMenu === menu.label && (
            <Box
              sx={{
                position: "absolute",
                left: 0,
                bgcolor: "rgb(230, 238, 245)",
                borderRadius: "8px",
                padding: "10px",
                zIndex: 1,
                width: "200px",
              }}
            >
              {menu.subItems.map((subItem) => (
                <Button
                  key={subItem.path}
                  onClick={() => navigate(subItem.path)}
                  sx={{
                    width: "100%",
                    textAlign: "left",
                    justifyContent: "space-between",
                    textTransform: "none",
                    color:
                      location.pathname === subItem.path ? "#1e90ff" : "black",
                    "&:hover": {
                      backgroundColor: "#1e90ff",
                      color: "white",
                    },
                  }}
                >
                  {subItem.label}
                  <ArrowForwardIosIcon sx={{ fontSize: "16px" }} />
                </Button>
              ))}
            </Box>
          )}
        </Box>
      ))}
    </Box>
  );

  const renderMobileMenu = () => (
    <>
      <IconButton onClick={toggleDrawer}>
        {isDrawerOpen ? <CloseIcon /> : <MenuIcon />}
      </IconButton>
      <Drawer anchor="left" open={isDrawerOpen} onClose={toggleDrawer}>
        <List
          sx={{
            width: "250px",
            padding: "0 10px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Logo */}
          <ListItem>
            <img
              src="/logo.png"
              alt="QAirline Logo"
              onClick={() => navigate("/")}
              style={{
                cursor: "pointer",
                width: "200px",
              }}
            />
          </ListItem>

          {/* Home */}
          <ListItemButton
            onClick={() => {
              navigate("/");
              toggleDrawer();
            }}
            sx={{
              backgroundColor:
                location.pathname === "/" ? "#1e90ff" : "inherit",
              color: location.pathname === "/" ? "white" : "black",
              borderRadius: "100px",
              transition:
                "background-color 0.3s ease-in-out, color 0.3s ease-in-out",
              "&:hover": {
                backgroundColor: "#1e90ff",
                color: "white",
              },
            }}
          >
            <HomeIcon sx={{ mr: 1, fontSize: "1.3rem" }} />
            <ListItemText
              primary={
                <Typography
                  sx={{
                    fontWeight: "bold",
                    fontSize: "1rem",
                  }}
                >
                  Home
                </Typography>
              }
            />
          </ListItemButton>

          {/* Menu Items */}
          {menuItems.map((menu) => (
            <Box key={menu.label}>
              {/* Parent Menu with Icon */}
              <ListItem>
                {menu.label === "Flight" && (
                  <FlightTakeoffIcon
                    sx={{
                      mr: 1,
                      fontSize: "1.3rem",
                      color: location.pathname.includes(
                        menu.label.toLowerCase()
                      )
                        ? "#1e90ff"
                        : "black",
                    }}
                  />
                )}
                {menu.label === "Car" && (
                  <DirectionsCarIcon
                    sx={{
                      mr: 1,
                      fontSize: "1.3rem",
                      color: location.pathname.includes(
                        menu.label.toLowerCase()
                      )
                        ? "#1e90ff"
                        : "black",
                    }}
                  />
                )}
                {menu.label === "Hotel" && (
                  <HotelIcon
                    sx={{
                      mr: 1,
                      fontSize: "1.3rem",
                      color: location.pathname.includes(
                        menu.label.toLowerCase()
                      )
                        ? "#1e90ff"
                        : "black",
                    }}
                  />
                )}
                {menu.label === "Pages" && (
                  <ExitToAppIcon
                    sx={{
                      mr: 1,
                      fontSize: "1.3rem",
                      color: location.pathname.includes(
                        menu.label.toLowerCase()
                      )
                        ? "#1e90ff"
                        : "black",
                    }}
                  />
                )}
                {menu.label === "News" && (
                  <NewsIcon
                    sx={{
                      mr: 1,
                      fontSize: "1.3rem",
                      color: location.pathname.includes(
                        menu.label.toLowerCase()
                      )
                        ? "#1e90ff"
                        : "black",
                    }}
                  />
                )}
                <Typography
                  sx={{
                    fontWeight: "bold",
                    color: location.pathname.includes(menu.label.toLowerCase())
                      ? "#1e90ff"
                      : "black",
                    transition: "color 0.3s ease-in-out",
                  }}
                >
                  {menu.label}
                </Typography>
              </ListItem>

              {/* Subitems */}
              {menu.subItems.map((subItem) => (
                <ListItemButton
                  key={subItem.path}
                  onClick={() => {
                    navigate(subItem.path);
                    toggleDrawer();
                  }}
                  sx={{
                    borderRadius: "100px",
                    transition:
                      "background-color 0.3s ease-in-out, color 0.3s ease-in-out",
                    pl: 4,
                    backgroundColor:
                      location.pathname === subItem.path
                        ? "#1e90ff"
                        : "inherit",
                    color:
                      location.pathname === subItem.path ? "white" : "black",
                    marginBottom: "2px",
                    "&:hover": {
                      backgroundColor: "#1e90ff",
                      color: "white",
                    },
                  }}
                >
                  <ListItemText primary={subItem.label} />
                </ListItemButton>
              ))}
            </Box>
          ))}
        </List>
      </Drawer>
    </>
  );

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      position="sticky"
      sx={{
        backgroundColor: "#ffffff",
        top: 0,
        zIndex: 1100,
        padding: { xs: "10px 20px", sm: "10px 80px" },
      }}
    >
      {/* Logo */}
      <Box display="flex" alignItems="center" gap="8px">
        <img
          src="/logo.png"
          alt="QAirline Logo"
          onClick={() => navigate("/")}
          style={{
            width: "200px",
            height: "auto",
            maxWidth: "200px",
            cursor: "pointer",
          }}
        />
      </Box>

      {/* Main Menu */}
      {isMobile ? renderMobileMenu() : renderDesktopMenu()}

      {/* Authentication Links */}
      <Box display="flex" gap="10px">
        <Button
          sx={{
            color: "#1e90ff",
            fontWeight: "500",
            fontSize: "1.2rem",
            textTransform: "none",
            border: "1px solid #1e90ff",
            borderRadius: "100px",
            padding: "0 20px",
            transition:
              "background-color 0.3s ease-in-out, color 0.3s ease-in-out, transform 0.3s ease-in-out",
            "&:hover": {
              backgroundColor: "#1e90ff",
              color: "white",
              transform: "scale(1.05)",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            },
          }}
          onClick={() => navigate("/auth/login")}
        >
          Login
        </Button>
        <Button
          sx={{
            color: "white",
            fontWeight: "500",
            fontSize: "1.2rem",
            textTransform: "none",
            backgroundColor: "#1e90ff",
            borderRadius: "100px",
            padding: "4px 20px",
            transition:
              "background-color 0.3s ease-in-out, color 0.3s ease-in-out, transform 0.3s ease-in-out",
            "&:hover": {
              backgroundColor: "#2177cb",
              color: "white",
              transform: "scale(1.05)",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            },
          }}
          onClick={() => navigate("/auth/signup")}
        >
          Signup
        </Button>
      </Box>
    </Box>
  );
};

export default Header;
