import {
  Box,
  Button,
  TextField,
  Typography,
  Grid,
  Paper,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Tab,
  Tabs,
} from "@mui/material";
import { useState } from "react";

function AdminPage() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(0);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Chức năng cho quản trị
      </Typography>

      {/* Open Modal Button */}
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Mở chức năng quản trị
      </Button>

      {/* Modal with Tabs */}
      <Dialog open={open} onClose={handleClose} maxWidth="xl" fullWidth>
        <DialogTitle>Chức năng cho quản trị</DialogTitle>
        <DialogContent>
          <Tabs value={value} onChange={handleTabChange} centered>
            <Tab label="Đăng thông tin" />
            <Tab label="Nhập dữ liệu về tàu bay" />
            <Tab label="Nhập dữ liệu về chuyến bay" />
            <Tab label="Thống kê đặt vé" />
            <Tab label="Cập nhật giờ khởi hành" />
          </Tabs>

          <Box sx={{ paddingTop: 2 }}>
            {value === 0 && (
              <Box>
                <Typography variant="h6">
                  Đăng thông tin (giới thiệu, khuyến mãi, thông báo, tin tức,
                  ...)
                </Typography>
                <TextField
                  label="Thông tin"
                  fullWidth
                  multiline
                  rows={4}
                  sx={{ marginTop: 2 }}
                />
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ marginTop: 2 }}
                >
                  Lưu thông tin
                </Button>
              </Box>
            )}

            {value === 1 && (
              <Box>
                <Typography variant="h6">
                  Nhập dữ liệu về các tàu bay
                </Typography>
                <TextField label="Mã tàu bay" fullWidth sx={{ marginTop: 2 }} />
                <TextField
                  label="Hãng sản xuất"
                  fullWidth
                  sx={{ marginTop: 2 }}
                />
                <TextField
                  label="Thông tin về các ghế"
                  fullWidth
                  sx={{ marginTop: 2 }}
                />
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ marginTop: 2 }}
                >
                  Lưu tàu bay
                </Button>
              </Box>
            )}

            {value === 2 && (
              <Box>
                <Typography variant="h6">
                  Nhập dữ liệu về các chuyến bay
                </Typography>
                <TextField
                  label="Số hiệu chuyến bay"
                  fullWidth
                  sx={{ marginTop: 2 }}
                />
                <TextField label="Tàu bay" fullWidth sx={{ marginTop: 2 }} />
                <TextField label="Điểm đi" fullWidth sx={{ marginTop: 2 }} />
                <TextField label="Điểm đến" fullWidth sx={{ marginTop: 2 }} />
                <TextField
                  label="Giờ khởi hành"
                  fullWidth
                  type="datetime-local"
                  sx={{ marginTop: 2 }}
                />
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ marginTop: 2 }}
                >
                  Lưu chuyến bay
                </Button>
              </Box>
            )}

            {value === 3 && (
              <Box>
                <Typography variant="h6">
                  Xem và thống kê đặt vé của khách hàng
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ marginTop: 2 }}
                >
                  Xem thống kê
                </Button>
              </Box>
            )}

            {value === 4 && (
              <Box>
                <Typography variant="h6">
                  Thay đổi giờ khởi hành cho chuyến bay
                </Typography>
                <TextField
                  label="Số hiệu chuyến bay"
                  fullWidth
                  sx={{ marginTop: 2 }}
                />
                <TextField
                  label="Giờ khởi hành mới"
                  fullWidth
                  type="datetime-local"
                  sx={{ marginTop: 2 }}
                />
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ marginTop: 2 }}
                >
                  Cập nhật giờ khởi hành
                </Button>
              </Box>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Đóng
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default AdminPage;
