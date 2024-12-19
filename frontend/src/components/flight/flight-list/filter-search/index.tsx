import React, { useState } from "react";
import { Box, Typography, Button, Slider, Divider } from "@mui/material";
import useFilterStore from "hooks/flight-fitler-hook";

const buttonStyles = {
  backgroundColor: "white",
  border: "1px solid #1e90ff",
  color: "#1e90ff",
  lineHeight: "16px",
  textTransform: "none",
  fontSize: "1rem",
  borderRadius: "8px",
  padding: "10px 20px",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  "&:hover": { backgroundColor: "#1e90ff", color: "white" },
};

const FilterSearch = () => {
  const {
    selectedPrice,
    selectedDepartureTime,
    selectedArrivalTime,
    setSelectedPrice,
    setSelectedDepartureTime,
    setSelectedArrivalTime,
  } = useFilterStore();

  const handleApplyFilters = () => {
    if (!selectedDepartureTime || !selectedArrivalTime) {
      alert("Please select all required filters before applying!");
      return;
    }

    console.log("Filters applied:", {
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
        padding: {
          xs: "20px",
        },
        color: "black",
        boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
        display: "flex",
        flexDirection: "column",
        gap: "24px",
        "@media (max-width:900px)": {
          margin: 0,
          width: "100%",
        },
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
          Price Range
        </Typography>
        <Slider
          defaultValue={100}
          step={10}
          marks={[
            { value: 1, label: "$0" },
            { value: 998, label: "$1000" },
            { value: selectedPrice, label: `$${selectedPrice}` },
          ]}
          min={0}
          max={1000}
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
            { label: "Any", range: "00:00 - 23:59" },
          ].map(({ label, range }) => (
            <Button
              disableRipple
              key={label}
              onClick={() => setSelectedDepartureTime(range)}
              sx={{
                ...buttonStyles,
                backgroundColor:
                  selectedDepartureTime === range ? "#1e90ff" : "white",
                color: selectedDepartureTime === range ? "white" : "#1e90ff",
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
            { label: "Any", range: "00:00 - 23:59" },
          ].map(({ label, range }) => (
            <Button
              disableRipple
              key={label}
              onClick={() => setSelectedArrivalTime(range)}
              sx={{
                ...buttonStyles,
                backgroundColor:
                  selectedArrivalTime === range ? "#1e90ff" : "white",
                color: selectedArrivalTime === range ? "white" : "#1e90ff",
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
