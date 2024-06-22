import React from "react";
import { Link } from "react-router-dom";
import NavLink from "./navlink";

export default function Navbar() {
    return (
        <div className="flex scrolling-wrapper w-full flex-row overflow-x-auto overflow-y-hidden gap-x-6 max-w-8xl mx-auto px-4 sm:px-4 lg:px-24 bg-white items-center flex mt-[72px] h-[50px] border-b border-slate-200">
            <NavLink to="/dashboard" className="whitespace-nowrap">
                Dashboard
            </NavLink>
            <NavLink to="/residents" className="whitespace-nowrap">
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
