import Topbar from "@/components/fragment/topbar";
import Container from "@/components/ui/container";
import { useStateContext } from "@/contexts/ContextProvider";
import React from "react";
import { Navigate, Outlet } from "react-router-dom";

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
        </div>
    );
}
