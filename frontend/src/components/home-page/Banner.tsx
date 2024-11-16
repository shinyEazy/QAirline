import { Box } from "@mui/material";

const Banner = () => {
  return (
    <Box>
      <img
        src="/banner.png"
        width="100%"
        height="320px"
        alt="Banner"
        style={{ objectFit: "cover" }}
      />
      ;
    </Box>
  );
};

export default Banner;
