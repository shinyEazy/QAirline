import {
  Box,
  Typography,
  Divider,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import Header from "components/home-page/Header";
import { toast } from "react-toastify";
import { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ChevronRight from "@mui/icons-material/ChevronRight";
import ChevronLeft from "@mui/icons-material/ChevronLeft";
import { cancelBooking, fetchbookingInfo } from "hooks/booking-hook";

type Passenger = {
  booking_id: string;
  passenger_id: number;
  passport_number: string;
  gender: string;
  first_name: string;
  nationality: string;
  seat_row: number;
  citizen_id: string;
  phone_number: string;
  last_name: string;
  date_of_birth: string;
  seat_col: string;
};

type Flight = {
  id: number;
  class: string;
  cancelled: boolean;
  flightNumber: string;
  departureTime: string;
  arrivalTime: string;
  departure_city: string;
  departure_airport: string;
  arrival_city: string;
  arrival_airport: string;
  flightDate: string;
  duration: string;
  status: string;
  payment_status: string;
  passengers: Passenger[];
};

const mockFlightData = [
  {
    id: 1,
    class: "Economy",
    cancelled: false,
    flightNumber: "QA001",
    departureTime: "10:15",
    arrivalTime: "13:10",
    departure_city: "San Francisco",
    departure_airport: "San Francisco International Airport",
    arrival_city: "Miami",
    arrival_airport: "Miami International Airport",
    flightDate: "Sunday, 15 December",
    duration: "4 hours 55 minutes",
    status: "Landed",
    payment_status: "Pending",
    passengers: [
      {
        booking_id: "8F8407",
        passenger_id: 1,
        passport_number: "X12345678",
        gender: "Male",
        first_name: "John",
        nationality: "USA",
        seat_row: 12,
        citizen_id: "001204023599",
        phone_number: "+1 555 789 1234",
        last_name: "Doe",
        date_of_birth: "1990-05-10",
        seat_col: "A",
      },
      {
        booking_id: "8F8407",
        passenger_id: 2,
        passport_number: "X87654321",
        gender: "Female",
        first_name: "Jane",
        nationality: "USA",
        seat_row: 12,
        citizen_id: "001204023600",
        phone_number: "+1 555 123 4567",
        last_name: "Doe",
        date_of_birth: "1992-03-15",
        seat_col: "B",
      },
    ],
  },
  {
    id: 2,
    class: "Business",
    cancelled: false,
    flightNumber: "DL145",
    departureTime: "08:30",
    arrivalTime: "12:45",
    departure_city: "New York",
    departure_airport: "John F. Kennedy International Airport",
    arrival_city: "London",
    arrival_airport: "Heathrow Airport",
    flightDate: "Monday, 16 December",
    duration: "6 hours 15 minutes",
    status: "Scheduled",
    payment_status: "Paid",
    passengers: [
      {
        booking_id: "B145X1",
        passenger_id: 1,
        passport_number: "Y98765432",
        gender: "Male",
        first_name: "James",
        nationality: "UK",
        seat_row: 5,
        citizen_id: "002589743210",
        phone_number: "+44 20 7946 0958",
        last_name: "Smith",
        date_of_birth: "1985-11-21",
        seat_col: "A",
      },
    ],
  },
];

const FlightBooking = () => {
  const [openDialog, setOpenDialog] = useState(false);

  const handleCancelClick = async () => {
    setOpenDialog(true);
  };

  const handleDialogClose = async (confirm: boolean) => {
    let err = ""
    try {
      await cancelBooking(bookingID);
    } catch (error) {
      err = error.response.data.detail;
    } finally {
      setOpenDialog(false);
    }
    if (err) {
      console.log(err);
      toast.error(err);
    } else {
      toast.success("Ticket has been canceled.");
    }

  };

  const [bookingID, setBookingID] = useState("");
  const [selectedBooking, setSelectedBooking] = useState<Flight | null>(null);
  const [passengers, setPassengers] = useState<Passenger[]>([]);

  const handleSearch = async () => {
    const booking = await fetchbookingInfo(bookingID)

    if (booking) {
      toast.success("Booking found.");
      setSelectedBooking(booking);
      setPassengers(booking.passengers);
    } else {
      toast.error("Booking not found.");
      setSelectedBooking(null);
      setPassengers([]);
    }

    console.log("Matched booking:", booking);
    console.log("Matched passengers:", booking ? booking.passengers : []);
  };

  const [isHoveredLeft, setIsHoveredLeft] = useState(false);

  const CustomPrevArrow = (props: any) => {
    const { className, style, onClick } = props;
    return selectedBooking ? (
      <>
        <style>{`.slick-arrow.slick-prev::before { display: none !important; }`}</style>
        <div
          className={className}
          style={{
            ...style,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            left: "calc((100% - 90%) / 6)",
            zIndex: 1,
            width: "40px",
            height: "40px",
            backgroundColor: isHoveredLeft ? "#2177cb" : "#1e90ff",
            borderRadius: "50%",
            color: "white",
            fontSize: "1.5rem",
            cursor: "pointer",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)",
          }}
          onMouseEnter={() => setIsHoveredLeft(true)}
          onMouseLeave={() => setIsHoveredLeft(false)}
          onClick={onClick}
        >
          <ChevronLeft style={{ fontSize: "2.5rem" }} />
        </div>
      </>
    ) : null;
  };

  const [isHoveredRight, setIsHoveredRight] = useState(false);

  const CustomNextArrow = (props: any) => {
    const { className, style, onClick } = props;

    return selectedBooking ? (
      <>
        <style>
          {`
            .slick-arrow.slick-next::before {
              display: none !important;
            }
          `}
        </style>
        <div
          className={className}
          style={{
            ...style,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            right: "calc((100% - 90%) / 6)",
            zIndex: 1,
            width: "40px",
            height: "40px",
            backgroundColor: isHoveredRight ? "#2177cb" : "#1e90ff",
            borderRadius: "50%",
            color: "white",
            fontSize: "1.5rem",
            cursor: "pointer",
            transition: "all 0.3s ease-in-out",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)",
          }}
          onMouseEnter={() => setIsHoveredRight(true)}
          onMouseLeave={() => setIsHoveredRight(false)}
          onClick={onClick}
        >
          <ChevronRight style={{ fontSize: "2.5rem" }} />
        </div>
      </>
    ) : null;
  };

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    appendDots: (dots: any) =>
      selectedBooking ? (
        <div
          style={{
            position: "absolute",
            bottom: "-20px",
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <ul style={{ margin: 0, padding: 0 }}>{dots}</ul>
        </div>
      ) : (
        <div />
      ),
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      minHeight="100vh"
      bgcolor="rgb(245,245,245)"
    >
      <Header />
      <Box
        bgcolor="white"
        width="600px"
        margin="20px auto "
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        gap="16px"
        padding="16px"
        border="1px solid #ddd"
        borderRadius="8px"
        marginTop="20px"
        boxShadow="rgba(0, 0, 0, 0.1) 0px 4px 12px"
      >
        <Box flexGrow={1} display="flex">
          <Typography sx={{ fontSize: "1rem", fontWeight: 500, color: "#333" }}>
            BOOKING ID
          </Typography>
        </Box>
        <Box display="flex" gap="20px">
          <TextField
            value={bookingID}
            onChange={(e) => setBookingID(e.target.value)}
            placeholder="A1B2C3"
            sx={{
              width: "100%",
              "& .MuiInputBase-root": {
                borderColor: "#ddd",
              },
              "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
              {
                borderColor: "#1e90ff",
                boxShadow: "0 0 8px rgba(30, 144, 255, 0.6)",
              },
            }}
          />
          <Button
            onClick={handleSearch}
            disableRipple
            sx={{
              backgroundColor: "#1e90ff",
              color: "white",
              textTransform: "none",
              fontSize: "1rem",
              borderRadius: "12px",
              padding: "8px 60px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              "&:hover": {
                backgroundColor: "#2177cb",
              },
            }}
          >
            Search
          </Button>
        </Box>
      </Box>
      <Box sx={{ overflow: "hidden", paddingBottom: "20px" }}>
        <Slider {...settings}>
          {passengers.length > 0 ? (
            passengers.map((passenger, index) => (
              <Box
                sx={{
                  margin: "0 calc((100% - 90%) / 2) 20px",
                  maxWidth: "90%",
                  width: "90%",
                  backgroundImage:
                    "url('https://freesvg.org/img/shokunin_World_Map.png')",
                  backgroundPosition: "center",
                  opacity: 0.8,
                  borderRadius: "20px",
                  boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.6)",
                }}
              >
                <Box
                  bgcolor="rgb(19,118,177)"
                  borderRadius="20px 20px 0 0 "
                  color="white"
                  padding="10px 0 10px 100px"
                >
                  <Typography
                    fontSize="1.8rem"
                    display="flex"
                    alignItems="center"
                  >
                    <Box display="flex" alignItems="center">
                      <i
                        className="fa-thin fa-ticket-airline"
                        style={{
                          height: "100%",
                          marginRight: "8px",
                          color: "white",
                          fontSize: "2.4rem",
                          alignItems: "center",
                          textAlign: "center",
                          justifyContent: "center",
                        }}
                      ></i>
                    </Box>
                    BOARDING PASS
                  </Typography>
                </Box>
                <Divider />
                <Box display="flex">
                  <Box
                    flex="1"
                    sx={{
                      padding: " 0",
                      alignItems: "center",
                      justifyContent: "center",
                      textAlign: "center",
                      display: "flex",
                      transform: "rotate(180deg)",
                      writingMode: "vertical-lr",
                    }}
                  >
                    <Typography
                      fontSize="2rem"
                      sx={{ letterSpacing: "0.5rem" }}
                    >
                      FLIGHT TICKET
                    </Typography>
                  </Box>
                  <Box flex="6" padding="20px">
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      height="100%"
                    >
                      <Box
                        minWidth="250px"
                        display="flex"
                        flexDirection="column"
                        justifyContent="space-between"
                      >
                        <Box display="flex" flexDirection="column">
                          <Typography
                            fontSize="1.2rem"
                            fontWeight="bold"
                            textAlign="center"
                          >
                            FLIGHT
                          </Typography>
                          <Typography
                            fontSize="1.8rem"
                            fontWeight="bold"
                            textAlign="center"
                          >
                            {selectedBooking?.flightNumber}
                          </Typography>
                        </Box>
                        <Box display="flex" flexDirection="column">
                          <Typography fontSize="1.2rem" fontWeight="bold">
                            FROM: {selectedBooking?.departure_city}
                          </Typography>
                          <Typography
                            fontSize="1.2rem"
                            fontWeight="bold"
                            marginTop="10px"
                          >
                            DATE: {selectedBooking?.flightDate}
                          </Typography>
                        </Box>
                        <Box display="flex">
                          <Typography
                            fontSize="1.2rem"
                            fontWeight="bold"
                            display="flex"
                            alignItems="center"
                            gap="10px"
                          >
                            PAYMENT STATUS:{" "}
                            <span
                              style={{
                                color:
                                  selectedBooking?.payment_status === "Paid"
                                    ? "green"
                                    : "red",
                              }}
                            >
                              {selectedBooking
                                ? selectedBooking.payment_status
                                : ""}
                            </span>
                          </Typography>
                        </Box>
                      </Box>
                      <Box
                        display="flex"
                        flexDirection="column"
                        justifyContent="space-between"
                      >
                        <Box display="flex" gap="80px">
                          <Box>
                            <Typography fontSize="1.2rem" fontWeight="bold">
                              BOARDING TIME
                            </Typography>
                            <Typography
                              fontSize="1.8rem"
                              fontWeight="bold"
                              textAlign="center"
                            >
                              {selectedBooking?.departureTime}
                            </Typography>
                          </Box>
                          <Box>
                            <Typography fontSize="1.2rem" fontWeight="bold">
                              ARRIVAL CITY
                            </Typography>
                            <Typography
                              fontSize="1.8rem"
                              fontWeight="bold"
                              textAlign="center"
                            >
                              {selectedBooking?.arrival_city}
                            </Typography>
                          </Box>
                          <Box>
                            <Typography fontSize="1.2rem" fontWeight="bold">
                              SEAT
                            </Typography>
                            <Typography fontSize="1.8rem" fontWeight="bold">
                              {passenger.seat_col}
                              {passenger.seat_row}
                            </Typography>
                          </Box>
                        </Box>
                        <Box
                          alignItems="center"
                          justifyContent="center"
                          textAlign="center"
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          {/* <i
                          className="fa-thin fa-plane-departure"
                          style={{ fontSize: "10rem" }}
                        ></i> */}
                          <img
                            src="/logo3.png"
                            height="196px"
                            width="auto"
                          ></img>
                        </Box>
                      </Box>
                    </Box>
                    <Box marginTop="80px"></Box>
                  </Box>
                  <Box
                    sx={{
                      width: "3px",
                      backgroundImage:
                        "linear-gradient(to bottom, black 50%, transparent 50%)",
                      backgroundSize: "2px 10px",
                      backgroundRepeat: "repeat-y",
                      margin: "0 16px",
                    }}
                  />
                  <Box
                    flex="3"
                    padding="20px"
                    display="flex"
                    flexDirection="column"
                    justifyContent="space-between"
                    gap="40px"
                  >
                    <Box
                      display="flex"
                      gap="10px"
                      alignItems="center"
                      justifyContent="space-between"
                    >
                      <Box>
                        <Typography fontSize="1.2rem" fontWeight="bold">
                          SEAT
                        </Typography>
                        <Typography fontSize="1.8rem" fontWeight="bold">
                          {passenger.seat_col}
                          {passenger.seat_row}
                        </Typography>
                      </Box>
                      <Typography fontSize="1.8rem" sx={{ opacity: "0.6" }}>
                        {selectedBooking?.class}
                      </Typography>
                    </Box>
                    <Box display="flex" flexDirection="column" gap="10px">
                      <Typography fontSize="1.2rem" fontWeight="bold">
                        FROM: {selectedBooking?.departure_city}
                      </Typography>
                      <Typography fontSize="1.2rem" fontWeight="bold">
                        PASSENGER NAME: {passenger.first_name}{" "}
                        {passenger.last_name}
                      </Typography>
                      <Typography fontSize="1.2rem" fontWeight="bold">
                        TO: {selectedBooking?.arrival_city}
                      </Typography>
                      <Typography fontSize="1.2rem" fontWeight="bold">
                        DATE: {selectedBooking?.flightDate}
                      </Typography>
                    </Box>
                    <Typography
                      fontSize="1.5rem"
                      textAlign="center"
                      sx={{ opacity: "0.6", letterSpacing: "0.5rem" }}
                    >
                      FLIGHT TICKET
                    </Typography>
                  </Box>
                </Box>
              </Box>
            ))
          ) : (
            <Box></Box>
          )}
        </Slider>
      </Box>

      {selectedBooking && (
        <Box
          justifyContent="center"
          alignItems="center"
          display="flex"
          marginTop="8px"
        >
          <Button
            variant="contained"
            color="error"
            onClick={handleCancelClick}
            sx={{
              padding: "4px 10px",
            }}
          >
            Cancel Booking
          </Button>
        </Box>
      )}

      <Dialog
        open={openDialog}
        onClose={() => handleDialogClose(false)}
        aria-labelledby="confirm-dialog-title"
        aria-describedby="confirm-dialog-description"
      >
        <DialogTitle id="confirm-dialog-title">Cancel Ticket</DialogTitle>
        <DialogContent>
          <DialogContentText id="confirm-dialog-description">
            Are you sure you want to cancel this ticket? This action cannot be
            undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleDialogClose(false)} color="primary">
            No
          </Button>
          <Button onClick={() => handleDialogClose(true)} color="error">
            Yes, Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default FlightBooking;
