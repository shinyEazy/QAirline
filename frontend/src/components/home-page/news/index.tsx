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
        const sortedNews = fetchedNews.sort(
          (a, b) => b.advert_id - a.advert_id
        );

        setNewsData(sortedNews);
      } catch (err) {
        console.error("Error fetching news data", err);
        setError("Failed to load news. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchNewsData();
  }, []);

  const handleNavigate = (direction: "up" | "down") => {
    setCurrentNewsIndex((prevIndex: number) => {
      if (newsData.length === 0) return prevIndex;
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

  const shortenText = (text: string, maxLength: number) => {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + "...";
    }
    return text;
  };

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
        <Typography
          onClick={() => navigate(`/news/new/${currentNews?.advert_id}`)}
          fontSize="1rem"
          color="gray"
          sx={{ "&:hover": { textDecoration: "underline", cursor: "pointer" } }}
        >
          {currentNews?.advert_name || "No Name Available"}
        </Typography>
        <Typography
          onClick={() => navigate(`/news/new/${currentNews?.advert_id}`)}
          color="#003366"
          fontSize="1.2rem"
          fontWeight="500"
          sx={{
            flexGrow: 1,
            "&:hover": { textDecoration: "underline", cursor: "pointer" },
          }}
        >
          {shortenText(currentNews?.text || "No news text", 100)}
        </Typography>
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
