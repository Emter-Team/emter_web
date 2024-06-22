import { useStateContext } from "@/contexts/ContextProvider";
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function GuestLayout() {
    const { token } = useStateContext();
    if (token) {
        return <Navigate to="/admin/dashboard" />;
    }
    return (
        <div>
            <Outlet />
            <ToastContainer />
        </div>
    );
}
