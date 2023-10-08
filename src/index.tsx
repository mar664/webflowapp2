import React from "react";
import "./index.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import "@fontsource/inter/800.css";

import { createRoot } from "react-dom/client";
import {
  createHashRouter,
  RouterProvider,
  useRouteError,
  LoaderFunction,
} from "react-router-dom";
import App from "./routes/App";
import NumberIncrementerForm, {
  loader as numberIncrementerLoader,
} from "./routes/NumberIncrementerForm";
import { AppContextProvider } from "./contexts/AppContext";
// 1. import `ChakraProvider` component
import { Box, ChakraProvider, extendTheme } from "@chakra-ui/react";
import ModalForm, { loader as modalLoader } from "./routes/ModalForm";
import { Root } from "./routes/Root";
import NewCookieConsentForm from "./routes/NewCookieConsentForm";
import CookieConsentForm, {
  loader as cookieConsentLoader,
} from "./routes/CookieConsentForm";
import { Paths } from "./paths";
import NewNumberIncrementerForm from "./routes/NewNumberIncrementerForm";
import theme from "./theme";
import NewModalForm from "./routes/NewModalForm";
import HTMLToWebFlowForm from "./routes/HTMLToWebflowForm";

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
        path: Paths.appBackState,
        element: <App />,
      },
      {
        path: Paths.newNumberIncrementerForm,
        element: <NewNumberIncrementerForm />,
      },
      {
        path: Paths.numberIncrementerForm,
        element: <NumberIncrementerForm />,
        loader: numberIncrementerLoader as unknown as LoaderFunction,
      },
      {
        path: Paths.newModalForm,
        element: <NewModalForm />,
      },
      {
        path: Paths.modalForm,
        element: <ModalForm />,
        loader: modalLoader as unknown as LoaderFunction,
      },
      {
        path: Paths.newCookieConsentForm,
        element: <NewCookieConsentForm />,
      },
      {
        path: Paths.cookieConsentForm,
        element: <CookieConsentForm />,
        loader: cookieConsentLoader as unknown as LoaderFunction,
      },
      {
        path: Paths.htmlToWebflow,
        element: <HTMLToWebFlowForm />,
      },
    ],
  },
]);

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
