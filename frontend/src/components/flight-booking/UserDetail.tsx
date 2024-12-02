import { Box, Typography, TextField, Button } from "@mui/material";
import { useState } from "react";

const UserDetail = () => {
  const [seatOwners, setSeatOwners] = useState([
    { id: 1, firstName: "", lastName: "", dob: "" },
    { id: 2, firstName: "", lastName: "", dob: "" },
    { id: 3, firstName: "", lastName: "", dob: "" },
  ]);
  const [currentSeatIndex, setCurrentSeatIndex] = useState(0);

  const handleInputChange = (
    id: number,
    field: keyof (typeof seatOwners)[0],
    value: string
  ) => {
    setSeatOwners((prev) =>
      prev.map((owner) =>
        owner.id === id ? { ...owner, [field]: value } : owner
      )
    );
  };

  const handleNavigation = (direction: "prev" | "next") => {
    setCurrentSeatIndex((prevIndex) =>
      direction === "prev"
        ? Math.max(prevIndex - 1, 0)
        : Math.min(prevIndex + 1, seatOwners.length - 1)
    );
  };

  return (
    <Box
      sx={{
        marginTop: "40px",
        backgroundColor: "white",
        borderRadius: "20px",
        padding: "20px",
        color: "black",
        boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
      }}
    >
      {/* User's Full Details Section */}
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
          sx={textFieldStyles}
        />
        <TextField
          fullWidth
          label="Last Name*"
          variant="outlined"
          sx={textFieldStyles}
        />
        <TextField
          fullWidth
          label="Email*"
          variant="outlined"
          sx={textFieldStyles}
        />
        <TextField
          fullWidth
          label="Nationality*"
          variant="outlined"
          sx={textFieldStyles}
        />
        <TextField
          fullWidth
          label="Phone Number*"
          variant="outlined"
          sx={textFieldStyles}
        />
        <TextField
          fullWidth
          label="Date of Birth*"
          variant="outlined"
          sx={textFieldStyles}
        />
      </Box>

      {/* Dynamic Seat Owner Information */}
      <Box
        sx={{
          marginTop: "40px",
          backgroundColor: "#f9f9f9",
          borderRadius: "20px",
          padding: "20px",
          textAlign: "center",
        }}
      >
        <Typography
          sx={{
            fontSize: "1.3rem",
            fontWeight: "500",
            marginBottom: "16px",
          }}
        >
          Seat Owner Information - Seat {seatOwners[currentSeatIndex].id}
        </Typography>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "16px",
          }}
        >
          <TextField
            fullWidth
            label="First Name*"
            value={seatOwners[currentSeatIndex].firstName}
            onChange={(e) =>
              handleInputChange(
                seatOwners[currentSeatIndex].id,
                "firstName",
                e.target.value
              )
            }
            variant="outlined"
            sx={textFieldStyles}
          />
          <TextField
            fullWidth
            label="Last Name*"
            value={seatOwners[currentSeatIndex].lastName}
            onChange={(e) =>
              handleInputChange(
                seatOwners[currentSeatIndex].id,
                "lastName",
                e.target.value
              )
            }
            variant="outlined"
            sx={textFieldStyles}
          />
          <TextField
            fullWidth
            label="Date of Birth*"
            value={seatOwners[currentSeatIndex].dob}
            onChange={(e) =>
              handleInputChange(
                seatOwners[currentSeatIndex].id,
                "dob",
                e.target.value
              )
            }
            variant="outlined"
            sx={textFieldStyles}
          />
        </Box>
        <Box
          sx={{
            marginTop: "20px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Button
            variant="outlined"
            disabled={currentSeatIndex === 0}
            onClick={() => handleNavigation("prev")}
          >
            Previous
          </Button>
          <Button
            variant="outlined"
            disabled={currentSeatIndex === seatOwners.length - 1}
            onClick={() => handleNavigation("next")}
          >
            Next
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

const textFieldStyles = {
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
};

export default UserDetail;
