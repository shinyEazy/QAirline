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
              <FontAwesomeIcon icon={faUser} /> Malisa John <strong>|</strong>{" "}
              <FontAwesomeIcon icon={faCalendarDays} /> 08 Aug, 2023
            </Typography>
            <Typography fontWeight="500" fontSize="1.1rem">
              Wings of Adventure: Exploring the World by Air
            </Typography>
            <Typography fontSize="1rem" textAlign="start">
              The customer is very happy to be followed.
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
              <FontAwesomeIcon icon={faUser} /> Malisa John <strong>|</strong>{" "}
              <FontAwesomeIcon icon={faCalendarDays} /> 08 Aug, 2023
            </Typography>
            <Typography fontWeight="500" fontSize="1.1rem">
              Wings of Adventure: Exploring the World by Air
            </Typography>
            <Typography fontSize="1rem" textAlign="start">
              The customer is very happy to be followed.
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
              <FontAwesomeIcon icon={faUser} /> Malisa John <strong>|</strong>{" "}
              <FontAwesomeIcon icon={faCalendarDays} /> 08 Aug, 2023
            </Typography>
            <Typography fontWeight="500" fontSize="1.1rem">
              Wings of Adventure: Exploring the World by Air
            </Typography>
            <Typography fontSize="1rem" textAlign="start">
              The customer is very happy to be followed.
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
              <FontAwesomeIcon icon={faUser} /> Malisa John <strong>|</strong>{" "}
              <FontAwesomeIcon icon={faCalendarDays} /> 08 Aug, 2023
            </Typography>
            <Typography fontWeight="500" fontSize="1.1rem">
              Wings of Adventure: Exploring the World by Air
            </Typography>
            <Typography fontSize="1rem" textAlign="start">
              The customer is very happy to be followed.
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
