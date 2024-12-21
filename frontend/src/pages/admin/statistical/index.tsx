import { Box, Tabs, Tab, Typography, Button } from "@mui/material";
import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart,
  Line,
} from "recharts";
import { useNavigate } from "react-router-dom";
import { fetchStats } from "hooks/stats-hook";

const AdminStatistical = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("month");
  const [stats, setStats] = useState(null);
  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setActiveTab(newValue);
  };

  useEffect(() => {
    const getStats = async () => {
      const stats = await fetchStats();

      setStats(stats);
    };

    getStats();
  }, []);

  if (!stats) {
    return <p>Loading...</p>;
  }
  // Data transformation logic for charts
  // Conditional check to ensure stats are loaded

  const dataForChartDay = Object.entries(stats.daily).map(([hours, value]) => ({
    name: hours.toUpperCase(),
    tickets_bought: value.tickets_bought,
    tickets_canceled: value.tickets_canceled,
    revenue: value.tickets_bought * 100, // Example revenue calculation
  }));

  const dataForChartWeek = Object.entries(stats.weekly).map(([day, value]) => ({
    name: day.replace("_", " ").toUpperCase(),
    tickets_bought: value.tickets_bought,
    tickets_canceled: value.tickets_canceled,
    revenue: value.tickets_bought * 100, // Example revenue calculation
  }));

  const dataForChartMonth = Object.entries(stats.monthly).map(
    ([week, value]) => ({
      name: week.replace("_", " ").toUpperCase(),
      tickets_bought: value.tickets_bought,
      tickets_canceled: value.tickets_canceled,
      revenue: value.tickets_bought * 100, // Example revenue calculation
    })
  );

  const dataForChartYear = Object.entries(stats.yearly).map(
    ([month, value]) => ({
      name: month.replace("_", " ").toUpperCase(),
      tickets_bought: value.tickets_bought,
      tickets_canceled: value.tickets_canceled,
      revenue: value.tickets_bought * 100,
    })
  );

  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <Box width="100%">
        <Button
          onClick={() => navigate("/admin")}
          sx={{
            backgroundColor: "#1e90ff",
            color: "white",
            textTransform: "none",
            fontSize: "1rem",
            fontWeight: "bold",
            borderRadius: "8px",
            padding: "4px 40px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            "&:hover": { backgroundColor: "#2177cb" },
            justifyContent: "center",
            display: "flex",
            alignItems: "center",
            margin: "20px auto",
          }}
        >
          Back
        </Button>
      </Box>
      <Tabs
        value={activeTab}
        onChange={handleTabChange}
        centered
        indicatorColor="primary"
        textColor="primary"
      >
        <Tab value="day" label="Day" />
        <Tab value="week" label="Week" />
        <Tab value="month" label="Month" />
        <Tab value="year" label="Year" />
      </Tabs>
      <Box mt={4}>
        {activeTab === "day" && (
          <Box>
            <Box
              margin="0 120px 40px"
              border="1px solid gray"
              borderRadius="20px"
              display="flex"
              justifyContent="center"
              alignItems="center"
              padding="20px"
              flexDirection="column"
            >
              <BarChart data={dataForChartDay} width={1200} height={300}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="tickets_bought" fill="green" barSize={20} />
                <Bar dataKey="tickets_canceled" fill="red" barSize={20} />
              </BarChart>
              <Typography
                variant="h6"
                align="center"
                sx={{
                  fontWeight: "bold",
                  color: "text.primary",
                }}
              >
                Tickets Sold and Canceled for the Day
              </Typography>
            </Box>
            <Box
              margin="0 120px 40px"
              border="1px solid gray"
              borderRadius="20px"
              display="flex"
              justifyContent="center"
              alignItems="center"
              padding="20px"
              flexDirection="column"
            >
              <LineChart data={dataForChartDay} width={1200} height={300}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="revenue" stroke="blue" />
              </LineChart>
              <Typography
                variant="h6"
                align="center"
                sx={{
                  fontWeight: "bold",
                  color: "text.primary",
                }}
              >
                Revenue for the Day
              </Typography>
            </Box>
          </Box>
        )}
        {activeTab === "week" && (
          <Box>
            {/* Bar Chart for Tickets Bought and Canceled */}
            <Box
              margin="0 120px 40px"
              border="1px solid gray"
              borderRadius="20px"
              display="flex"
              justifyContent="center"
              alignItems="center"
              padding="20px"
              flexDirection="column"
            >
              <BarChart data={dataForChartWeek} width={1200} height={300}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="tickets_bought" fill="green" barSize={20} />
                <Bar dataKey="tickets_canceled" fill="red" barSize={20} />
              </BarChart>
              <Typography
                variant="h6"
                align="center"
                sx={{
                  fontWeight: "bold",
                  color: "text.primary",
                }}
              >
                Tickets Sold and Canceled for the Week
              </Typography>
            </Box>
            {/* Line Chart for Revenue */}
            <Box
              margin="0 120px 40px"
              border="1px solid gray"
              borderRadius="20px"
              display="flex"
              justifyContent="center"
              alignItems="center"
              padding="20px"
              flexDirection="column"
            >
              <LineChart data={dataForChartWeek} width={1200} height={300}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="revenue" stroke="blue" />
              </LineChart>
              <Typography
                variant="h6"
                align="center"
                sx={{
                  fontWeight: "bold",
                  color: "text.primary",
                }}
              >
                Revenue for the Week
              </Typography>
            </Box>
          </Box>
        )}
        {activeTab === "month" && (
          <Box>
            {/* Bar Chart for Tickets Bought and Canceled */}
            <Box
              margin="0 120px 40px"
              border="1px solid gray"
              borderRadius="20px"
              display="flex"
              justifyContent="center"
              alignItems="center"
              padding="20px"
              flexDirection="column"
            >
              <BarChart data={dataForChartMonth} width={1200} height={300}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="tickets_bought" fill="green" barSize={20} />
                <Bar dataKey="tickets_canceled" fill="red" barSize={20} />
              </BarChart>
              <Typography
                variant="h6"
                align="center"
                sx={{
                  fontWeight: "bold",
                  color: "text.primary",
                }}
              >
                Tickets Sold and Canceled for the Month
              </Typography>
            </Box>

            {/* Line Chart for Revenue */}
            <Box
              margin="0 120px 40px"
              border="1px solid gray"
              borderRadius="20px"
              display="flex"
              justifyContent="center"
              alignItems="center"
              padding="20px"
              flexDirection="column"
            >
              <LineChart data={dataForChartMonth} width={1200} height={300}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="revenue" stroke="blue" />
              </LineChart>
              <Typography
                variant="h6"
                align="center"
                sx={{
                  fontWeight: "bold",
                  color: "text.primary",
                }}
              >
                Revenue for the Month
              </Typography>
            </Box>
          </Box>
        )}
        {activeTab === "year" && (
          <Box>
            <Box
              margin="0 120px 40px"
              border="1px solid gray"
              borderRadius="20px"
              display="flex"
              justifyContent="center"
              alignItems="center"
              padding="20px"
              flexDirection="column"
            >
              <BarChart data={dataForChartYear} width={1200} height={300}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="tickets_bought" fill="green" barSize={20} />
                <Bar dataKey="tickets_canceled" fill="red" barSize={20} />
              </BarChart>
              <Typography
                variant="h6"
                align="center"
                sx={{
                  fontWeight: "bold",
                  color: "text.primary",
                }}
              >
                Tickets Sold and Canceled for the Year
              </Typography>
            </Box>

            <Box
              margin="0 120px 40px"
              border="1px solid gray"
              borderRadius="20px"
              display="flex"
              justifyContent="center"
              alignItems="center"
              padding="20px"
              flexDirection="column"
            >
              <LineChart data={dataForChartYear} width={1200} height={300}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="revenue" stroke="blue" />
              </LineChart>
              <Typography
                variant="h6"
                align="center"
                sx={{
                  fontWeight: "bold",
                  color: "text.primary",
                }}
              >
                Revenue for the Year
              </Typography>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default AdminStatistical;
