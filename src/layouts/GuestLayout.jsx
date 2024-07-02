import { useStateContext } from "@/contexts/ContextProvider";
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function GuestLayout() {
    const { token, user } = useStateContext();
    if (token && user && user.email_verified_at !== null) {
        return <Navigate to="/dashboard" />;
    }
    return (
        <div>
            <Outlet />
            <ToastContainer />
        </div>
    );
}
