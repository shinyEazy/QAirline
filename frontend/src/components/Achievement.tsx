import { Box, Typography, Button } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faCircleUser } from "@fortawesome/free-regular-svg-icons";

const Achievement = () => {
  return (
    <Box
      sx={{
        display: "flex",
        backgroundColor: "white",
        padding: "40px",
        borderRadius: "20px",
        margin: "20px 80px",
        color: "black",
        gap: "40px",
      }}
    >
      <Box sx={{ flex: "1" }} bgcolor="white">
        <Typography color="#4D73FC" fontWeight="500" fontSize="1.1rem">
          Achievement
        </Typography>
        <Typography fontWeight="600" fontSize="1.7rem" marginTop="8px">
          Your Destination Awaits, Book Now
        </Typography>
        <Typography marginTop="4px">
          The customer is very happy to be followed. But there is always a time
          for easy basketball and football. In the earth sometimes or as mass
          sometimes cartoon element author.
        </Typography>
        <Box display="flex" marginTop="32px" gap="40px">
          <Box
            flex={1}
            padding="20px 32px"
            display="flex"
            alignItems="center"
            gap="20px"
            bgcolor="rgb(234,234,234)"
            borderRadius="8px"
            justifyContent="space-between"
          >
            <Box>
              <Typography
                color="#4D73FC"
                fontWeight="600"
                fontSize="1.9rem"
                lineHeight="28px"
              >
                12870 +
              </Typography>
              <Typography fontSize="1.1rem">Happy Customers</Typography>
            </Box>
            <FontAwesomeIcon
              icon={faUser}
              style={{ color: "#4D73FC" }}
              fontSize="2.5rem"
            />
          </Box>
          <Box
            flex={1}
            padding="20px 32px"
            display="flex"
            alignItems="center"
            gap="20px"
            bgcolor="rgb(234,234,234)"
            borderRadius="8px"
            justifyContent="space-between"
          >
            <Box>
              <Typography
                color="#4D73FC"
                fontWeight="600"
                fontSize="1.9rem"
                lineHeight="28px"
              >
                100%
              </Typography>
              <Typography fontSize="1.1rem">Client Satisfied</Typography>
            </Box>
            <FontAwesomeIcon
              icon={faCircleUser}
              style={{ color: "#4D73FC" }}
              fontSize="2.5rem"
            />
          </Box>
        </Box>
        <Box display="flex" alignItems="center" marginTop="40px">
          <Typography fontWeight="500">
            Let's Connect Reach Out for More Information
          </Typography>
          <Button
            sx={{
              marginLeft: "40px",
              backgroundColor: "#4D73FC",
              borderRadius: "8px",
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textTransform: "none",
              padding: "8px 20px",
              "&:hover": {
                backgroundColor: "#3B5FC1",
              },
            }}
          >
            Contact us
          </Button>
        </Box>
      </Box>
      <Box sx={{ flex: "1" }} width="50%" bgcolor="white">
        <img
          src="https://uiparadox.co.uk/public/templates/flynow/v2/assets/media/images/achievement-image.png"
          style={{
            objectFit: "cover",
            height: "100%",
            width: "100%",
            borderRadius: "20px",
          }}
        />
      </Box>
    </Box>
  );
};

export default Achievement;
