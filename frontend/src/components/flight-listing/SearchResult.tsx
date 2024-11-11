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
      <Box display="flex" alignItems="center" sx={{ paddingLeft: "16px" }}>
        {/* Departure Time and Airport Code */}
        <Box textAlign="center" sx={{ minWidth: "80px" }}>
          <Typography variant="body2">
            <strong>07:00</strong>
          </Typography>
          <Typography variant="caption" color="text.secondary">
            HAN
          </Typography>
        </Box>

        {/* Image with Centered Text */}
        <Box
          sx={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            mx: 1,
          }}
        >
          {/* Image */}
          <Box sx={{ position: "relative", textAlign: "center" }}>
            <img
              src="/route-plan.png" // Path to your image in the public folder
              alt="Route Plan"
              style={{
                width: "100%", // Adjust width as needed
                maxWidth: "150px", // Optional, to control max size
                height: "auto",
              }}
            />

            {/* Text Below Image */}
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{
                marginTop: "8px", // Space between image and text
              }}
            >
              Bay thẳng
            </Typography>
          </Box>
        </Box>

        {/* Arrival Time and Airport Code */}
        <Box textAlign="center" sx={{ minWidth: "80px" }}>
          <Typography variant="body2">
            <strong>09:10</strong>
          </Typography>
          <Typography variant="caption" color="text.secondary">
            PQC
          </Typography>
        </Box>
      </Box>

      <Box sx={{ textAlign: "left", minWidth: "100px" }}>
        <Typography>Thời gian bay: 2 giờ 10 phút</Typography>
        <Typography>VN 7239 Khai thác bởi QAirline</Typography>
        <Typography>Chi tiết hành trình</Typography>
      </Box>

      <Box sx={{ textAlign: "right", width: "30%" }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 500 }}>
          Price: $240
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
    </Box>
  );
};

export default SearchResult;
