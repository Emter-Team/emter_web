import React from "react";
import NavLink from "../navlink";

export default function SidebarUser() {
    return (
        <div className="h-min md:h-screen w-full md:w-2/12 mt-20 pt-4 flex flex-col gap-4">
            <NavLink
                to="/residents"
                active={location.pathname.startsWith("/residents")}
                className="whitespace-nowrap"
            >
                Masyarakat
            </NavLink>
            <NavLink
                to="/institutions"
                active={location.pathname.startsWith("/institution")}
                className="whitespace-nowrap"
            >
                Instansi
            </NavLink>
            <NavLink
                to="/officers"
                active={location.pathname.startsWith("/officers")}
                className="whitespace-nowrap"
            >
                Petugas
            </NavLink>
        </div>
    );
}
