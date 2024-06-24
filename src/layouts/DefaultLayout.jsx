// DefaultLayout.jsx
import Content from "@/components/fragment/content";
import Sidebar from "@/components/fragment/sidebar";
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
                    <Sidebar />
                    <Content>
                        <Outlet />
                    </Content>
                </Container>
            </main>
        </div>
    );
}
