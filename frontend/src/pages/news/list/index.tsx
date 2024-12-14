import { Box, Typography, Grid, Button, Divider, Stack } from "@mui/material";
import Header from "components/home-page/Header";
import Footer from "components/home-page/Footer";
import { useNavigate } from "react-router-dom";
import { ArrowBack, ArrowForward } from "@mui/icons-material";

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

const NewsList = () => {
  const navigate = useNavigate();

  return (
    <Box>
      <Header />
      <Box sx={{ bgcolor: "rgb(234, 234, 234)" }}>
        <Box
          display="flex"
          alignItems="center"
          gap="10px"
          margin="auto"
          padding="20px 0"
          bgcolor="rgb(234, 234, 234)"
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
            {/* First row with 1 item */}
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
                    src={newsItems[0].imageUrl}
                    style={{
                      height: "368px",
                      width: "100%",
                      objectFit: "cover",
                      borderRadius: "10px",
                      cursor: "pointer",
                      transition: "transform 0.3s ease-in-out",
                    }}
                    alt={newsItems[0].title}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.transform = "scale(1.1)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.transform = "scale(1)")
                    }
                  />
                </Box>
                <Box mt={2}>
                  <Typography variant="h5" sx={titleStyle}>
                    {newsItems[0].title}
                  </Typography>
                  <Typography variant="h6" color="primary" sx={readMoreStyle}>
                    Read More
                  </Typography>
                </Box>
              </Box>
            </Grid>

            {/* Second row with 2 items */}
            <Grid item xs={12} md={6}>
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
                    src={newsItems[1].imageUrl}
                    style={{
                      height: "368px",
                      width: "100%",
                      objectFit: "cover",
                      borderRadius: "10px",
                      cursor: "pointer",
                      transition: "transform 0.3s ease-in-out",
                    }}
                    alt={newsItems[1].title}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.transform = "scale(1.1)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.transform = "scale(1)")
                    }
                  />
                </Box>
                <Box mt={2}>
                  <Typography variant="h5" sx={titleStyle}>
                    {newsItems[1].title}
                  </Typography>
                  <Typography variant="h6" color="primary" sx={readMoreStyle}>
                    Read More
                  </Typography>
                </Box>
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
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
                    src={newsItems[2].imageUrl}
                    style={{
                      height: "368px",
                      width: "100%",
                      objectFit: "cover",
                      borderRadius: "10px",
                      cursor: "pointer",
                      transition: "transform 0.3s ease-in-out",
                    }}
                    alt={newsItems[2].title}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.transform = "scale(1.1)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.transform = "scale(1)")
                    }
                  />
                </Box>
                <Box mt={2}>
                  <Typography variant="h5" sx={titleStyle}>
                    {newsItems[2].title}
                  </Typography>
                  <Typography variant="h6" color="primary" sx={readMoreStyle}>
                    Read More
                  </Typography>
                </Box>
              </Box>
            </Grid>

            {/* Third row with 2 items */}
            <Grid item xs={12} md={6}>
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
                    src={newsItems[3].imageUrl}
                    style={{
                      height: "368px",
                      width: "100%",
                      objectFit: "cover",
                      borderRadius: "10px",
                      cursor: "pointer",
                      transition: "transform 0.3s ease-in-out",
                    }}
                    alt={newsItems[3].title}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.transform = "scale(1.1)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.transform = "scale(1)")
                    }
                  />
                </Box>
                <Box mt={2}>
                  <Typography variant="h5" sx={titleStyle}>
                    {newsItems[3].title}
                  </Typography>
                  <Typography variant="h6" color="primary" sx={readMoreStyle}>
                    Read More
                  </Typography>
                </Box>
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
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
                    src={newsItems[4].imageUrl}
                    style={{
                      height: "368px",
                      width: "100%",
                      objectFit: "cover",
                      borderRadius: "10px",
                      cursor: "pointer",
                      transition: "transform 0.3s ease-in-out",
                    }}
                    alt={newsItems[4].title}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.transform = "scale(1.1)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.transform = "scale(1)")
                    }
                  />
                </Box>
                <Box mt={2}>
                  <Typography variant="h5" sx={titleStyle}>
                    {newsItems[4].title}
                  </Typography>
                  <Typography variant="h6" color="primary" sx={readMoreStyle}>
                    Read More
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>

        {/* Pagination */}
        <Box width="1200px" margin="auto">
          <Divider sx={{ margin: "20px 0" }} />
          <Stack
            direction="row"
            spacing={2}
            justifyContent="center"
            paddingBottom="20px"
          >
            <Button
              disableRipple
              variant="text"
              startIcon={<ArrowBack />}
              sx={paginationStyle}
            >
              First
            </Button>
            <Button disableRipple variant="text" sx={paginationStyle}>
              Previous
            </Button>
            <Button disableRipple variant="text" sx={paginationStyle}>
              Next
            </Button>
            <Button
              disableRipple
              variant="text"
              endIcon={<ArrowForward />}
              sx={paginationStyle}
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
