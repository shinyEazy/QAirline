import { Box, Typography, TextField, Button } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faPhone,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";

const Footer = () => {
  return (
    <Box
      sx={{
        padding: "20px",
        display: "flex",
        backgroundColor: "white",
        borderRadius: "20px",
        margin: "0 60px",
        color: "black",
        gap: "20px",
        "@media (max-width: 1000px)": {
          margin: 0,
          overflow: "hidden",
          flexDirection: "column",
        },
      }}
    >
      <Box flex={1}>
        <Box display="flex" alignItems="center" gap="8px">
          <img
            src="/logo.png"
            alt="QAirline Logo"
            style={{ width: "100%", height: "100%", maxWidth: "200px" }}
          />
        </Box>
        <Typography marginBottom="10px">
          The customer is very happy to be followed. Aqueet vulputate augue
          penatibus in libero and some of that. The performance is ridiculously
          expensive.
        </Typography>
        <Typography marginBottom="8px">
          Subscribe to our special offers
        </Typography>
        <Box
          bgcolor="rgb(231,235,255)"
          display="flex"
          borderRadius="8px"
          justifyContent="space-between"
        >
          <TextField
            placeholder="Email address"
            variant="outlined"
            sx={{
              color: "black",
              width: "100%",
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  border: "none",
                },
                "&:hover fieldset": {
                  border: "none",
                },
                "&.Mui-focused fieldset": {
                  border: "none",
                },
              },
              "& .MuiOutlinedInput-input": {
                padding: "16px",
              },
            }}
          />
          <Button
            sx={{
              fontSize: "1.1rem",
              padding: "0 32px",
              borderRadius: "8px",
              color: "black",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textTransform: "none",
            }}
          >
            Subscribe
          </Button>
        </Box>
      </Box>
      <Box display="flex" flex={1} gap="20px">
        <Box flex={1}>
          <Typography fontWeight="500" fontSize="1.4rem" marginBottom="20px">
            Booking
          </Typography>
          <Typography marginBottom="10px">Book Flights</Typography>
          <Typography marginBottom="10px">Travel Services</Typography>
          <Typography marginBottom="10px">Transportation</Typography>
          <Typography marginBottom="10px"> Planning Your Trip</Typography>
        </Box>
        <Box flex={1}>
          <Typography fontWeight="500" fontSize="1.4rem" marginBottom="20px">
            Useful Links
          </Typography>
          <Typography marginBottom="10px">Home</Typography>
          <Typography marginBottom="10px">Blogs</Typography>
          <Typography marginBottom="10px">About</Typography>
          <Typography marginBottom="10px">Contact Us</Typography>
        </Box>
      </Box>
      <Box display="flex" flex={1.5} gap="20px">
        <Box flex={1}>
          <Typography fontWeight="500" fontSize="1.4rem" marginBottom="20px">
            Manage
          </Typography>
          <Typography marginBottom="10px">Check-in</Typography>
          <Typography marginBottom="10px">Manage Your Booking</Typography>
          <Typography marginBottom="10px">Chaurfeur Drive</Typography>
          <Typography marginBottom="10px">Flight Status</Typography>
        </Box>
        <Box
          flex={2}
          sx={{
            "@media (max-width: 1000px)": {
              flex: 1,
            },
          }}
        >
          <Typography fontWeight="500" fontSize="1.4rem" marginBottom="20px">
            Contact Us
          </Typography>
          <Typography marginBottom="10px" alignItems="center" display="flex">
            <FontAwesomeIcon
              icon={faLocationDot}
              fontSize="1.2rem"
              style={{ marginRight: "8px" }}
            />
            144 Xuan Thuy, Hanoi
          </Typography>
          <Typography
            color="rgb(77, 115, 252)"
            fontSize="1.5rem"
            fontWeight="500"
            marginBottom="10px"
            alignItems="center"
            display="flex"
          >
            <FontAwesomeIcon
              style={{ marginRight: "8px" }}
              icon={faPhone}
              fontSize="1.2rem"
              color="black"
            />
            +84 0989.xxx.xxx
          </Typography>
          <Typography marginBottom="20px" alignItems="center" display="flex">
            <FontAwesomeIcon
              style={{ marginRight: "8px" }}
              icon={faEnvelope}
              fontSize="1.2rem"
            />
            email@example.com
          </Typography>
          <Typography marginBottom="8px">Follow Us!</Typography>
          <Box display="flex" gap="16px" marginBottom="20px">
            <Button
              sx={{
                backgroundColor: "#4D73FC",
                borderRadius: "8px",
                color: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                textTransform: "none",
                padding: "8px",
                minWidth: "48px",

                "&:hover": {
                  backgroundColor: "#3B5FC1",
                },
              }}
            >
              <img src="https://uiparadox.co.uk/public/templates/flynow/v2/assets/media/icons/instagram.png" />
            </Button>
            <Button
              sx={{
                backgroundColor: "#4D73FC",
                borderRadius: "8px",
                color: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                textTransform: "none",
                padding: "8px",
                minWidth: "48px",
                "&:hover": {
                  backgroundColor: "#3B5FC1",
                },
              }}
            >
              <img src="https://uiparadox.co.uk/public/templates/flynow/v2/assets/media/icons/facebook.png" />
            </Button>
            <Button
              sx={{
                backgroundColor: "#4D73FC",
                borderRadius: "8px",
                color: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                textTransform: "none",
                padding: "8px",
                minWidth: "48px",
                "&:hover": {
                  backgroundColor: "#3B5FC1",
                },
              }}
            >
              <img src="https://uiparadox.co.uk/public/templates/flynow/v2/assets/media/icons/linkedin.png" />
            </Button>
            <Button
              sx={{
                backgroundColor: "#4D73FC",
                borderRadius: "8px",
                color: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                textTransform: "none",
                padding: "8px",
                minWidth: "48px",
                "&:hover": {
                  backgroundColor: "#3B5FC1",
                },
              }}
            >
              <img src="https://uiparadox.co.uk/public/templates/flynow/v2/assets/media/icons/twitter.png" />
            </Button>
          </Box>
          <Typography>©2024 QAirline All Rights Reserved.</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
