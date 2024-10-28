import { Button, Typography, Box, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";

const NoFoundPage = () => {
  const navigate = useNavigate();

  return (
    <Container
      component="main"
      maxWidth="xs"
      style={{ textAlign: "center", marginTop: "20vh" }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h1" component="h1">
          404
        </Typography>
        <Typography
          variant="h6"
          component="p"
          color="textSecondary"
          gutterBottom
        >
          Không tìm thấy trang, vui lòng nhập địa chỉ chính xác
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/")}
        >
          Trở về trang chủ
        </Button>
      </Box>
    </Container>
  );
};

export default NoFoundPage;
