import { Box, Typography } from "@mui/material";
import Header from "components/home-page/Header";
import Footer from "components/home-page/Footer";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAdverts } from "hooks/advert-hook";

interface NewProps {
  id: number;
  title: string;
  content: string;
  image: string;
}

const formatContent = (content: string) => {
  return content.split("\n").map((line, index) => (
    <span key={index}>
      {line}
      <br />
    </span>
  ));
};

const New = ({ id, title, content, image }: NewProps) => {
  const navigate = useNavigate();
  const { advert_id } = useParams();
  const [news, setNews] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const fetchedNews = await getAdverts();

        const selectedNews = fetchedNews.find(
          (item) => item.advert_id === Number(advert_id)
        );

        setNews(selectedNews);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };

    fetchNews();
  }, [advert_id]);

  console.log(news);

  return (
    <Box>
      <Header />
      <Box bgcolor="rgb(242,244,247)">
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
              margin: "20px 80px 0",
              "@media (max-width: 1000px)": {
                margin: "0 20px 0",
              },
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
              onClick={() => navigate("/news/list")}
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
              }}
            >
              {news?.advert_name}
            </Typography>
          </Box>
        </Box>

        <Box
          margin="0 80px 0"
          paddingBottom="40px"
          sx={{
            "@media (max-width: 1000px)": {
              margin: "0 20px 0",
            },
          }}
        >
          <Typography variant="h4" color="#1976d2">
            {news?.advert_name}
          </Typography>
          <Box>
            <img
              src={news.media_link}
              alt={news.advert_name}
              style={{
                marginTop: "20px",
                height: "368px",
                width: "100%",
                objectFit: "cover",
                borderRadius: "10px",
                transition: "transform 0.3s ease-in-out",
              }}
            />
          </Box>
          <Typography fontSize="1.2rem" marginTop="20px">
            {news?.text}
          </Typography>
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};

export default New;
