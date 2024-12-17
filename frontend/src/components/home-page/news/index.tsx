import { Box, Divider, Typography, Link, Button } from "@mui/material";
import {
  ArrowForward,
  KeyboardArrowUp,
  KeyboardArrowDown,
} from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAdverts } from "hooks/advert-hook";
const News = () => {
  const navigate = useNavigate();
  const [newsData, setNewsData] = useState([]);
  const [currentNewsIndex, setCurrentNewsIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    const fetchNewsData = async () => {
      try {
        const fetchedNews = await getAdverts();
        setNewsData(fetchedNews); // Update state with fetched news
      } catch (err) {
        console.error("Error fetching news data", err);
        setError("Failed to load news. Please try again later.");
      } finally {
        setLoading(false); // Ensure loading state is updated
      }
    };

    fetchNewsData();
  }, []);
  const handleNavigate = (direction: "up" | "down") => {
    setCurrentNewsIndex((prevIndex: number) => {
      if (newsData.length === 0) return prevIndex; // Prevent navigation if no data
      if (direction === "up") {
        return prevIndex === 0 ? newsData.length - 1 : prevIndex - 1;
      } else {
        return prevIndex === newsData.length - 1 ? 0 : prevIndex + 1;
      }
    });
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const currentNews = newsData[currentNewsIndex];

  console.log(newsData);
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
        "@media (max-width: 1000px)": {
          padding: "10px 20px",
          margin: "60px 20px 40px",
          gap: "8px",
        },
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
          {currentNews?.advert_name || "No Name Available"}
        </Typography>
        <Link
          href="#"
          underline="hover"
          color="#003366"
          fontSize="1.1rem"
          fontWeight="500"
          sx={{ flexGrow: 1 }}
        >
          {currentNews?.text || "No news text"}
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
        onClick={() => navigate("/news/list")}
        disableRipple
        endIcon={<ArrowForward />}
        variant="text"
        color="primary"
        sx={{
          textTransform: "none",
          fontWeight: "600",
          bgcolor: "rgb(238,238,238)",
          borderRadius: "12px",
          padding: "10px 32px",
          transition: "all 0.3s ease",
          whiteSpace: "nowrap",
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
