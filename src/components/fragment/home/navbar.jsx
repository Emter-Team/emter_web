import React from "react";
import { NavLink } from "react-router-dom";
import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarSeparator,
    MenubarTrigger,
} from "@/components/ui/menubar";
import { AlignLeft } from "lucide-react";

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
                    <div className="hidden md:flex justify-end items-center gap-x-8">
                        <a
                            href="/#tentang"
                            activeClassName="text-[18px] text-primary font-bold"
                            className="text-[18px] text-primary"
                        >
                            Tentang Kami
                        </a>
                        <a
                            href="/#tujuan"
                            activeClassName="text-[18px] text-primary font-bold"
                            className="text-[18px] text-primary"
                        >
                            Tujuan
                        </a>
                        <a
                            href="/#fitur"
                            activeClassName="text-[18px] text-primary font-bold"
                            className="text-[18px] text-primary"
                        >
                            Fitur
                        </a>
                        <a
                            href="/#teknologi"
                            activeClassName="text-[18px] text-primary font-bold"
                            className="text-[18px] text-primary"
                        >
                            Teknologi
                        </a>
                        <a
                            href="/#hubungi"
                            activeClassName="text-[18px] text-primary font-bold"
                            className="text-[18px] text-primary"
                        >
                            Hubungi
                        </a>
                    </div>
                    <div className="flex justify-end sm:hidden text-secondary w-full items-center">
                        <Menubar className="border-none items-center flex">
                            <MenubarMenu>
                                <MenubarTrigger className="bg-white focus:bg-primary/10 focus:text-white  hover:bg-primary/10 rounded-xl py-3">
                                    <AlignLeft
                                        absoluteStrokeWidth={true}
                                        size="36"
                                        className="text-primary"
                                    />
                                </MenubarTrigger>
                                <MenubarContent align="end">
                                    <a href="/#tentang">
                                        <MenubarItem>Tentang Kami</MenubarItem>
                                    </a>
                                    <a href="/#tujuan">
                                        <MenubarItem>Tujuan</MenubarItem>
                                    </a>
                                    <a href="/#fitur">
                                        <MenubarItem>Fitur</MenubarItem>
                                    </a>
                                    <a href="/#teknologi">
                                        <MenubarItem>Teknologi</MenubarItem>
                                    </a>
                                    <a href="/#hubungi">
                                        <MenubarItem>Hubungi Kami</MenubarItem>
                                    </a>
                                </MenubarContent>
                            </MenubarMenu>
                        </Menubar>
                    </div>
                </div>
            </div>
        </nav>
    );
}
