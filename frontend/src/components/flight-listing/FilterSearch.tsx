import React, { useState } from "react";
import { Box, Typography, Button, Slider, Divider } from "@mui/material";

const buttonStyles = {
  backgroundColor: "white",
  border: "1px solid #1e90ff",
  color: "#1e90ff",
  lineHeight: "16px",
  textTransform: "none",
  fontSize: "1rem",
  borderRadius: "8px",
  padding: "10px 40px",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  "&:hover": { backgroundColor: "#1e90ff", color: "white" },
};

const FilterSearch = () => {
  const [selectedCabin, setSelectedCabin] = useState<string | null>(null);
  const [selectedPrice, setSelectedPrice] = useState<number>(30);
  const [selectedDepartureTime, setSelectedDepartureTime] = useState<
    string | null
  >(null);
  const [selectedArrivalTime, setSelectedArrivalTime] = useState<string | null>(
    null
  );

  const handleApplyFilters = () => {
    if (!selectedCabin || !selectedDepartureTime || !selectedArrivalTime) {
      alert("Please select all required filters before applying!");
      return;
    }
    // Handle filter application logic here
    console.log("Filters applied:", {
      selectedCabin,
      selectedPrice,
      selectedDepartureTime,
      selectedArrivalTime,
    });
  };

  return (
    <Box
      sx={{
        backgroundColor: "white",
        borderRadius: "20px",
        margin: "40px auto",
        padding: "30px",
        maxWidth: "500px",
        color: "black",
        boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
        display: "flex",
        flexDirection: "column",
        gap: "24px",
      }}
    >
      <Typography variant="h5" sx={{ fontWeight: 600, color: "#333" }}>
        Filter Search
      </Typography>
      <Divider sx={{ height: "1px", backgroundColor: "gray" }} />
      <Box>
        <Typography
          variant="subtitle1"
          sx={{ fontWeight: 500, color: "#555", mb: 1 }}
        >
          Cabin Class
        </Typography>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
            },
            gap: "16px",
          }}
        >
          {["Economy Class", "Business Class", "First Class", "Any"].map(
            (label) => (
              <Button
                disableRipple
                key={label}
                onClick={() => setSelectedCabin(label)}
                sx={{
                  ...buttonStyles,
                  backgroundColor:
                    selectedCabin === label ? "#1e90ff" : "white",
                  color: selectedCabin === label ? "white" : "#1e90ff",
                }}
              >
                {label}
              </Button>
            )
          )}
        </Box>
      </Box>
      <Box>
        <Typography
          variant="subtitle1"
          sx={{ fontWeight: 500, color: "#555", mb: 1 }}
        >
          Price Range
        </Typography>
        <Slider
          defaultValue={30}
          step={10}
          marks={[
            { value: 2, label: "$0" },
            { value: 95, label: "$1000+" },
          ]}
          min={0}
          max={100}
          value={selectedPrice}
          onChange={(_, value) => setSelectedPrice(value as number)}
          aria-label="Price range slider"
          sx={{ width: "100%", color: "#1e90ff" }}
        />
      </Box>
      <Box>
        <Typography
          variant="subtitle1"
          sx={{ fontWeight: 500, color: "#555", mb: 1 }}
        >
          Departure Time
        </Typography>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
            },
            gap: "16px",
          }}
        >
          {[
            { label: "Morning", range: "00:00 - 11:59" },
            { label: "Afternoon", range: "12:00 - 17:59" },
            { label: "Evening", range: "18:00 - 23:59" },
            { label: "Any" },
          ].map(({ label, range }) => (
            <Button
              disableRipple
              key={label}
              onClick={() => setSelectedDepartureTime(label)}
              sx={{
                ...buttonStyles,
                backgroundColor:
                  selectedDepartureTime === label ? "#1e90ff" : "white",
                color: selectedDepartureTime === label ? "white" : "#1e90ff",
              }}
            >
              <Box display="flex" flexDirection="column" alignItems="center">
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  {label}
                </Typography>
                <Typography variant="caption">{range}</Typography>
              </Box>
            </Button>
          ))}
        </Box>
      </Box>
      <Box>
        <Typography
          variant="subtitle1"
          sx={{ fontWeight: 500, color: "#555", mb: 1 }}
        >
          Arrival Time
        </Typography>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
            },
            gap: "16px",
          }}
        >
          {[
            { label: "Morning", range: "00:00 - 11:59" },
            { label: "Afternoon", range: "12:00 - 17:59" },
            { label: "Evening", range: "18:00 - 23:59" },
            { label: "Any" },
          ].map(({ label, range }) => (
            <Button
              disableRipple
              key={label}
              onClick={() => setSelectedArrivalTime(label)}
              sx={{
                ...buttonStyles,
                backgroundColor:
                  selectedArrivalTime === label ? "#1e90ff" : "white",
                color: selectedArrivalTime === label ? "white" : "#1e90ff",
              }}
            >
              <Box display="flex" flexDirection="column" alignItems="center">
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  {label}
                </Typography>
                <Typography variant="caption">{range}</Typography>
              </Box>
            </Button>
          ))}
        </Box>
      </Box>
      <Divider sx={{ backgroundColor: "gray" }} />
      <Box display="flex" justifyContent="end">
        <Button
          disableRipple
          onClick={handleApplyFilters}
          sx={{
            backgroundColor: "#1e90ff",
            color: "white",
            textTransform: "none",
            fontSize: "1rem",
            borderRadius: "8px",
            padding: "10px 40px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            "&:hover": { backgroundColor: "#2177cb" },
          }}
        >
          Apply
        </Button>
      </Box>
    </Box>
  );
};

export default FilterSearch;
