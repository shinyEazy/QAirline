// import React, { useState } from "react";
// import {
//   Box,
//   Select,
//   MenuItem,
//   InputLabel,
//   FormControl,
//   TextField,
//   TextFieldProps,
// } from "@mui/material";
// import { LocalizationProvider, DesktopDatePicker } from "@mui/x-date-pickers";
// import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

// function FlightSearch() {
//   const [from, setFrom] = useState("");
//   const [to, setTo] = useState("");
//   const [departing, setDeparting] = useState<Date | null>(null);
//   const [returning, setReturning] = useState<Date | null>(null);

//   return (
//     <LocalizationProvider dateAdapter={AdapterDateFns}>
//       <Box
//         display="flex"
//         gap="10px"
//         marginBottom="20px"
//         sx={{
//           backgroundColor: "rgb(231,235,255)",
//           padding: "32px 20px",
//           borderRadius: "8px",
//         }}
//       >
//         <FormControl fullWidth>
//           <InputLabel>From</InputLabel>
//           <Select value={from} onChange={(e) => setFrom(e.target.value)}>
//             <MenuItem value="New York">New York</MenuItem>
//             <MenuItem value="Los Angeles">Los Angeles</MenuItem>
//             <MenuItem value="Chicago">Chicago</MenuItem>
//           </Select>
//         </FormControl>

//         <FormControl fullWidth>
//           <InputLabel>To</InputLabel>
//           <Select value={to} onChange={(e) => setTo(e.target.value)}>
//             <MenuItem value="New York">New York</MenuItem>
//             <MenuItem value="Los Angeles">Los Angeles</MenuItem>
//             <MenuItem value="Chicago">Chicago</MenuItem>
//           </Select>
//         </FormControl>

//         <DesktopDatePicker
//           label="Departing"
//           value={departing}
//           onChange={(date) => setDeparting(date)}
//           renderInput={(params: TextFieldProps) => <TextField {...params} />}
//         />

//         <DesktopDatePicker
//           label="Returning"
//           value={returning}
//           onChange={(date) => setReturning(date)}
//           renderInput={(params: TextFieldProps) => <TextField {...params} />}
//         />

//         <TextField
//           label="Passengers and Class"
//           placeholder="2 Passengers / Economy"
//           fullWidth
//         />
//       </Box>
//     </LocalizationProvider>
//   );
// }

// export default FlightSearch;
