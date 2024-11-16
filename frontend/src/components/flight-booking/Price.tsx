import { Box, Divider, Typography } from "@mui/material";

const Price = () => {
  return (
    <Box
      sx={{
        backgroundColor: "white",
        borderRadius: "20px",
        padding: "20px",
        color: "black",
        boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
        marginTop: "40px",
      }}
    >
      <Typography variant="h6">Price Summary</Typography>

      <Box display="flex" justifyContent="space-between" marginTop="20px">
        <Typography>Adult x 1</Typography>
        <Typography>540$</Typography>
      </Box>
      <Divider sx={{ margin: "20px 0" }} />
      <Box>
        <Box display="flex" justifyContent="space-between">
          <Typography>Deal / Discount</Typography>
          <Typography>40$</Typography>
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Typography>Total</Typography>
          <Typography>500$</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Price;
