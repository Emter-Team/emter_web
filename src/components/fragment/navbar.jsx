import React from "react";
import NavLink from "./navlink";
import { useLocation } from "react-router-dom";

export default function Navbar({ user }) {
    const location = useLocation();

    return (
        <div className="fixed flex scrolling-wrapper z-[99] w-full flex-row overflow-x-auto overflow-y-hidden gap-x-6 max-w-8xl mx-auto px-4 sm:px-4 lg:px-24 bg-white items-center flex h-[50px] border-b border-secondary/20">
            {user.role.name === "resident" ? (
                <>
                    <NavLink
                        to="/dashboard"
                        className={`flex items-center whitespace-nowrap ${
                            location.pathname.startsWith("/dashboard")
                                ? "font-semibold px-1 border-b border-b-2 border-secondary"
                                : ""
                        }`}
                    >
                        Dasbor
                    </NavLink>
                    <NavLink
                        to="/residents"
                        className={`flex items-center whitespace-nowrap ${
                            location.pathname.startsWith("/residents") ||
                            location.pathname.startsWith("/officers") ||
                            location.pathname.startsWith("/institutions")
                                ? "font-semibold px-1 border-b border-b-2 border-secondary"
                                : ""
                        }`}
                    >
                        Daftar Pengguna
                    </NavLink>
                    <NavLink
                        to="/posts"
                        className={`flex items-center whitespace-nowrap ${
                            location.pathname.startsWith("/posts") ||
                            location.pathname.startsWith("/post_categories")
                                ? "font-semibold px-1 border-b border-b-2 border-secondary"
                                : ""
                        }`}
                    >
                        Daftar Berita
                    </NavLink>
                    <NavLink
                        to="/incidents"
                        className={`flex items-center whitespace-nowrap ${
                            location.pathname.startsWith("/incidents")
                                ? "font-semibold px-1 border-b border-b-2 border-secondary"
                                : ""
                        }`}
                    >
                        Daftar Laporan Kejadian
                    </NavLink>
                    <NavLink
                        to="/vehicles"
                        className={`flex items-center whitespace-nowrap ${
                            location.pathname.startsWith("/vehicles")
                                ? "font-semibold px-1 border-b border-b-2 border-secondary"
                                : ""
                        }`}
                    >
                        Daftar Kendaraan
                    </NavLink>
                    <NavLink
                        to="/services"
                        className={`flex items-center whitespace-nowrap ${
                            location.pathname.startsWith("/services") ||
                            location.pathname.startsWith("/incident_types") ||
                            location.pathname.startsWith("/post_categories")
                                ? "font-semibold px-1 border-b border-b-2 border-secondary"
                                : ""
                        }`}
                    >
                        Pengaturan
                    </NavLink>
                </>
            ) : (
                <>
                    <NavLink
                        to="/dashboard"
                        className={`flex items-center whitespace-nowrap ${
                            location.pathname.startsWith("/dashboard")
                                ? "font-semibold px-1 border-b border-b-2 border-secondary"
                                : ""
                        }`}
                    >
                        Dasbor
                    </NavLink>
                    <NavLink
                        to="/officers"
                        className={`flex items-center whitespace-nowrap ${
                            location.pathname.startsWith("/residents") ||
                            location.pathname.startsWith("/officers") ||
                            location.pathname.startsWith("/institutions")
                                ? "font-semibold px-1 border-b border-b-2 border-secondary"
                                : ""
                        }`}
                    >
                        Daftar Petugas
                    </NavLink>
                    <NavLink
                        to="/posts"
                        className={`flex items-center whitespace-nowrap ${
                            location.pathname.startsWith("/posts") ||
                            location.pathname.startsWith("/post_categories")
                                ? "font-semibold px-1 border-b border-b-2 border-secondary"
                                : ""
                        }`}
                    >
                        Daftar Berita
                    </NavLink>
                    <NavLink
                        to="/institution/vehicles"
                        className={`flex items-center whitespace-nowrap ${
                            location.pathname.startsWith("/incidents")
                                ? "font-semibold px-1 border-b border-b-2 border-secondary"
                                : ""
                        }`}
                    >
                        Daftar Kendaraan
                    </NavLink>
                </>
            )}

            <NavLink
                to={`/profiles/${user?.username}`}
                className={`flex items-center whitespace-nowrap ${
                    location.pathname.startsWith(`/profiles/${user?.username}`)
                        ? "font-semibold px-1 border-b border-b-2 border-secondary"
                        : ""
                }`}
            >
                Profil Saya
            </NavLink>
        </div>
    );
}
