import React from "react";
import NavLink from "../navlink";

export default function NavbarHome() {
    return (
        <nav className="bg-white fixed z-[99] top-8 md:border-b-[2px] border-b-secondary/20 w-full">
            <div className="max-w-7xl mx-auto px-4 sm:px-4 py-2">
                <div className="flex justify-between w-full items-center">
                    <a
                        href="#jumbotron"
                        className="text-2xl p-2 rounded font-bold text-primary"
                    >
                        <img
                            src="/images/app/emter.png"
                            alt=""
                            className="w-60"
                        />
                    </a>
                    <div className="flex justify-end items-center gap-x-8">
                        <a
                            href="#tentangkami"
                            active={location.pathname.startsWith(
                                "/#tentangkami"
                            )}
                            className="text-[18px] text-primary"
                        >
                            Tentang Kami
                        </a>
                        <a
                            href="#tujuan"
                            active={location.pathname.startsWith("/#tujuan")}
                            className="text-[18px] text-primary"
                        >
                            Tujuan
                        </a>
                        <a
                            href="#fitur"
                            active={location.pathname.startsWith("/#fitur")}
                            className="text-[18px] text-primary"
                        >
                            Fitur
                        </a>
                        <a
                            href="#teknologi"
                            active={location.pathname.startsWith("/#teknologi")}
                            className="text-[18px] text-primary"
                        >
                            Teknologi
                        </a>
                    </div>
                </div>
            </div>
        </nav>
    );
}
