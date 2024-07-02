import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useStateContext } from "@/contexts/ContextProvider";
import Topbar from "@/components/fragment/topbar";
import Container from "@/components/ui/container";

export default function DefaultLayout() {
    const { user, token } = useStateContext();

    if (!token || !user) {
        // Jika tidak ada token atau user, arahkan ke halaman login
        <Navigate to="/auth/login" />;
    }

    if (token && user && !user.email_verified_at) {
        // Jika sudah login tetapi belum verifikasi email, arahkan ke halaman verifikasi
        <Navigate to="/auth/email-verify" />;
    }

    return (
        <div>
            <Topbar user={user} />
            <main>
                <Container>
                    <Outlet />
                </Container>
            </main>
            <ToastContainer
                autoClose={4000}
                hideProgressBar={true}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                className="toast-container"
                theme="light"
                transition:Slide
            />
        </div>
    );
}
