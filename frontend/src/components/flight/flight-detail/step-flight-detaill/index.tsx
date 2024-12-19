import { Box, Typography, Button } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const StepFlightDetail = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        backgroundColor: "white",
        borderRadius: "20px",
        padding: "20px 40px",
        color: "black",
        boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <Box display="flex" alignItems="center">
        <FontAwesomeIcon
          onClick={() => navigate("/flight/list")}
          icon={faCircleCheck}
          style={{
            color: "rgb(77,115,252)",
            fontSize: "40px",
            cursor: "pointer",
          }}
        />
        <Typography variant="h6" sx={{ marginLeft: 1 }}>
          Select Flight
        </Typography>
      </Box>
      <Box display="flex" alignItems="center">
        <FontAwesomeIcon
          onClick={() => navigate("/flight/seat")}
          icon={faCircleCheck}
          style={{
            color: "rgb(77,115,252)",
            fontSize: "40px",
            cursor: "pointer",
          }}
        />
        <Typography variant="h6" sx={{ marginLeft: 1 }}>
          Choose Seat
        </Typography>
      </Box>
      <Box display="flex" alignItems="center">
        <Button
          disableRipple
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
          3
        </Button>
        <Typography variant="h6" sx={{ marginLeft: 1 }}>
          Enter Details
        </Typography>
      </Box>
      <Box display="flex" alignItems="center">
        <Button
          disabled
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
            cursor: "not-allowed",
            "&.Mui-disabled": {
              color: "black",
            },
          }}
        >
          4
        </Button>
        <Typography variant="h6" sx={{ marginLeft: 1 }}>
          Payment
        </Typography>
      </Box>
    </Box>
  );
};

export default StepFlightDetail;
