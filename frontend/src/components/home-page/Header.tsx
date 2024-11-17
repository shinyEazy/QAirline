import React, { useState } from "react";
import { Box, Button } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useNavigate, useLocation } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [hoveredMenu, setHoveredMenu] = useState<string | null>(null);

  const menuItems = [
    {
      label: "Flight",
      subItems: [
        { label: "Flight Listing", path: "/flight-listing" },
        { label: "Flight Booking", path: "/flight-booking" },
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
    padding: "4px 20px",
    borderRadius: "100px",
    transition: "color 0.3s ease-in-out, transform 0.3s ease-in-out",
    "&:hover": {
      backgroundColor: "inherit",
      color: "#1e90ff",
      transform: "translateY(-4px)",
    },
  };

  const subMenuStyles = {
    position: "absolute",
    left: "0",
    bgcolor: "rgb(230, 238, 245)",
    borderRadius: "8px",
    padding: "10px",
    mt: "5px",
    zIndex: 1,
    width: "200px",
    margin: "0",
  };

  const handleMouseEnter = (menu: string) => setHoveredMenu(menu);
  const handleMouseLeave = () => setHoveredMenu(null);

  const isActive = (path: string) => location.pathname === path;

  const getMenuItemColor = (menuLabel: string) => {
    if (location.pathname.includes(menuLabel.toLowerCase())) {
      return "#1e90ff";
    }
    return "black";
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      padding="10px 80px"
      position="sticky"
      sx={{
        backgroundColor: "#ffffff",
        top: 0,
        zIndex: 1100,
      }}
    >
      {/* Logo */}
      <Box display="flex" alignItems="center" gap="8px">
        <img
          src="/logo.png"
          alt="QAirline Logo"
          onClick={() => navigate("/")}
          style={{
            width: "100%",
            height: "100%",
            maxWidth: "200px",
            cursor: "pointer",
          }}
        />
      </Box>

      {/* Main Menu */}
      <Box display="flex" gap="10px">
        <Button
          sx={{
            ...buttonStyles,
            color: isActive("/") ? "#1e90ff" : "black",
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
                color: getMenuItemColor(menu.label),
              }}
            >
              {menu.label}
            </Button>
            {hoveredMenu === menu.label && (
              <Box sx={subMenuStyles}>
                {menu.subItems.map((subItem, index) => {
                  const isActiveSubItem = location.pathname === subItem.path;
                  return (
                    <Button
                      key={index}
                      onClick={() => navigate(subItem.path)}
                      sx={{
                        margin: "4px auto",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        width: "100%",
                        color: isActiveSubItem ? "#1e90ff" : "black",
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
                      {subItem.label}
                      <ArrowForwardIosIcon sx={{ fontSize: "16px" }} />
                    </Button>
                  );
                })}
              </Box>
            )}
          </Box>
        ))}

        <Button
          sx={{
            ...buttonStyles,
            color: location.pathname.includes("/tour-packages")
              ? "#1e90ff"
              : "black",
          }}
          onClick={() => navigate("/tour-packages")}
        >
          Tour Package
        </Button>
      </Box>

      {/* Authentication Links */}
      <Box display="flex" gap="10px">
        <Button sx={buttonStyles} onClick={() => navigate("/auth/login")}>
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
