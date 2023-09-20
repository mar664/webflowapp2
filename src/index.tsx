import React from "react";
import "./index.css";
import { createRoot } from "react-dom/client";
import { createHashRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import NumberIncrementerForm, {
  loader as numberIncrementerLoader,
} from "./components/NumberIncrementerForm";
import { AppContextProvider } from "./contexts/AppContext";
// 1. import `ChakraProvider` component
import { Box, ChakraProvider, extendTheme } from "@chakra-ui/react";
import ModalForm, { loader as modalLoader } from "./components/ModalForm";
import NewModalForm from "./components/NewModalForm";
import { Root } from "./routes/Root";

const colors = {
  brand: {
    900: "#1a365d",
    800: "#153e75",
    700: "#2a69ac",
  },
};

const theme = extendTheme({ colors });

const router = createHashRouter([
  {
    path: "/",
    element: <Root />,

    children: [
      {
        path: "app",
        element: <App />,
      },
      {
        path: "number_incrementer_form/:exists",
        element: <NumberIncrementerForm />,
        loader: numberIncrementerLoader,
      },
      {
        path: "new_modal_form",
        element: <NewModalForm />,
      },
      {
        path: "modal_form",
        element: <ModalForm />,
        loader: modalLoader,
      },
    ],
  },
]);

createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <Box>
        <AppContextProvider>
          <RouterProvider router={router} />
        </AppContextProvider>
      </Box>
    </ChakraProvider>
  </React.StrictMode>,
);
