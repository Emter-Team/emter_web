import Topbar from "@/components/fragment/topbar";
import Container from "@/components/ui/container";
import { useStateContext } from "@/contexts/ContextProvider";
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function DefaultLayout() {
    const { user, token } = useStateContext();
    if (!token || user == null) {
        return <Navigate to="/auth/login" />;
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
                autoClose={3000}
                hideProgressBar={true}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition:Zoom
            />
        </div>
    );
}
