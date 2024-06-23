import React from "react";
import NavLink from "./navlink";
import { useLocation } from "react-router-dom";

export default function Navbar() {
    const location = useLocation();
    return (
        <div className="fixed flex scrolling-wrapper z-[99] w-full flex-row overflow-x-auto overflow-y-hidden gap-x-6 max-w-8xl mx-auto px-4 sm:px-4 lg:px-24 bg-white items-center flex h-[50px] border-b border-slate-200">
            <NavLink
                to="/dashboard"
                className={`flex items-center whitespace-nowrap ${
                    location.pathname === "/admin/dashboard"
                        ? "font-semibold px-1 border-b border-b-2 border-black"
                        : ""
                }`}
            >
                Dashboard
            </NavLink>
            <NavLink to="/admin/residents" className="whitespace-nowrap ">
                Daftar Pengguna
            </NavLink>
            <NavLink to="/services" className="whitespace-nowrap">
                Daftar Layanan Darurat
            </NavLink>
            <NavLink to="/posts" className="whitespace-nowrap">
                Daftar Berita
            </NavLink>
            <NavLink to="/incidents" className="whitespace-nowrap">
                Daftar Laporan Kejadian
            </NavLink>
            <NavLink to="/vehicles" className="whitespace-nowrap">
                Daftar Kendaraan
            </NavLink>
            <NavLink to="/settings" className="whitespace-nowrap">
                Pengaturan
            </NavLink>
        </div>
    );
}
