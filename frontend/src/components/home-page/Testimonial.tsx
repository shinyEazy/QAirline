import { Box, Typography } from "@mui/material";
import Slider from "react-slick";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const reviews = [
  {
    id: 1,
    text: "Lorem ipsum dolor sit amet consectetur. Eget ornare ac eleifend leo mauris suspendisse...",
    name: "Mr John Deo",
    position: "CEO at FlyNow",
    image: "https://via.placeholder.com/40",
  },
  {
    id: 2,
    text: "Bibendum suspendisse proin aliquet porttitor sed vulputate proin ultrices et...",
    name: "Ms Jane Doe",
    position: "CTO at SkyHigh",
    image: "https://via.placeholder.com/40",
  },
];

const Testimonial = () => {
  return (
    <Box
      sx={{
        display: "flex",
        backgroundColor: "white",
        padding: "40px",
        borderRadius: "20px",
        margin: "20px 80px",
        color: "black",
        gap: "40px",
      }}
    >
      <Box flex={1}>
        <Typography color="#4D73FC" fontWeight="500" fontSize="1.1rem">
          Testimonials
        </Typography>
        <Typography fontWeight="900" fontSize="3.2rem" marginTop="8px">
          What our clients think about us?
        </Typography>
      </Box>
    </Box>
  );
};

export default Testimonial;
