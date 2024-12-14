import { Box, Divider, Typography, Link, Button } from "@mui/material";
import {
  ArrowForward,
  KeyboardArrowUp,
  KeyboardArrowDown,
} from "@mui/icons-material";
import { useState } from "react";
const newsData = [
  {
    id: 1,
    time: "21/11/2024",
    title: "Fly to Bangkok (Don Mueang International Airport) - Daily flight",
    content:
      "Explore daily flights to Don Mueang International Airport in Bangkok.",
  },
  {
    id: 2,
    time: "25/11/2024",
    title: "New routes to Tokyo starting next month",
    content: "Exciting news! Direct flights to Tokyo will begin in December.",
  },
  {
    id: 3,
    time: "30/11/2024",
    title: "Special discount on flights to Paris this holiday season",
    content:
      "Enjoy a 20% discount on flights to Paris for your holiday travel plans.",
  },
];

const News = () => {
  const [currentNewsIndex, setCurrentNewsIndex] = useState(0);

  const handleNavigate = (direction: "up" | "down") => {
    setCurrentNewsIndex((prevIndex: number) => {
      if (direction === "up") {
        return prevIndex === 0 ? newsData.length - 1 : prevIndex - 1;
      } else {
        return prevIndex === newsData.length - 1 ? 0 : prevIndex + 1;
      }
    });
  };

  const currentNews = newsData[currentNewsIndex];

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        borderRadius: "12px",
        margin: "60px 80px",
        color: "black",
        padding: "20px 40px",
        gap: "20px",
        bgcolor: "white",
        boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Box display="flex" alignItems="center" gap="10px">
        <i
          className="fa-solid fa-newspaper"
          style={{ fontSize: "1.6rem", color: "#003366" }}
        ></i>
        <Typography fontSize="1.6rem" fontWeight="600" color="#003366">
          News
        </Typography>
      </Box>

      <Divider orientation="vertical" flexItem sx={{ borderRightWidth: 2 }} />

      <Box
        display="flex"
        alignItems="start"
        flexGrow={1}
        flexDirection="column"
      >
        <Typography fontSize="1rem" color="gray">
          {currentNews.time}
        </Typography>
        <Link
          href="#"
          underline="hover"
          color="#003366"
          fontSize="1.1rem"
          fontWeight="500"
          sx={{ flexGrow: 1 }}
        >
          {currentNews.title}
        </Link>
      </Box>

      <Box display="flex" alignItems="center" gap="10px">
        <Box display="flex" flexDirection="column" alignItems="center">
          <KeyboardArrowUp
            fontSize="small"
            sx={{ color: "gray", cursor: "pointer" }}
            onClick={() => handleNavigate("up")}
          />
          <Typography fontSize="0.9rem" color="gray">
            {`${currentNewsIndex + 1}/${newsData.length}`}
          </Typography>
          <KeyboardArrowDown
            fontSize="small"
            sx={{ color: "gray", cursor: "pointer" }}
            onClick={() => handleNavigate("down")}
          />
        </Box>
      </Box>

      <Button
        disableRipple
        endIcon={<ArrowForward />}
        variant="text"
        color="primary"
        sx={{
          textTransform: "none",
          fontWeight: "600",
          bgcolor: "rgb(238,238,238)",
          borderRadius: "12px",
          padding: "10px 20px",
          transition: "all 0.3s ease",
          "&:hover": {
            bgcolor: "rgb(218,218,218)",
          },
        }}
      >
        View All
      </Button>
    </Box>
  );
};

export default News;
