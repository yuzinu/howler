import React from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";
import Howl from "./components/Howl";
import ErrorPage from "./pages/ErrorPage";
import Home from "./pages/Home";

// layouts
import RootLayout from "./layouts/RootLayout";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Home />} />
      <Route path="howl/:howlId" element={<Howl />} />
    </Route>
  )
);

const root = createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Auth0Provider
      domain="https://dev-lxjzzdkv0pete2ea.us.auth0.com"
      clientId="j7uZ9FbsLsc5S16Fde6CKuw9yLFG9qpt"
      authorizationParams={{
        redirect_uri: window.location.origin
      }}
    >
      <RouterProvider
        router={router}
        fallbackElement={<ErrorPage />}
      />
    </Auth0Provider>
  </React.StrictMode>
);