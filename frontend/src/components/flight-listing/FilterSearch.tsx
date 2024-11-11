import { Box, Typography, Button, Slider } from "@mui/material";

const buttonStyles = {
  border: "1px solid #000",
  padding: "10px 20px",
  borderRadius: "8px",
  height: "52px",
  lineHeight: "16px",
  textAlign: "center",
  backgroundColor: "#fff",
  color: "#000",
  transition: "background-color 0.3s, color 0.3s",
  "&:hover": {
    backgroundColor: "#f0f0f0",
    color: "#333",
  },
  "&:active": {
    backgroundColor: "#e0e0e0",
    color: "#111",
  },
};

const FilterSearch = () => {
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
          {[
            "Economy Class",
            "Business Class",
            "First Class",
            "Premium Economy",
          ].map((label) => (
            <Button key={label} sx={buttonStyles}>
              {label}
            </Button>
          ))}
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
          aria-label="Price range slider"
          sx={{ width: "100%" }}
        />
      </Box>
      <Box>
        <Typography
          variant="subtitle1"
          sx={{ fontWeight: 500, color: "#555", mb: 1 }}
        >
          Stops
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
            { label: "Any" },
            { label: "Non-stop" },
            { label: "1 Stop" },
            { label: "2 Stop" },
          ].map(({ label }) => (
            <Button key={label} sx={buttonStyles}>
              <Box display="flex" flexDirection="column" alignItems="center">
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  {label}
                </Typography>
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
            { label: "Morning", range: "5 AM - 12 AM" },
            { label: "Afternoon", range: "12 PM - 5 PM" },
            { label: "Evening", range: "5 PM - 10 PM" },
            { label: "Night", range: "10 PM - 5 AM" },
          ].map(({ label, range }) => (
            <Button key={label} sx={buttonStyles}>
              <Box display="flex" flexDirection="column" alignItems="center">
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  {label}
                </Typography>
                <Typography variant="caption" sx={{ color: "#777" }}>
                  {range}
                </Typography>
              </Box>
            </Button>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default FilterSearch;
