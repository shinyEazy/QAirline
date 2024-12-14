import { Box, Typography, Grid, Button, Divider, Stack } from "@mui/material";
import Header from "components/home-page/Header";
import Footer from "components/home-page/Footer";
import { useNavigate } from "react-router-dom";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const newsItems = [
  {
    id: 1,
    title: "Update on Bamboo Club Login System Upgrade",
    imageUrl:
      "https://www.bambooairways.com/image/journal/article?img_id=1937815&t=2.3",
  },
  {
    id: 2,
    title: "Fly to Bangkok (Don Mueang International Airport) - Daily flight",
    imageUrl:
      "https://www.bambooairways.com/image/journal/article?img_id=1931938&t=1.9",
  },
  {
    id: 3,
    title:
      "Be cautious of tactics impersonating the Vietnam Civil Aviation Authority",
    imageUrl:
      "https://www.bambooairways.com/image/journal/article?img_id=1912358&t=2.3",
  },
  {
    id: 4,
    title: "Vote for Bamboo Airways at the World Travel Awards 2024",
    imageUrl:
      "https://www.bambooairways.com/documents/d/global/449853545_484792347399617_8667786688385885570_n-jpg",
  },
  {
    id: 5,
    title: "Update on Bamboo Club Login System Upgrade",
    imageUrl:
      "https://www.bambooairways.com/image/journal/article?img_id=1884578&t=2",
  },
  {
    id: 6,
    title: "Fly to Bangkok (Don Mueang International Airport) - Daily flight",
    imageUrl:
      "https://www.bambooairways.com/image/journal/article?img_id=1937815&t=2.3",
  },
  {
    id: 7,
    title:
      "Be cautious of tactics impersonating the Vietnam Civil Aviation Authority",
    imageUrl:
      "https://www.bambooairways.com/image/journal/article?img_id=1937815&t=2.3",
  },
  {
    id: 8,
    title: "Vote for Bamboo Airways at the World Travel Awards 2024",
    imageUrl:
      "https://www.bambooairways.com/image/journal/article?img_id=1937815&t=2.3",
  },
];

const readMoreStyle = {
  position: "relative",
  display: "inline-block",
  cursor: "pointer",
  "&::after": {
    content: '""',
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    height: "2px",
    backgroundColor: "currentColor",
    transform: "scaleX(0)",
    transformOrigin: "bottom right",
    transition: "transform 0.3s ease",
  },
  "&:hover::after": {
    transform: "scaleX(1)",
    transformOrigin: "bottom left",
  },
};

const paginationStyle = {
  textTransform: "none",
  fontWeight: "500",
  color: "black",
  opacity: "0.6",
  transition: "opacity 0.3s ease, color 0.3s ease",
  "&:hover": {
    opacity: "1",
    color: "#1976d2",
    backgroundColor: "transparent",
  },
};

const titleStyle = {
  cursor: "pointer",
  transition: "color 0.3s ease",
  "&:hover": {
    color: "#1976d2",
  },
};

const PAGE_SIZE = 5;

