import React from "react";
import "./index.css";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import NumberIncrementerForm, {
  loader as numberIncrementerLoader,
} from "./components/NumberIncrementerForm";
import { AppContextProvider } from "./contexts/AppContext";

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
    <AppContextProvider>
      <RouterProvider router={router} />
    </AppContextProvider>
    ,
  </React.StrictMode>,
);
