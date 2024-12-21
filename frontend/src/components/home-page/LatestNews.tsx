import { Box, Typography, Button } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faCalendarDays } from "@fortawesome/free-regular-svg-icons";

const LatestNews = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#EAEAEA",
        borderRadius: "20px",
        padding: "40px 80px",
        color: "black",
        "@media(max-width: 1000px)": {
          padding: "20px 20px 40px",
        },
      }}
    >
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography fontWeight="600" fontSize="1.7rem">
          Our Latest News
        </Typography>

        <Box display="flex">
          <Button
            sx={{
              backgroundColor: "#4D73FC",
              borderRadius: "8px",
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textTransform: "none",
              padding: "8px 20px",
              "&:hover": {
                backgroundColor: "#3B5FC1",
              },
            }}
          >
            Show more
          </Button>
        </Box>
      </Box>
      <Box
        sx={{
          flex: "1",
          width: "100%",
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "16px",
        }}
      >
        <Box
          padding="20px"
          bgcolor="white"
          display="flex"
          justifyContent="space-between"
          gap="20px"
          borderRadius="20px"
        >
          <Box width="50%">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYmKE0ObEQKC_zSfUi-ON8xlFlxn4WmXI-jQ&s"
              style={{
                width: "100%",
                objectFit: "cover",
                height: "100%",
                borderRadius: "8px",
              }}
              alt="Blog"
            />
          </Box>
          <Box
            width="50%"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="start"
            gap="16px"
          >
            <Typography>
              <FontAwesomeIcon icon={faUser} />
              Anh Nguyen <strong> | </strong>
              <FontAwesomeIcon icon={faCalendarDays} /> 12 Dec, 2024
            </Typography>
            <Typography fontWeight="500" fontSize="1.1rem">
              Sky-High Escapades: Travel Tips for Adventurers
            </Typography>
            <Typography fontSize="1rem" textAlign="start">
              Unlock the secrets to effortless travel and exploration.
            </Typography>
            <Button
              sx={{
                backgroundColor: "#4D73FC",
                borderRadius: "8px",
                color: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                textTransform: "none",
                padding: "8px 20px",
                "&:hover": {
                  backgroundColor: "#3B5FC1",
                },
              }}
            >
              Read More
            </Button>
          </Box>
        </Box>

        <Box
          padding="20px"
          bgcolor="white"
          display="flex"
          justifyContent="space-between"
          gap="20px"
          borderRadius="20px"
        >
          <Box width="50%">
            <img
              src="https://i2.ex-cdn.com/crystalbay.com/files/content/2024/05/13/charter-flight-tashkent-cam-ranh-thang-6-7-2024-1-1808.jpeg"
              style={{
                width: "100%",
                objectFit: "cover",
                height: "100%",
                borderRadius: "8px",
              }}
              alt="Blog"
            />
          </Box>
          <Box
            width="50%"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="start"
            gap="16px"
          >
            <Typography>
              <FontAwesomeIcon icon={faUser} /> Anh Bui <strong>| </strong>
              <FontAwesomeIcon icon={faCalendarDays} /> 08 Dec, 2024
            </Typography>
            <Typography fontWeight="500" fontSize="1.1rem">
              Navigating the Skies: A Guide to Hassle-Free Travel
            </Typography>
            <Typography fontSize="1rem" textAlign="start">
              Tips for making your journey smooth and enjoyable.
            </Typography>
            <Button
              sx={{
                backgroundColor: "#4D73FC",
                borderRadius: "8px",
                color: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                textTransform: "none",
                padding: "8px 20px",
                "&:hover": {
                  backgroundColor: "#3B5FC1",
                },
              }}
            >
              Read More
            </Button>
          </Box>
        </Box>

        <Box
          padding="20px"
          bgcolor="white"
          display="flex"
          justifyContent="space-between"
          gap="20px"
          borderRadius="20px"
        >
          <Box width="50%">
            <img
              src="https://s.marketwatch.com/public/resources/images/MW-HE536_airpla_ZH_20190225131547.jpg"
              style={{
                width: "100%",
                objectFit: "cover",
                height: "100%",
                borderRadius: "8px",
              }}
              alt="Blog"
            />
          </Box>
          <Box
            width="50%"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="start"
            gap="16px"
          >
            <Typography>
              <FontAwesomeIcon icon={faUser} /> Hung Vu <strong>| </strong>
              <FontAwesomeIcon icon={faCalendarDays} /> 06 Dec, 2024
            </Typography>
            <Typography fontWeight="500" fontSize="1.1rem">
              Discover Hidden Gems: Unexplored Destinations of 2024
            </Typography>
            <Typography fontSize="1rem" textAlign="start">
              A journey to discover the road less traveled.
            </Typography>
            <Button
              sx={{
                backgroundColor: "#4D73FC",
                borderRadius: "8px",
                color: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                textTransform: "none",
                padding: "8px 20px",
                "&:hover": {
                  backgroundColor: "#3B5FC1",
                },
              }}
            >
              Read More
            </Button>
          </Box>
        </Box>

        <Box
          padding="20px"
          bgcolor="white"
          display="flex"
          justifyContent="space-between"
          gap="20px"
          borderRadius="20px"
        >
          <Box width="50%">
            <img
              src="https://uiparadox.co.uk/public/templates/flynow/v2/assets/media/blog/blog-4.png"
              style={{
                width: "100%",
                objectFit: "cover",
                height: "100%",
                borderRadius: "8px",
              }}
              alt="Blog"
            />
          </Box>
          <Box
            width="50%"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="start"
            gap="16px"
          >
            <Typography>
              <FontAwesomeIcon icon={faUser} /> Iron Man <strong>| </strong>
              <FontAwesomeIcon icon={faCalendarDays} /> 01 Dec, 2024
            </Typography>
            <Typography fontWeight="500" fontSize="1.1rem">
              The Art of Packing Light: Essentials for Every Trip
            </Typography>
            <Typography fontSize="1rem" textAlign="start">
              Master the skill of packing for a stress-free adventure.
            </Typography>
            <Button
              sx={{
                backgroundColor: "#4D73FC",
                borderRadius: "8px",
                color: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                textTransform: "none",
                padding: "8px 20px",
                "&:hover": {
                  backgroundColor: "#3B5FC1",
                },
              }}
            >
              Read More
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default LatestNews;
