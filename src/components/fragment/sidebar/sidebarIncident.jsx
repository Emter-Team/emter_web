import React from "react";
import NavLink from "../navlink";

export default function SidebarIncident() {
    return (
        <div className="h-min md:h-screen w-full md:w-2/12 mt-20 pt-4 flex flex-col gap-4">
            <NavLink
                to="/incidents"
                active={location.pathname === "/incidents"}
                className="whitespace-nowrap"
            >
                Laporan Kejadian
            </NavLink>
            <NavLink
                to="/incident_types"
                active={location.pathname === "/incident_types"}
                className="whitespace-nowrap"
            >
                Jenis Kejadian Darurat
            </NavLink>
        </div>
    );
}
