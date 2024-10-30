import { Box, Typography, Button } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
const LatestFlight = () => {
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      sx={{
        backgroundColor: "rgb(234, 234, 234)",
        borderRadius: "20px",
        margin: "40px 80px",

        color: "black",
      }}
    >
      <Box>
        <Typography fontWeight="600" fontSize="2rem">
          Latest Flight Deals
        </Typography>
      </Box>

      <Box display="flex" gap="10px">
        <Button
          variant="contained"
          sx={{
            backgroundColor: "rgb(77,115,252)",
            width: "48px",
            height: "48px",
            minWidth: "48px",
            borderRadius: "8px",
          }}
        >
          <FontAwesomeIcon icon={faChevronLeft} fontSize="1.4rem" />
        </Button>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "rgb(77,115,252)",
            width: "48px",
            height: "48px",
            minWidth: "48px",
            borderRadius: "8px",
          }}
        >
          <FontAwesomeIcon icon={faChevronRight} fontSize="1.4rem" />
        </Button>
      </Box>
    </Box>
  );
};

export default LatestFlight;
