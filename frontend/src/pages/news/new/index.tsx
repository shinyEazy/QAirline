import { Box, Typography } from "@mui/material";
import Header from "components/home-page/Header";
import Footer from "components/home-page/Footer";
import { useNavigate } from "react-router-dom";

interface NewProps {
  id: string;
  title: string;
  content: string;
  image: string;
}

const mockNew: NewProps = {
  id: "1",
  title: "Vote for Bamboo Airways at the World Travel Awards 2024",
  content:
    "Fly to Bangkok (Don Mueang International Airport) - Daily flight\n\nReady to explore the Land of Smiles? \nBamboo Airways brings you the perfect journey to Bangkok, offering an experience beyond expectations: \n\nDaily flights with convenient schedules\n\nWith flights available every day, you can easily plan a trip to Thailand – a destination known for its unique blend of tradition and modernity. \n\nThoughtful service on every flight \nNo need to worry about a long journey, enjoy a complimentary light meal in a comfortable setting with Bamboo Airways' professional service. \n\nSeamless connections at Don Mueang International Airport\nAs one of Thailand’s largest and most vibrant airports, Don Mueang (DMK) offers a quick and efficient immigration process. It’s also a gateway to Bangkok’s top attractions, just a short ride away. From here, you can: \n\nShop at famous markets like Chatuchak\nVisit iconic temples such as Wat Arun and Wat Pho\nSavor Thailand’s vibrant street food scene\n\n\nSpecial fare deals available until December 20, 2024, take this opportunity to plan your adventure to Thailand with your family, friends, or loved ones at an incredibly affordable price. \n\n\n\n\nBook now via our official website, mobile app, authorized agents, or Bamboo Airways ticket offices to enjoy a journey that exceeds expectations!",
  image: "https://via.placeholder.com/150",
};

// Function to convert \n to <br /> tags for proper line breaks
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
              {mockNew.title}
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
            {mockNew.title}
          </Typography>
          <Typography fontSize="1.2rem" marginTop="20px">
            {formatContent(mockNew.content)}
          </Typography>
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};

export default New;
