import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <div className="flex scrolling-wrapper w-full flex-row overflow-x-auto overflow-y-hidden gap-x-6 max-w-8xl mx-auto px-4 sm:px-4 lg:px-24 bg-white items-center flex mt-[72px] h-[50px] border-b border-slate-200">
            <Link
                to="/dashboard"
                className="py-3 px-1 border-b-2 border-transparent hover:border-black whitespace-nowrap"
            >
                Dashboard
            </Link>
            <Link
                to="/residents"
                className="py-3 px-1 border-b-2 border-transparent hover:border-black whitespace-nowrap"
            >
                Daftar Pengguna
            </Link>
            <Link
                to="/services"
                className="py-3 px-1 border-b-2 border-transparent hover:border-black whitespace-nowrap"
            >
                Daftar Layanan Darurat
            </Link>
            <Link
                to="/posts"
                className="py-3 px-1 border-b-2 border-transparent hover:border-black whitespace-nowrap"
            >
                Daftar Berita
            </Link>
            <Link
                to="/incidents"
                className="py-3 px-1 border-b-2 border-transparent hover:border-black whitespace-nowrap"
            >
                Daftar Laporan Kejadian
            </Link>
            <Link
                to="/vehicles"
                className="py-3 px-1 border-b-2 border-transparent hover:border-black whitespace-nowrap"
            >
                Daftar Kendaraan
            </Link>
            <Link
                to="/settings"
                className="py-3 px-1 border-b-2 border-transparent hover:border-black whitespace-nowrap"
            >
                Pengaturan
            </Link>
        </div>
    );
}
