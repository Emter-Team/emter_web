import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import "./index.css";
import Login from "./pages/auth/Login";
import Dashboard from "./pages/admin/Dashboard";

const router = createBrowserRouter([
    {
        path: "/auth/login",
        element: <Login />,
    },
    {
        path: "/dashboard",
        element: <Dashboard />,
    },
    {
        path: "/users",
        element: <Dashboard />,
    },
    {
        path: "/services",
        element: <Dashboard />,
    },
    {
        path: "/posts",
        element: <Dashboard />,
    },
    {
        path: "/incidents",
        element: <Dashboard />,
    },
    {
        path: "/vehicles",
        element: <Dashboard />,
    },
    {
        path: "/settings",
        element: <Dashboard />,
    },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <HelmetProvider>
            <RouterProvider router={router} />
        </HelmetProvider>
    </React.StrictMode>
);
