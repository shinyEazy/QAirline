import React, { useRef } from "react";
import { Box, Typography, Button } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const flightDeals = [
  {
    destination: "Hanoi to HoChiMinh",
    dateRange: "31 Oct, 2024 - 2 Nov, 2024",
    class: "Business Class",
    price: "$980",
    imageUrl:
      "https://www.trailsofindochina.com/wp-content/uploads/2017/05/hochiminhcity_header.jpg",
  },
  {
    destination: "Hanoi to HoChiMinh",
    dateRange: "31 Oct, 2024 - 2 Nov, 2024",
    class: "Business Class",
    price: "$980",
    imageUrl:
      "https://www.trailsofindochina.com/wp-content/uploads/2017/05/hochiminhcity_header.jpg",
  },
  {
    destination: "Hanoi to HoChiMinh",
    dateRange: "31 Oct, 2024 - 2 Nov, 2024",
    class: "Business Class",
    price: "$980",
    imageUrl:
      "https://www.trailsofindochina.com/wp-content/uploads/2017/05/hochiminhcity_header.jpg",
  },
];

const LatestFlight = () => {
  const sliderRef = useRef(null);

  const settings = {
    centerMode: false,
    arrows: false,
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <Box
      sx={{
        backgroundColor: "#EAEAEA",
        borderRadius: "20px",
        padding: "40px 80px",
        color: "black",
        "@media (max-width: 1000px)": {
          padding: "20px",
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
          Latest Flight Deals
        </Typography>

        <Box display="flex" gap="10px">
          <Button
            onClick={() => sliderRef.current.slickPrev()}
            sx={{
              backgroundColor: "#4D73FC",
              width: "32px",
              height: "32px",
              minWidth: "32px",
              borderRadius: "8px",
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              "&:hover": {
                backgroundColor: "#3B5FC1",
              },
            }}
          >
            <FontAwesomeIcon icon={faChevronLeft} fontSize="1.4rem" />
          </Button>
          <Button
            onClick={() => sliderRef.current.slickNext()}
            sx={{
              backgroundColor: "#4D73FC",
              width: "32px",
              height: "32px",
              minWidth: "32px",
              borderRadius: "8px",
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              "&:hover": {
                backgroundColor: "#3B5FC1",
              },
            }}
          >
            <FontAwesomeIcon icon={faChevronRight} fontSize="1.4rem" />
          </Button>
        </Box>
      </Box>

      <Box width="100%" display="absolute">
        <Slider ref={sliderRef} {...settings}>
          {flightDeals.map((deal, index) => (
            <Box
              key={index}
              sx={{
                maxWidth: "95%",
                backgroundColor: "white",
                borderRadius: "20px",
                textAlign: "start",
              }}
            >
              <Box padding="20px">
                <img
                  src={deal.imageUrl}
                  alt={deal.destination}
                  style={{
                    width: "100%",
                    height: "200px",
                    objectFit: "cover",
                    borderRadius: "12px",
                  }}
                />
              </Box>
              <Box marginLeft="20px">
                {" "}
                <Typography fontSize="1.2rem" fontWeight="500">
                  {deal.destination}
                </Typography>
                <Typography color="text.secondary" fontSize="0.9rem">
                  {deal.dateRange}
                </Typography>
              </Box>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Box margin="0 0 20px 20px">
                  <Typography fontSize="1.1rem" mt={2}>
                    {deal.class}
                  </Typography>
                  <Typography fontWeight="700" fontSize="1.3rem">
                    {deal.price}
                  </Typography>
                </Box>
                <Button
                  variant="contained"
                  sx={{
                    textTransform: "none",
                    marginRight: "20px",
                    backgroundColor: "#4D73FC",
                    color: "white",
                    borderRadius: "12px",
                    padding: "8px 16px",
                    fontSize: "0.9rem",
                    textWrap: "nowrap",
                    "&:hover": {
                      backgroundColor: "#3B5FC1",
                    },
                  }}
                >
                  Booking Now
                </Button>
              </Box>
            </Box>
          ))}
        </Slider>
      </Box>
    </Box>
  );
};

export default LatestFlight;
