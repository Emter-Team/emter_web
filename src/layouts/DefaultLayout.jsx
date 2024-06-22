// DefaultLayout.jsx
import Topbar from "@/components/fragment/topbar";
import { useStateContext } from "@/contexts/ContextProvider";
import http from "@/services/axios";
import React, { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";

export default function DefaultLayout() {
    const { user, token } = useStateContext();
    if (!token) {
        return <Navigate to="/auth/login" />;
    }

    return (
        <div>
            <Topbar user={user} />
            <main>
                <Outlet />
            </main>
        </div>
    );
}
