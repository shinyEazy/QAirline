import { Box, Typography, TextField, Button, MenuItem } from "@mui/material";
import { useState } from "react";

interface SeatOwner {
  id: string;
  firstName: string;
  lastName: string;
  dob: string;
  class: string;
  nationality: string;
  phone: string;
  gender: boolean;
}

const UserDetail = () => {
  const [seatOwners, setSeatOwners] = useState<SeatOwner[]>([
    {
      id: "A1",
      firstName: "",
      lastName: "",
      dob: "",
      class: "Economy",
      nationality: "",
      phone: "",
      gender: true,
    },
    {
      id: "A2",
      firstName: "",
      lastName: "",
      dob: "",
      class: "Economy",
      nationality: "",
      phone: "",
      gender: true,
    },
    {
      id: "A3",
      firstName: "",
      lastName: "",
      dob: "",
      class: "Economy",
      nationality: "",
      phone: "",
      gender: true,
    },
  ]);

  const [currentSeatIndex, setCurrentSeatIndex] = useState(0);

  const handleInputChange = (
    id: string,
    field: keyof SeatOwner,
    value: string | boolean
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
      <Box
        sx={{
          borderRadius: "20px",
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
          {seatOwners[currentSeatIndex].class} -{" "}
          {seatOwners[currentSeatIndex].id}
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
            label="Gender*"
            select
            value={seatOwners[currentSeatIndex].gender ? "Male" : "Female"}
            onChange={(e) =>
              handleInputChange(
                seatOwners[currentSeatIndex].id,
                "gender",
                e.target.value === "Male"
              )
            }
            variant="outlined"
            sx={textFieldStyles}
          >
            <MenuItem value="Male">Male</MenuItem>
            <MenuItem value="Female">Female</MenuItem>
          </TextField>
          <TextField
            fullWidth
            label="Date of Birth*"
            type="date"
            InputLabelProps={{ shrink: true }}
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
          <TextField
            fullWidth
            label="Nationality*"
            value={seatOwners[currentSeatIndex].nationality}
            onChange={(e) =>
              handleInputChange(
                seatOwners[currentSeatIndex].id,
                "nationality",
                e.target.value
              )
            }
            variant="outlined"
            sx={textFieldStyles}
          />
          <TextField
            fullWidth
            label="Phone Number*"
            value={seatOwners[currentSeatIndex].phone}
            onChange={(e) =>
              handleInputChange(
                seatOwners[currentSeatIndex].id,
                "phone",
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
            disableRipple
            disabled={currentSeatIndex === 0}
            onClick={() => handleNavigation("prev")}
            sx={{
              backgroundColor: "white",
              borderRadius: "8px",
              color: "#1e90ff",
              width: "150px",
              fontSize: "1rem",
              textTransform: "none",
              padding: "10px 20px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              border: "1px solid #1e90ff",
              transition: "all 0.3s ease",
              "&:hover": {
                backgroundColor: "#1e90ff",
                color: "white ",
                border: "1px solid #1e90ff",
              },
              "&:disabled": {
                backgroundColor: "white",
                color: "white",
                border: "1px solid white",
                boxShadow: "none",
              },
            }}
          >
            Previous
          </Button>
          <Button
            variant="outlined"
            disabled={currentSeatIndex === seatOwners.length - 1}
            onClick={() => handleNavigation("next")}
            sx={{
              backgroundColor: "white",
              borderRadius: "8px",
              color: "#1e90ff",
              width: "150px",
              fontSize: "1rem",
              textTransform: "none",
              border: "1px solid #1e90ff",
              padding: "10px 20px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              transition: "all 0.3s ease",
              "&:hover": {
                backgroundColor: "#1e90ff",
                color: "white ",
                border: "1px solid #1e90ff",
              },
              "&:disabled": {
                backgroundColor: "white",
                color: "white",
                border: "1px solid white",
                boxShadow: "none",
              },
            }}
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
    "& fieldset": { borderColor: "#b0c4de" },
    "&:hover fieldset": { borderColor: "#1e90ff" },
    "&.Mui-focused fieldset": { borderColor: "#1e90ff" },
  },

  "& .MuiInputLabel-shrink": {
    backgroundColor: "white",
    padding: "0 4px",
  },
};

export default UserDetail;
