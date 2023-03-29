import React from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from "react-router-dom";

import Howl from './components/Howl';
import ErrorPage from './pages/ErrorPage';
import Home from './pages/Home';

// layouts
import RootLayout from './layouts/RootLayout';

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
    <RouterProvider
      router={router}
      fallbackElement={<ErrorPage />}
    />
  </React.StrictMode>
);