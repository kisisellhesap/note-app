import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { persistor, store } from "./redux/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import "./index.css";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const darkTheme = createTheme({
  palette: {
    mode: "dark",

    primary: {
      main: "#fff",
    },
    secondary: {
      main: "rgb(105,105,105)",
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <PersistGate loading={"yükleniyor"} persistor={persistor}>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />

        <App />
      </ThemeProvider>
    </PersistGate>
  </Provider>
);
