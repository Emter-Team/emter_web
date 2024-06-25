import React from "react";
import NavLink from "./navlink";
import { useLocation } from "react-router-dom";

export default function Navbar() {
    const location = useLocation();
    return (
        <div className="fixed flex scrolling-wrapper z-[99] w-full flex-row overflow-x-auto overflow-y-hidden gap-x-6 max-w-8xl mx-auto px-4 sm:px-4 lg:px-24 bg-white items-center flex h-[50px] border-b border-secondary/20">
            <NavLink
                to="/dashboard"
                className={`flex items-center whitespace-nowrap ${
                    location.pathname === "/dashboard"
                        ? "font-semibold px-1 border-b border-b-2 border-secondary"
                        : ""
                }`}
            >
                Dashboard
            </NavLink>
            <NavLink
                to="/residents"
                className={`flex items-center whitespace-nowrap`}
                active={location.pathname === "/residents"}
            >
                Daftar Pengguna
            </NavLink>
            <NavLink
                to="/services"
                className="whitespace-nowrap"
                active={location.pathname === "/services"}
            >
                Daftar Layanan Darurat
            </NavLink>
            <NavLink
                to="/posts"
                active={
                    location.pathname === "/posts" ||
                    location.pathname === "/post_categories"
                }
                className="whitespace-nowrap"
            >
                Daftar Berita
            </NavLink>
            <NavLink
                to="/incidents"
                className="whitespace-nowrap"
                active={location.pathname === "/incidents"}
            >
                Daftar Laporan Kejadian
            </NavLink>
            <NavLink
                to="/vehicles"
                className="whitespace-nowrap"
                active={location.pathname === "/vehicles"}
            >
                Daftar Kendaraan
            </NavLink>
            <NavLink to="/settings" className="whitespace-nowrap">
                Pengaturan
            </NavLink>
        </div>
    );
}
