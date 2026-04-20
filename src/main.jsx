import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";
import Events from "./components/Events.jsx";
import EventsDetails from "./components/EventsDetails.jsx";

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/events", element: <Events /> },
  {
    path: "/events/:topicName",
    element: <EventsDetails />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
