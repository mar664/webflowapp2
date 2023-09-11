import React from "react";
import "./index.css";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import NumberIncrementerForm, {
  loader as numberIncrementerLoader,
} from "./components/NumberIncrementerForm";
import { AppContextProvider } from "./contexts/AppContext";
// 1. import `ChakraProvider` component
import { Box, ChakraProvider, extendTheme } from "@chakra-ui/react";

const colors = {
  brand: {
    900: "#1a365d",
    800: "#153e75",
    700: "#2a69ac",
  },
};

const theme = extendTheme({ colors });

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "number_incrementer_form/:exists",
    element: <NumberIncrementerForm />,
    loader: numberIncrementerLoader,
  },
]);

createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <Box m={2}>
        <AppContextProvider>
          <RouterProvider router={router} />
        </AppContextProvider>
      </Box>
    </ChakraProvider>
  </React.StrictMode>,
);
