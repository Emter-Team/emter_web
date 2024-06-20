import Navbar from "@/components/fragment/navbar";
import Topbar from "@/components/fragment/topbar";
import React from "react";
import { Helmet } from "react-helmet-async";

function Dashboard() {
    return (
        <>
            <Helmet>
                <title>Emter - Dashboard</title>
            </Helmet>
            <Topbar />
            <Navbar />
        </>
    );
}

export default Dashboard;
