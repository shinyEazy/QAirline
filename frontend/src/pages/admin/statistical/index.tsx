import { Box, Tabs, Tab, Typography } from "@mui/material";
import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";

const mockDay = [
  {
    date: "2024-12-16",
    statistics: {
      total_tickets_bought: 120,
      total_tickets_canceled: 15,
      total_revenue: 12000,
    },
    two_hour_breakdown: [
      {
        time_range: "00:00",
        tickets_bought: 10,
        tickets_canceled: 1,
        revenue: 1000,
      },
      {
        time_range: "02:00",
        tickets_bought: 8,
        tickets_canceled: 2,
        revenue: 800,
      },
      {
        time_range: "04:00",
        tickets_bought: 12,
        tickets_canceled: 1,
        revenue: 1200,
      },
      {
        time_range: "06:00",
        tickets_bought: 20,
        tickets_canceled: 3,
        revenue: 2000,
      },
      {
        time_range: "08:00",
        tickets_bought: 25,
        tickets_canceled: 4,
        revenue: 2500,
      },
      {
        time_range: "10:00",
        tickets_bought: 15,
        tickets_canceled: 1,
        revenue: 1500,
      },
      {
        time_range: "12:00",
        tickets_bought: 10,
        tickets_canceled: 2,
        revenue: 1000,
      },
      {
        time_range: "14:00",
        tickets_bought: 8,
        tickets_canceled: 0,
        revenue: 800,
      },
      {
        time_range: "16:00",
        tickets_bought: 5,
        tickets_canceled: 1,
        revenue: 500,
      },
      {
        time_range: "18:00",
        tickets_bought: 4,
        tickets_canceled: 0,
        revenue: 400,
      },
      {
        time_range: "20:00",
        tickets_bought: 2,
        tickets_canceled: 0,
        revenue: 200,
      },
      {
        time_range: "22:00",
        tickets_bought: 1,
        tickets_canceled: 0,
        revenue: 100,
      },
    ],
  },
];

const mockWeek = [
  {
    date: "2024-12-10",
    statistics: {
      total_tickets_bought: 800,
      total_tickets_canceled: 100,
      total_revenue: 80000,
    },
    daily_breakdown: [
      {
        date: "2024-12-10",
        tickets_bought: 120,
        tickets_canceled: 15,
        revenue: 12000,
      },
      {
        date: "2024-12-11",
        tickets_bought: 110,
        tickets_canceled: 10,
        revenue: 11000,
      },
      {
        date: "2024-12-12",
        tickets_bought: 130,
        tickets_canceled: 20,
        revenue: 13000,
      },
      {
        date: "2024-12-13",
        tickets_bought: 140,
        tickets_canceled: 30,
        revenue: 14000,
      },
      {
        date: "2024-12-14",
        tickets_bought: 130,
        tickets_canceled: 25,
        revenue: 13000,
      },
      {
        date: "2024-12-15",
        tickets_bought: 120,
        tickets_canceled: 15,
        revenue: 12000,
      },
      {
        date: "2024-12-16",
        tickets_bought: 120,
        tickets_canceled: 15,
        revenue: 12000,
      },
    ],
  },
];

const mockMonth = [
  {
    date: "2024-12-01",
    statistics: {
      total_tickets_bought: 1600,
      total_tickets_canceled: 200,
      total_revenue: 160000,
    },
    weekly_breakdown: [
      {
        week: "Week 1",
        tickets_bought: 400,
        tickets_canceled: 50,
        revenue: 40000,
      },
      {
        week: "Week 2",
        tickets_bought: 350,
        tickets_canceled: 45,
        revenue: 35000,
      },
      {
        week: "Week 3",
        tickets_bought: 450,
        tickets_canceled: 60,
        revenue: 45000,
      },
      {
        week: "Week 4",
        tickets_bought: 400,
        tickets_canceled: 45,
        revenue: 40000,
      },
    ],
  },
];

const mockYear = [
  {
    date: "2024",
    statistics: {
      total_tickets_bought: 19200,
      total_tickets_canceled: 2400,
      total_revenue: 1920000,
    },
    monthly_breakdown: [
      {
        month: "Jan",
        tickets_bought: 1600,
        tickets_canceled: 200,
        revenue: 160000,
      },
      {
        month: "Feb",
        tickets_bought: 1500,
        tickets_canceled: 180,
        revenue: 150000,
      },
      {
        month: "Mar",
        tickets_bought: 1700,
        tickets_canceled: 220,
        revenue: 170000,
      },
      {
        month: "Apr",
        tickets_bought: 1800,
        tickets_canceled: 240,
        revenue: 180000,
      },
      {
        month: "May",
        tickets_bought: 1600,
        tickets_canceled: 210,
        revenue: 160000,
      },
      {
        month: "Jun",
        tickets_bought: 1500,
        tickets_canceled: 190,
        revenue: 150000,
      },
      {
        month: "Jul",
        tickets_bought: 1900,
        tickets_canceled: 240,
        revenue: 190000,
      },
      {
        month: "Aug",
        tickets_bought: 2000,
        tickets_canceled: 250,
        revenue: 200000,
      },
      {
        month: "Sep",
        tickets_bought: 1700,
        tickets_canceled: 220,
        revenue: 170000,
      },
      {
        month: "Oct",
        tickets_bought: 1800,
        tickets_canceled: 230,
        revenue: 180000,
      },
      {
        month: "Nov",
        tickets_bought: 1600,
        tickets_canceled: 210,
        revenue: 160000,
      },
      {
        month: "Dec",
        tickets_bought: 1900,
        tickets_canceled: 240,
        revenue: 190000,
      },
    ],
  },
];

const AdminStatistical = () => {
  const [activeTab, setActiveTab] = useState("day");

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setActiveTab(newValue);
  };

  const dataForChart = mockDay[0].two_hour_breakdown.map((entry) => ({
    name: entry.time_range,
    tickets_bought: entry.tickets_bought,
    tickets_canceled: entry.tickets_canceled,
    revenue: entry.revenue,
  }));

  const dataForChartWeek = mockWeek[0].daily_breakdown.map((entry) => ({
    name: entry.date,
    tickets_bought: entry.tickets_bought,
    tickets_canceled: entry.tickets_canceled,
    revenue: entry.revenue,
  }));

  const dataForChartMonth = mockMonth[0].weekly_breakdown.map((entry) => ({
    name: entry.week,
    tickets_bought: entry.tickets_bought,
    tickets_canceled: entry.tickets_canceled,
    revenue: entry.revenue,
  }));

  const dataForChartYear = mockYear[0].monthly_breakdown.map((entry) => ({
    name: entry.month,
    tickets_bought: entry.tickets_bought,
    tickets_canceled: entry.tickets_canceled,
    revenue: entry.revenue,
  }));

  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      {/* Tabs */}
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

      {/* Content */}
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
              <BarChart data={dataForChart} width={1200} height={300}>
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
              <LineChart data={dataForChart} width={1200} height={300}>
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
