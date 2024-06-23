import React from "react";
import NavLink from "./navlink";

export default function Sidebar() {
    return (
        <div className="h-min md:h-screen w-full md:w-2/12 mt-20 pt-4 flex flex-col gap-4">
            <NavLink to="/admin/residents" className="whitespace-nowrap">
                Masyarakat
            </NavLink>
            <NavLink to="/admin/institutions" className="whitespace-nowrap">
                Instansi
            </NavLink>
            <NavLink to="/admin/officers" className="whitespace-nowrap">
                Petugas
            </NavLink>
        </div>
    );
}
