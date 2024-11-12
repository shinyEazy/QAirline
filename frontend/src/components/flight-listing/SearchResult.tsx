import { Box, Typography, Button, Divider, Collapse } from "@mui/material";
import { useState } from "react";

const SearchResult = () => {
  const [showDetails, setShowDetails] = useState(false);

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  return (
    <Box>
      <Box
        sx={{
          backgroundColor: "#f5f7fa",
          borderRadius: "16px",
          padding: "20px",
          margin: "40px auto",
          display: "flex",
          flexDirection: "column",
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Box display="flex" justifyContent="space-between" width="100%">
          <Box display="flex" alignItems="center">
            <Box textAlign="center" sx={{ minWidth: "80px" }}>
              <Typography fontSize="1.2rem">
                <strong>07:00</strong>
              </Typography>
              <Typography fontSize="1rem" color="text.secondary">
                HAN
              </Typography>
            </Box>

            <Box
              sx={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                mx: 2,
              }}
            >
              <Box display="flex" flexDirection="column" alignItems="center">
                <img
                  src="/route-plan.png"
                  alt="Route Plan"
                  style={{
                    width: "100%",
                    maxWidth: "150px",
                    height: "auto",
                  }}
                />
                <Typography fontSize="1rem" color="text.secondary">
                  Bay thẳng
                </Typography>
              </Box>
            </Box>

            <Box textAlign="center" sx={{ minWidth: "80px" }}>
              <Typography fontSize="1.2rem">
                <strong>09:10</strong>
              </Typography>
              <Typography fontSize="1rem" color="text.secondary">
                PQC
              </Typography>
            </Box>
          </Box>

          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            sx={{ textAlign: "left", minWidth: "100px" }}
          >
            <Typography>Số lượng vé còn lại: 666</Typography>
            <Typography>Số hiệu: VN 7239</Typography>
          </Box>

          <Box sx={{ textAlign: "center" }}>
            <Typography fontSize="1rem" sx={{ fontWeight: 500 }}>
              Price: $240
            </Typography>
            <Button
              variant="contained"
              color="primary"
              sx={{
                borderRadi: "8px",
                textTransform: "none",
                padding: "6px 16px",
              }}
            >
              Book Now
            </Button>
          </Box>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Box display="flex" justifyContent="space-between" width="100%">
          <Typography variant="h6">Monday, 14 August</Typography>
          <Typography
            fontSize="1.2rem"
            fontWeight="500"
            onClick={toggleDetails}
            sx={{ cursor: "pointer", color: "primary.main" }}
          >
            {showDetails ? "Hide Detail" : "Flight Detail"}
          </Typography>
        </Box>

        <Collapse in={showDetails} timeout="auto" unmountOnExit>
          <Box
            display="flex"
            justifyContent="space-evenly"
            sx={{
              backgroundColor: "#e7f0fc",
              borderRadius: "12px",
              padding: "20px",
              marginTop: "16px",
            }}
          >
            <Box display="flex" flexDirection="column" justifyContent="center">
              <Typography variant="h6" color="primary">
                Hà Nội - Đà Nẵng
              </Typography>
              <Typography>Khởi hành vào: Thứ Hai, 11 tháng 11, 2024</Typography>
              <Typography>Thời gian bay: 2 giờ 10 phút</Typography>
            </Box>
            <Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  borderRadius: "8px",
                  margin: "auto",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    marginRight: "16px",
                  }}
                >
                  <Typography>1 giờ 25 phút</Typography>
                  <Box
                    sx={{
                      width: "2px",
                      backgroundColor: "teal",
                      height: "150px",
                      marginTop: "8px",
                      marginBottom: "8px",
                      marginLeft: "16px",
                    }}
                  />
                </Box>
                <Box>
                  <Typography variant="h6" color="primary">
                    06:00 Hà Nội
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Sân bay Nội Bài, Việt Nam
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Nhà ga 1
                  </Typography>
                  <Box sx={{ my: 2 }} />
                  <Typography variant="h6" color="primary">
                    07:25 Đà Nẵng
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Sân bay Đà Nẵng, Việt Nam
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Nhà ga 1
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Collapse>
      </Box>
      <Box
        sx={{
          backgroundColor: "#f5f7fa",
          borderRadius: "16px",
          padding: "20px",
          margin: "40px auto",
          display: "flex",
          flexDirection: "column",
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Box display="flex" justifyContent="space-between" width="100%">
          <Box display="flex" alignItems="center">
            <Box textAlign="center" sx={{ minWidth: "80px" }}>
              <Typography fontSize="1.2rem">
                <strong>07:00</strong>
              </Typography>
              <Typography fontSize="1rem" color="text.secondary">
                HAN
              </Typography>
            </Box>

            <Box
              sx={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                mx: 2,
              }}
            >
              <Box display="flex" flexDirection="column" alignItems="center">
                <img
                  src="/route-plan.png"
                  alt="Route Plan"
                  style={{
                    width: "100%",
                    maxWidth: "150px",
                    height: "auto",
                  }}
                />
                <Typography fontSize="1rem" color="text.secondary">
                  Bay thẳng
                </Typography>
              </Box>
            </Box>

            <Box textAlign="center" sx={{ minWidth: "80px" }}>
              <Typography fontSize="1.2rem">
                <strong>09:10</strong>
              </Typography>
              <Typography fontSize="1rem" color="text.secondary">
                PQC
              </Typography>
            </Box>
          </Box>

          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            sx={{ textAlign: "left", minWidth: "100px" }}
          >
            <Typography>Số lượng vé còn lại: 666</Typography>
            <Typography>Số hiệu: VN 7239</Typography>
          </Box>

          <Box sx={{ textAlign: "center" }}>
            <Typography fontSize="1rem" sx={{ fontWeight: 500 }}>
              Price: $240
            </Typography>
            <Button
              variant="contained"
              color="primary"
              sx={{
                borderRadi: "8px",
                textTransform: "none",
                padding: "6px 16px",
              }}
            >
              Book Now
            </Button>
          </Box>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Box display="flex" justifyContent="space-between" width="100%">
          <Typography variant="h6">Monday, 14 August</Typography>
          <Typography
            fontSize="1.2rem"
            fontWeight="500"
            onClick={toggleDetails}
            sx={{ cursor: "pointer", color: "primary.main" }}
          >
            {showDetails ? "Hide Detail" : "Flight Detail"}
          </Typography>
        </Box>

        <Collapse in={showDetails} timeout="auto" unmountOnExit>
          <Box
            display="flex"
            justifyContent="space-evenly"
            sx={{
              backgroundColor: "#e7f0fc",
              borderRadius: "12px",
              padding: "20px",
              marginTop: "16px",
            }}
          >
            <Box display="flex" flexDirection="column" justifyContent="center">
              <Typography variant="h6" color="primary">
                Hà Nội - Đà Nẵng
              </Typography>
              <Typography>Khởi hành vào: Thứ Hai, 11 tháng 11, 2024</Typography>
              <Typography>Thời gian bay: 2 giờ 10 phút</Typography>
            </Box>
            <Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  borderRadius: "8px",
                  margin: "auto",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    marginRight: "16px",
                  }}
                >
                  <Typography>1 giờ 25 phút</Typography>
                  <Box
                    sx={{
                      width: "2px",
                      backgroundColor: "teal",
                      height: "150px",
                      marginTop: "8px",
                      marginBottom: "8px",
                      marginLeft: "16px",
                    }}
                  />
                </Box>
                <Box>
                  <Typography variant="h6" color="primary">
                    06:00 Hà Nội
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Sân bay Nội Bài, Việt Nam
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Nhà ga 1
                  </Typography>
                  <Box sx={{ my: 2 }} />
                  <Typography variant="h6" color="primary">
                    07:25 Đà Nẵng
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Sân bay Đà Nẵng, Việt Nam
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Nhà ga 1
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Collapse>
      </Box>
      <Box
        sx={{
          backgroundColor: "#f5f7fa",
          borderRadius: "16px",
          padding: "20px",
          margin: "40px auto",
          display: "flex",
          flexDirection: "column",
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Box display="flex" justifyContent="space-between" width="100%">
          <Box display="flex" alignItems="center">
            <Box textAlign="center" sx={{ minWidth: "80px" }}>
              <Typography fontSize="1.2rem">
                <strong>07:00</strong>
              </Typography>
              <Typography fontSize="1rem" color="text.secondary">
                HAN
              </Typography>
            </Box>

            <Box
              sx={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                mx: 2,
              }}
            >
              <Box display="flex" flexDirection="column" alignItems="center">
                <img
                  src="/route-plan.png"
                  alt="Route Plan"
                  style={{
                    width: "100%",
                    maxWidth: "150px",
                    height: "auto",
                  }}
                />
                <Typography fontSize="1rem" color="text.secondary">
                  Bay thẳng
                </Typography>
              </Box>
            </Box>

            <Box textAlign="center" sx={{ minWidth: "80px" }}>
              <Typography fontSize="1.2rem">
                <strong>09:10</strong>
              </Typography>
              <Typography fontSize="1rem" color="text.secondary">
                PQC
              </Typography>
            </Box>
          </Box>

          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            sx={{ textAlign: "left", minWidth: "100px" }}
          >
            <Typography>Số lượng vé còn lại: 666</Typography>
            <Typography>Số hiệu: VN 7239</Typography>
          </Box>

          <Box sx={{ textAlign: "center" }}>
            <Typography fontSize="1rem" sx={{ fontWeight: 500 }}>
              Price: $240
            </Typography>
            <Button
              variant="contained"
              color="primary"
              sx={{
                borderRadi: "8px",
                textTransform: "none",
                padding: "6px 16px",
              }}
            >
              Book Now
            </Button>
          </Box>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Box display="flex" justifyContent="space-between" width="100%">
          <Typography variant="h6">Monday, 14 August</Typography>
          <Typography
            fontSize="1.2rem"
            fontWeight="500"
            onClick={toggleDetails}
            sx={{ cursor: "pointer", color: "primary.main" }}
          >
            {showDetails ? "Hide Detail" : "Flight Detail"}
          </Typography>
        </Box>

        <Collapse in={showDetails} timeout="auto" unmountOnExit>
          <Box
            display="flex"
            justifyContent="space-evenly"
            sx={{
              backgroundColor: "#e7f0fc",
              borderRadius: "12px",
              padding: "20px",
              marginTop: "16px",
            }}
          >
            <Box display="flex" flexDirection="column" justifyContent="center">
              <Typography variant="h6" color="primary">
                Hà Nội - Đà Nẵng
              </Typography>
              <Typography>Khởi hành vào: Thứ Hai, 11 tháng 11, 2024</Typography>
              <Typography>Thời gian bay: 2 giờ 10 phút</Typography>
            </Box>
            <Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  borderRadius: "8px",
                  margin: "auto",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    marginRight: "16px",
                  }}
                >
                  <Typography>1 giờ 25 phút</Typography>
                  <Box
                    sx={{
                      width: "2px",
                      backgroundColor: "teal",
                      height: "150px",
                      marginTop: "8px",
                      marginBottom: "8px",
                      marginLeft: "16px",
                    }}
                  />
                </Box>
                <Box>
                  <Typography variant="h6" color="primary">
                    06:00 Hà Nội
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Sân bay Nội Bài, Việt Nam
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Nhà ga 1
                  </Typography>
                  <Box sx={{ my: 2 }} />
                  <Typography variant="h6" color="primary">
                    07:25 Đà Nẵng
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Sân bay Đà Nẵng, Việt Nam
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Nhà ga 1
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Collapse>
      </Box>
    </Box>
  );
};

export default SearchResult;
