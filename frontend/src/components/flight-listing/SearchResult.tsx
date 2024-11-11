import { Box, Typography, Button, Divider } from "@mui/material";
import FlightIcon from "@mui/icons-material/Flight"; // You can use an airplane icon here

const SearchResult = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#f5f7fa",
        borderRadius: "16px",
        padding: "20px",
        margin: "16px 0",
        display: "flex",
        alignItems: "center",
        gap: "16px",
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Box sx={{ textAlign: "center", minWidth: "80px" }}>
        <Box
          sx={{
            width: "50px",
            height: "50px",
            borderRadius: "50%",
            backgroundColor: "#007aff", // Airline logo background color
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            fontWeight: "bold",
          }}
        ></Box>
        <Typography variant="subtitle2" sx={{ fontWeight: 600, mt: 1 }}>
          Feel Dubai Airline
        </Typography>
        <Typography variant="caption" color="text.secondary">
          Boeing 777-90
        </Typography>
      </Box>

      <Box sx={{ flex: 1, paddingLeft: "16px" }}>
        <Typography variant="body2">
          <strong>12:00</strong> DUB
          <FlightIcon
            sx={{
              mx: 1,
              fontSize: "small",
              color: "primary.main",
              transform: "rotate(90deg)",
            }}
          />
          <strong>12:50</strong> SHJ
        </Typography>
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ display: "flex", alignItems: "center", gap: "4px" }}
        >
          <span>0h 50m</span> · 1 Stop
        </Typography>
      </Box>

      <Box sx={{ textAlign: "right", minWidth: "100px" }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 500 }}>
          Price
        </Typography>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          $240
        </Typography>
        <Button
          variant="contained"
          color="primary"
          sx={{
            mt: 1,
            borderRadius: "8px",
            textTransform: "none",
            padding: "6px 16px",
          }}
        >
          Book Now
        </Button>
      </Box>

      <Box sx={{ textAlign: "right", width: "100%" }}>
        <Typography
          variant="body2"
          sx={{ color: "primary.main", fontWeight: 500, cursor: "pointer" }}
        >
          Flight Detail
        </Typography>
      </Box>
    </Box>
  );
};

export default SearchResult;
