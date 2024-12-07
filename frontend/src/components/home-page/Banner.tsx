import React, { useState, useEffect } from "react";
import "./css/Carousel.css";
import { Box } from "@mui/material";

const images = [
  {
    id: 1,
    src: "https://plus.unsplash.com/premium_photo-1661914240950-b0124f20a5c1?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dG9reW98ZW58MHx8MHx8fDA%3D",
    title: "TOKYO",
    description:
      "The iconic skyline of Tokyo, where futuristic architecture blends seamlessly with traditional Japanese landmarks. From the towering Tokyo Tower to the serene Shinto shrines, this bustling metropolis offers a unique contrast of old and new.",
  },
  {
    id: 2,
    src: "https://cdn.britannica.com/55/190455-050-E617F64E/Night-view-Singapore.jpg",
    title: "SINGAPORE",
    description:
      "Singapore is a city of innovation and green spaces. Its skyline is defined by stunning skyscrapers and the futuristic Gardens by the Bay. From its diverse culinary scene to the vibrant culture, Singapore is a melting pot of modernity and heritage.",
  },
  {
    id: 3,
    src: "https://cosmopoliclan.com/wp-content/uploads/2021/10/CosmopoliClan-France-Paris-Things-to-do-at-night-in-Paris-14.jpg",
    title: "PARIS",
    description:
      "Paris, the City of Light, is renowned for its elegant streets, artistic heritage, and iconic landmarks like the Eiffel Tower. The city's romantic ambiance, cafes, and fashion make it a dream destination for travelers from around the world.",
  },
  {
    id: 4,
    src: "https://www.agoda.com/wp-content/uploads/2024/08/melbourne-australia-featured-1244x700.jpg",
    title: "MELBOURNE",
    description:
      "Melbourne, known for its vibrant arts scene, stunning laneways, and eclectic cafes, offers a mix of modern culture and natural beauty. From world-class sporting events to beautiful parks and gardens, Melbourne captures the essence of Australian life.",
  },
];

const Banner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animationClass, setAnimationClass] = useState("");

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    setAnimationClass("next");
    setTimeout(() => {
      setAnimationClass("");
    }, 500);
  };

  const prevSlide = () => {
    setAnimationClass("prev");
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
    setTimeout(() => {
      setAnimationClass("");
    }, 500);
  };

  useEffect(() => {
    const timer = setTimeout(nextSlide, 10000);
    return () => clearTimeout(timer);
  }, [currentIndex]);

  const reorderedImages = [
    ...images.slice(currentIndex),
    ...images.slice(0, currentIndex),
  ];

  return (
    <Box
      className="banner"
      sx={{
        display: "flex",
        borderRadius: "20px",
        margin: "60px 80px",
        color: "black",
        gap: "40px",

      }}
    >
      <div className={`carousel ${animationClass}`}>
        <div className="list">
          {reorderedImages.map((image, index) => (
            <CarouselItem key={image.id} image={image} isActive={index === 0} />
          ))}
        </div>
        <Thumbnail
          images={images}
          currentIndex={currentIndex}
          onClick={(index) => setCurrentIndex(index)}
        />
        <div className="arrows">
          <button onClick={prevSlide}>{"<"}</button>
          <button onClick={nextSlide}>{">"}</button>
        </div>
      </div>
    </Box>
  );
};

const CarouselItem = ({ image, isActive }) => {
  return (
    <div className={`item ${isActive ? "active" : ""}`}>
      <img src={image.src} alt={image.title} />
      <div className="content">
        <div className="title">{image.title}</div>
        <div className="des" style={{ fontFamily: "Roboto" }}>{image.description}</div>
        <div className="buttons">
          <button>SEE MORE</button>
          <button>SUBSCRIBE</button>
        </div>
      </div>
    </div>
  );
};

const Thumbnail = ({ images, currentIndex, onClick }) => {
  // Dynamically reorder thumbnails
  const reorderedThumbnails = [
    ...images.slice(currentIndex + 1),
    ...images.slice(0, currentIndex + 1),
  ];

  return (
    <div className="thumbnail">
      {reorderedThumbnails.map((image, index) => (
        <div className={`item ${index === 0 ? "active" : ""}`} key={image.id}>
          <img src={image.src} alt={image.title} />
          <div className="content">
            <div className="title">{image.title}</div>
            <div className="description">{image.topic}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Banner;
