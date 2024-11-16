import { Box, Divider, Typography } from "@mui/material";

const BookingDetail = () => {
  return (
    <Box
      sx={{
        backgroundColor: "white",
        borderRadius: "20px",
        padding: "20px",
        color: "black",
        boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Typography variant="h6">Your Booking Detail</Typography>
      <Box display="flex" alignItems="center" marginTop="20px">
        <Box textAlign="center" sx={{ minWidth: "80px" }}>
          <Typography fontSize="1.2rem">
            <strong>07:00</strong>
          </Typography>
          <Typography fontSize="1rem" color="text.secondary">
            HAN
          </Typography>
        </Box>

        <Box
          sx={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            mx: 2,
          }}
        >
          <Box display="flex" flexDirection="column" alignItems="center">
            <img
              src="/route-plan.png"
              alt="Route Plan"
              style={{
                width: "100%",
                maxWidth: "150px",
                height: "auto",
              }}
            />
            <Typography fontSize="1rem" color="text.secondary">
              Bay thẳng
            </Typography>
          </Box>
        </Box>

        <Box textAlign="center" sx={{ minWidth: "80px" }}>
          <Typography fontSize="1.2rem">
            <strong>09:10</strong>
          </Typography>
          <Typography fontSize="1rem" color="text.secondary">
            PQC
          </Typography>
        </Box>
      </Box>
      <Box display="flex" justifyContent="space-between" marginTop="20px">
        <Box>
          <Typography variant="h6">Departure</Typography>
          <Typography>11 November, 2024</Typography>
        </Box>
        <Divider orientation="vertical" flexItem />
        <Box>
          <Typography variant="h6">Arrival</Typography>
          <Typography>11 November, 2024</Typography>
        </Box>
      </Box>
      <Divider sx={{ margin: "20px 0" }} />
      <Typography fontSize="0.9rem" color="text.secondary">
        Economy | Flight FK234 | Aircraft BOEING 777-90 <br />
      </Typography>
    </Box>
  );
};

export default BookingDetail;
