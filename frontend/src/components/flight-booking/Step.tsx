import { Box, Typography, Button } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const Step = () => {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        backgroundColor: "white",
        borderRadius: "20px",
        padding: "20px",
        color: "black",
        boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
        display: "flex",
        gap: "24px",
      }}
    >
      <Box width="100%" display="flex" alignItems="center">
        <FontAwesomeIcon
          onClick={() => navigate("/flight-listing")}
          icon={faCircleCheck}
          style={{ color: "rgb(77,115,252)", fontSize: "40px" }}
        />
        <Typography variant="h6" sx={{ marginLeft: 1 }}>
          Your Selection
        </Typography>
      </Box>
      <Box width="100%" display="flex" alignItems="center">
        <Button
          sx={{
            fontSize: "1.3rem",
            backgroundColor: "rgb(77,115,252)",
            color: "white",
            borderRadius: "50%",
            minWidth: "40px",
            height: "40px",
            padding: 0,
            "&:hover": {
              backgroundColor: "rgb(77,115,252)",
              boxShadow: "none",
            },
          }}
        >
          2
        </Button>
        <Typography variant="h6" sx={{ marginLeft: 1 }}>
          Your Details
        </Typography>
      </Box>
      <Box width="100%" display="flex" alignItems="center">
        <Button
          sx={{
            fontSize: "1.3rem",
            color: "black",
            borderRadius: "50%",
            border: "2px solid black",
            minWidth: "40px",
            height: "40px",
            padding: 0,
            "&:hover": {
              boxShadow: "none",
            },
          }}
        >
          3
        </Button>
        <Typography variant="h6" sx={{ marginLeft: 1 }}>
          Payment
        </Typography>
      </Box>
    </Box>
  );
};

export default Step;
