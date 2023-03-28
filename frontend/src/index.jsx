import React from 'react';
import ReactDOM from 'react-dom/client';
import {
    createBrowserRouter,
    RouterProvider,
    Outlet,
    ScrollRestoration,
} from "react-router-dom";
import Howl from './components/Howl';
import ErrorPage from './pages/ErrorPage';
import Home from './pages/Home';

const AppLayout = () => {
    return (
        <>
            <ScrollRestoration />
            <nav>
              <ul>
                <li></li>
              </ul>
            </nav>
            <Outlet />
        </>
    );
};

const router = createBrowserRouter([
    {
        element: <AppLayout />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/home",
                element: <Home />,
            },
            {
                path: "/howl/:howlId",
                element: <Howl />,
            },
        ],
    },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);