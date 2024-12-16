import { Box, Typography } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlane, faDollarSign } from "@fortawesome/free-solid-svg-icons";
import { faComments } from "@fortawesome/free-regular-svg-icons";

const Benefit = () => {
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      sx={{
        backgroundColor: "rgb(234, 234, 234)",
        borderRadius: "20px",
        margin: "40px 80px",
        color: "black",
        "@media (max-width: 1000px)": {
          margin: "20px",
          overflow: "hidden",
          flexDirection: "column",
          gap: "20px",
        },
      }}
      gap="40px"
    >
      <Box
        bgcolor="white"
        sx={{ flex: "1", borderRadius: "12px" }}
        padding="10px 20px"
        display="flex"
        flexDirection="row"
        justifyContent="center"
        alignItems="center"
      >
        <FontAwesomeIcon
          icon={faComments}
          fontSize="2.3rem"
          style={{ color: "rgb(77, 115, 252)" }}
        />

        <Box marginLeft="20px">
          <Typography fontSize="1.4rem" fontWeight="400">
            We are Now Available
          </Typography>
          <Typography>Call 0989.xxx.xxx contact with us</Typography>
        </Box>
      </Box>
      <Box
        bgcolor="white"
        sx={{ flex: "1", borderRadius: "12px" }}
        padding="10px 20px"
        display="flex"
        flexDirection="row"
        justifyContent="center"
        alignItems="center"
      >
        <FontAwesomeIcon
          icon={faPlane}
          fontSize="2.3rem"
          style={{ color: "rgb(77, 115, 252)" }}
        />
        <Box marginLeft="20px">
          <Typography fontSize="1.4rem" fontWeight="400">
            International Flight
          </Typography>
          <Typography>Call 0989.xxx.xxx contact with us</Typography>
        </Box>
      </Box>
      <Box
        bgcolor="white"
        sx={{ flex: "1", borderRadius: "12px" }}
        padding="10px 20px"
        display="flex"
        flexDirection="row"
        justifyContent="center"
        alignItems="center"
      >
        <FontAwesomeIcon
          icon={faDollarSign}
          fontSize="2.3rem"
          style={{ color: "rgb(77, 115, 252)" }}
        />
        <Box marginLeft="20px">
          <Typography fontSize="1.4rem" fontWeight="400">
            Check Refund
          </Typography>
          <Typography>Call 0989.xxx.xxx contact with us</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Benefit;