const NewsList = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentPage, setCurrentPage] = useState(1);

  const sortedNews = [...newsItems].sort((a, b) => b.id - a.id);
  const totalPages = Math.ceil(newsItems.length / PAGE_SIZE);

  const paginatedNews = sortedNews.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [currentPage]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "auto",
    });
  }, []);

  return (
    <Box>
      <Header />
      <Box sx={{ bgcolor: "rgb(242,244,247)" }}>
        <Box
          display="flex"
          alignItems="center"
          gap="10px"
          margin="auto"
          padding="20px 0"
          bgcolor="rgb(242,244,247)"
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              width: "1200px",
              margin: "auto",
            }}
          >
            <i
              onClick={() => navigate("/")}
              className="fa-solid fa-house"
              style={{
                opacity: "0.6",
                transition: "opacity 0.3s ease, transform 0.3s ease",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.6")}
            ></i>
            <i
              className="fa-regular fa-greater-than"
              style={{
                opacity: "0.6",
              }}
            ></i>
            <Typography
              onClick={() => navigate("/")}
              variant="h6"
              sx={{
                opacity: 0.6,
                transition: "opacity 0.3s ease, text-decoration 0.3s ease",
                cursor: "pointer",
                "&:hover": {
                  opacity: 1,
                  textDecoration: "underline",
                },
              }}
            >
              QAirline
            </Typography>
            <i
              className="fa-regular fa-greater-than"
              style={{
                opacity: "0.6",
              }}
            ></i>
            <Typography
              onClick={() => goToPage(1)}
              variant="h6"
              sx={{
                opacity: 0.6,
                transition: "opacity 0.3s ease, text-decoration 0.3s ease",
                cursor: "pointer",
                "&:hover": {
                  opacity: 1,
                  textDecoration: "underline",
                },
              }}
            >
              News
            </Typography>
          </Box>
        </Box>
        <Box width="1200px" margin="auto">
          <Typography variant="h4">News</Typography>
        </Box>
        <Box width="1200px" margin="auto" marginTop="20px">
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Box>
                <Box
                  sx={{
                    width: "100%",
                    height: "368px",
                    overflow: "hidden",
                    borderRadius: "10px",
                  }}
                >
                  <img
                    onClick={() =>
                      navigate(`/news/new/${paginatedNews[0]?.id}`)
                    }
                    src={paginatedNews[0]?.imageUrl}
                    alt={paginatedNews[0]?.title}
                    style={{
                      height: "368px",
                      width: "100%",
                      objectFit: "cover",
                      borderRadius: "10px",
                      cursor: "pointer",
                      transition: "transform 0.3s ease-in-out",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.transform = "scale(1.1)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.transform = "scale(1)")
                    }
                  />
                </Box>
                <Box mt={2}>
                  <Typography
                    onClick={() =>
                      navigate(`/news/new/${paginatedNews[0]?.id}`)
                    }
                    variant="h5"
                    sx={titleStyle}
                  >
                    {paginatedNews[0]?.title}{" "}
                  </Typography>
                  <Typography
                    onClick={() =>
                      navigate(`/news/new/${paginatedNews[0]?.id}`)
                    }
                    variant="h6"
                    color="primary"
                    sx={readMoreStyle}
                  >
                    Read More
                  </Typography>
                </Box>
              </Box>
            </Grid>
            {paginatedNews.slice(1).map((news) => (
              <Grid item xs={12} md={6} key={news.id}>
                <Box>
                  <Box
                    sx={{
                      width: "100%",
                      height: "368px",
                      overflow: "hidden",
                      borderRadius: "10px",
                    }}
                  >
                    <img
                      src={news.imageUrl}
                      alt={news.title}
                      style={{
                        height: "368px",
                        width: "100%",
                        objectFit: "cover",
                        borderRadius: "10px",
                        cursor: "pointer",
                        transition: "transform 0.3s ease-in-out",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.transform = "scale(1.1)")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.transform = "scale(1)")
                      }
                    />
                  </Box>
                  <Typography variant="h5" sx={titleStyle} marginTop="16px">
                    {news.title}
                  </Typography>
                  <Typography variant="h6" color="primary" sx={readMoreStyle}>
                    Read More
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Pagination */}
        <Box width="1200px" margin="auto" mt={3}>
          <Divider />
          <Stack
            direction="row"
            justifyContent="center"
            spacing={2}
            padding="20px 0"
          >
            <Button
              disableRipple
              onClick={() => goToPage(1)}
              sx={paginationStyle}
              startIcon={<ArrowBack />}
            >
              First
            </Button>
            <Button
              disableRipple
              onClick={() => goToPage(currentPage - 1)}
              sx={paginationStyle}
            >
              Previous
            </Button>
            <Box>
              <Typography fontSize="1.2rem">
                Page {currentPage} of {totalPages}
              </Typography>
            </Box>

            <Button
              disableRipple
              onClick={() => goToPage(currentPage + 1)}
              sx={paginationStyle}
            >
              Next
            </Button>
            <Button
              disableRipple
              onClick={() => goToPage(totalPages)}
              sx={paginationStyle}
              endIcon={<ArrowForward />}
            >
              Last
            </Button>
          </Stack>
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};

export default NewsList;
