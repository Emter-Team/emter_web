import React from "react";
import NavLink from "../navlink";

export default function SidebarSetting() {
    return (
        <div className="h-min md:h-screen w-full md:w-2/12 mt-20 pt-4 flex flex-col gap-4">
            <NavLink
                to="/services"
                active={location.pathname === "/services"}
                className="whitespace-nowrap"
            >
                Layanan
            </NavLink>
            <NavLink
                to="/incident_types"
                active={location.pathname === "/incident_types"}
                className="whitespace-nowrap"
            >
                Jenis Kejadian
            </NavLink>
            <NavLink
                to="/post_categories"
                active={location.pathname === "/post_categories"}
                className="whitespace-nowrap"
            >
                Jenis Berita
            </NavLink>
        </div>
    );
}
