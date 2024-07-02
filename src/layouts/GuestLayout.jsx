import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useStateContext } from "@/contexts/ContextProvider";

export default function GuestLayout() {
    const { token, user } = useStateContext();

    if (token && user) {
        if (!user.email_verified_at) {
            // Jika sudah login tetapi belum verifikasi email, arahkan ke halaman verifikasi
            <Navigate to="/auth/email-verify" />;
        } else {
            // Jika sudah login dan sudah verifikasi email, arahkan ke dashboard
            <Navigate to="/dashboard" />;
        }
    }

    return (
        <div>
            <Outlet />
            <ToastContainer />
        </div>
    );
}
