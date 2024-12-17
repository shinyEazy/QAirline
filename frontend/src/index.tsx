import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import "./styles.css";
import { ToastContainer } from "react-toastify";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

// const theme = createTheme({
//   typography: {
//     fontFamily: "JetBrains Mono, monospace",
//   },
// });

root.render(
  // <ThemeProvider theme={theme}>
  //   <CssBaseline />
  <Provider store={store}>
    <App />
    <ToastContainer
      position="top-right"
      autoClose={8000}
      hideProgressBar={false}
      newestOnTop={true}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss={false}
      pauseOnHover={false}
    />
  </Provider>
  // </ThemeProvider>
);
