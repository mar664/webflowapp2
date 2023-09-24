import React from "react";
import "./index.css";
import { createRoot } from "react-dom/client";
import {
  createHashRouter,
  RouterProvider,
  useRouteError,
} from "react-router-dom";
import App from "./App";
import NumberIncrementerForm, {
  loader as numberIncrementerLoader,
} from "./routes/NumberIncrementerForm";
import { AppContextProvider } from "./contexts/AppContext";
// 1. import `ChakraProvider` component
import { Box, ChakraProvider, extendTheme } from "@chakra-ui/react";
import ModalForm, { loader as modalLoader } from "./routes/ModalForm";
import NewModalForm, { loader as newModalLoader } from "./routes/NewModalForm";
import { Root } from "./routes/Root";
import NewCookieConsentForm, {
  loader as newCookieConsentLoader,
} from "./routes/NewCookieConsentForm";
import CookieConsentForm, {
  loader as cookieConsentLoader,
} from "./routes/CookieConsentForm";
import { Paths } from "./paths";
import NewNumberIncrementerForm, {
  loader as newNumberIncrementerLoader,
} from "./routes/NewNumberIncrementerForm";
import theme from "./theme";

const _theme = extendTheme(theme);

function ErrorBoundary() {
  const error = useRouteError();
  console.error(error);
  return <></>;
}

const router = createHashRouter([
  {
    path: Paths.root,
    element: <Root />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        path: Paths.app,
        element: <App />,
      },
      {
        path: Paths.newNumberIncrementerForm,
        element: <NewNumberIncrementerForm />,
        loader: newNumberIncrementerLoader,
      },
      {
        path: Paths.numberIncrementerForm,
        element: <NumberIncrementerForm />,
        loader: numberIncrementerLoader,
      },
      {
        path: Paths.newModalForm,
        element: <NewModalForm />,
        loader: newModalLoader,
      },
      {
        path: Paths.modalForm,
        element: <ModalForm />,
        loader: modalLoader,
      },
      {
        path: Paths.newCookieConsentForm,
        element: <NewCookieConsentForm />,
        loader: newCookieConsentLoader,
      },
      {
        path: Paths.cookieConsentForm,
        element: <CookieConsentForm />,
        loader: cookieConsentLoader,
      },
    ],
  },
]);
console.log(router);
createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider theme={_theme}>
      <Box>
        <AppContextProvider>
          <RouterProvider router={router} />
        </AppContextProvider>
      </Box>
    </ChakraProvider>
  </React.StrictMode>,
);
