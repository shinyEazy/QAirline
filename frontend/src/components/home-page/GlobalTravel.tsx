import { Box, Typography, Button } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faHotel } from "@fortawesome/free-solid-svg-icons";
const GlobalTravel = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#EAEAEA",
        borderRadius: "20px",
        padding: "40px 80px",
        color: "black",
      }}
    >
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography fontWeight="600" fontSize="1.7rem">
          Popular Global Travel Destinations
        </Typography>

        <Box display="flex">
          <Button
            sx={{
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
            Show more
          </Button>
        </Box>
      </Box>
      <Box display="flex" justifyContent="space-between" gap="20px">
        <Box sx={{ flex: "1", width: "50%" }}>
          <img
            src="https://uiparadox.co.uk/public/templates/flynow/v2/assets/media/images/map.png"
            alt="tmp"
            style={{ objectFit: "cover", height: "auto", width: "100%" }}
          />
        </Box>
        <Box
          sx={{
            flex: "1",
            width: "50%",
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "16px",
          }}
        >
          <Box bgcolor="white" padding="20px" borderRadius="12px">
            <img
              src="https://uiparadox.co.uk/public/templates/flynow/v2/assets/media/cities/image-2.png"
              alt="tmp"
              style={{
                objectFit: "cover",
                height: "auto",
                width: "100%",
                borderRadius: "8px",
              }}
            />

            <Typography marginTop="12px" fontSize="1.2rem">
              Tokyo
            </Typography>
            <Typography fontSize="1rem">
              <FontAwesomeIcon icon={faLocationDot} /> Japan -{" "}
              <FontAwesomeIcon icon={faHotel} fontSize="1rem" /> Hotels
            </Typography>
            <Button
              sx={{
                marginTop: "20px",
                width: "100%",
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
              {" "}
              Discover
            </Button>
          </Box>
          <Box bgcolor="white" padding="20px" borderRadius="12px">
            <img
              src="https://uiparadox.co.uk/public/templates/flynow/v2/assets/media/cities/image-2.png"
              alt="tmp"
              style={{
                objectFit: "cover",
                height: "auto",
                width: "100%",
                borderRadius: "8px",
              }}
            />

            <Typography marginTop="12px" fontSize="1.2rem">
              Tokyo
            </Typography>
            <Typography fontSize="1rem">
              <FontAwesomeIcon icon={faLocationDot} /> Japan -{" "}
              <FontAwesomeIcon icon={faHotel} fontSize="1rem" /> Hotels
            </Typography>
            <Button
              sx={{
                marginTop: "20px",
                width: "100%",
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
              {" "}
              Discover
            </Button>
          </Box>
          <Box bgcolor="white" padding="20px" borderRadius="12px">
            <img
              src="https://uiparadox.co.uk/public/templates/flynow/v2/assets/media/cities/image-2.png"
              alt="tmp"
              style={{
                objectFit: "cover",
                height: "auto",
                width: "100%",
                borderRadius: "8px",
              }}
            />

            <Typography marginTop="12px" fontSize="1.2rem">
              Tokyo
            </Typography>
            <Typography fontSize="1rem">
              <FontAwesomeIcon icon={faLocationDot} /> Japan -{" "}
              <FontAwesomeIcon icon={faHotel} fontSize="1rem" /> Hotels
            </Typography>
            <Button
              sx={{
                marginTop: "20px",
                width: "100%",
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
              {" "}
              Discover
            </Button>
          </Box>
          <Box bgcolor="white" padding="20px" borderRadius="12px">
            <img
              src="https://uiparadox.co.uk/public/templates/flynow/v2/assets/media/cities/image-2.png"
              alt="tmp"
              style={{
                objectFit: "cover",
                height: "auto",
                width: "100%",
                borderRadius: "8px",
              }}
            />

            <Typography marginTop="12px" fontSize="1.2rem">
              Tokyo
            </Typography>
            <Typography fontSize="1rem">
              <FontAwesomeIcon icon={faLocationDot} /> Japan -{" "}
              <FontAwesomeIcon icon={faHotel} fontSize="1rem" /> Hotels
            </Typography>
            <Button
              sx={{
                marginTop: "20px",
                width: "100%",
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
              {" "}
              Discover
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default GlobalTravel;
