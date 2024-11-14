import { Box, Typography, Button, TextField } from "@mui/material";

const Step = () => {
  return (
    <Box
      sx={{
        marginTop: "40px",
        backgroundColor: "white",
        borderRadius: "20px",
        padding: "20px",
        color: "black",
        boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
        gap: "24px",
      }}
    >
      <Typography
        sx={{
          fontSize: "1.3rem",
          fontWeight: "500",
        }}
      >
        Your Details
      </Typography>
      <Box
        sx={{
          marginTop: "32px",
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "16px",
        }}
      >
        <TextField
          fullWidth
          label="First Name*"
          variant="outlined"
          sx={{
            margin: "auto",
            "& .MuiOutlinedInput-root": {
              borderRadius: "8px",
              "& fieldset": {
                borderColor: "#bdbdbd",
              },
              "&:hover fieldset": {
                borderColor: "black",
              },
              "&.Mui-focused fieldset": {
                borderColor: "rgb(99,91,255)",
              },
            },
          }}
        />
        <TextField
          fullWidth
          label="Last Name*"
          variant="outlined"
          sx={{
            margin: "auto",
            "& .MuiOutlinedInput-root": {
              borderRadius: "8px",
              "& fieldset": {
                borderColor: "#bdbdbd",
              },
              "&:hover fieldset": {
                borderColor: "black",
              },
              "&.Mui-focused fieldset": {
                borderColor: "rgb(99,91,255)",
              },
            },
          }}
        />
        <TextField
          fullWidth
          label="Email*"
          variant="outlined"
          sx={{
            margin: "auto",
            "& .MuiOutlinedInput-root": {
              borderRadius: "8px",
              "& fieldset": {
                borderColor: "#bdbdbd",
              },
              "&:hover fieldset": {
                borderColor: "black",
              },
              "&.Mui-focused fieldset": {
                borderColor: "rgb(99,91,255)",
              },
            },
          }}
        />
        <TextField
          fullWidth
          label="Nationality*"
          variant="outlined"
          sx={{
            margin: "auto",
            "& .MuiOutlinedInput-root": {
              borderRadius: "8px",
              "& fieldset": {
                borderColor: "#bdbdbd",
              },
              "&:hover fieldset": {
                borderColor: "black",
              },
              "&.Mui-focused fieldset": {
                borderColor: "rgb(99,91,255)",
              },
            },
          }}
        />
        <TextField
          fullWidth
          label="Phone Number*"
          variant="outlined"
          sx={{
            margin: "auto",
            "& .MuiOutlinedInput-root": {
              borderRadius: "8px",
              "& fieldset": {
                borderColor: "#bdbdbd",
              },
              "&:hover fieldset": {
                borderColor: "black",
              },
              "&.Mui-focused fieldset": {
                borderColor: "rgb(99,91,255)",
              },
            },
          }}
        />
        <TextField
          fullWidth
          label="Date of Birth*"
          variant="outlined"
          sx={{
            margin: "auto",
            "& .MuiOutlinedInput-root": {
              borderRadius: "8px",
              "& fieldset": {
                borderColor: "#bdbdbd",
              },
              "&:hover fieldset": {
                borderColor: "black",
              },
              "&.Mui-focused fieldset": {
                borderColor: "rgb(99,91,255)",
              },
            },
          }}
        />
      </Box>
    </Box>
  );
};

export default Step;
