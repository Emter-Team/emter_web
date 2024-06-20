import React from "react";
import { Link } from "react-router-dom";
import emterImg from "../../../public/images/app/emter.png";
import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarSeparator,
    MenubarTrigger,
} from "@/components/ui/menubar";
import {
    IconBell,
    IconDashboard,
    IconSettings,
    IconUserCircle,
} from "@tabler/icons-react";
import { Button } from "../ui/button";
import Navbar from "./navbar";

export default function Topbar() {
    return (
        <>
            <nav className="bg-white fixed z-[99] top-0 border-b-[1.5px] border-b-slate-300 w-full h-[72px]">
                <div className="max-w-8xl mx-auto px-4 sm:px-4 lg:px-24">
                    <div className="flex justify-between w-full items-center">
                        <Link
                            to="/"
                            className="text-2xl p-2 rounded font-bold text-black"
                        >
                            <img src={emterImg} alt="" className="w-40" />
                        </Link>
                        <div className="flex justify-end items-center">
                            <IconBell
                                size="24"
                                stroke="1.2"
                                className="text-slate-900"
                            />
                            <Menubar className="border-none items-center flex">
                                <MenubarMenu>
                                    <MenubarTrigger>
                                        <IconUserCircle
                                            size="36"
                                            stroke="1.4"
                                            className="text-slate-900"
                                        />
                                    </MenubarTrigger>
                                    <MenubarContent align="end">
                                        <MenubarItem>
                                            <div className="flex flex-col truncate ...">
                                                <h4 className="truncate ... font-semibold">
                                                    Rachel Ardana Putra Ginting
                                                </h4>
                                                <div className="truncate ...">
                                                    rachelardanaputraginting@gmail.com
                                                </div>
                                            </div>
                                        </MenubarItem>
                                        <MenubarSeparator />
                                        <MenubarItem>
                                            <IconDashboard
                                                size={20}
                                                className="mr-2"
                                            />{" "}
                                            Dashboard
                                        </MenubarItem>
                                        <MenubarSeparator />
                                        <MenubarItem>
                                            <IconSettings
                                                size={20}
                                                className="mr-2"
                                            />{" "}
                                            Pengaturan
                                        </MenubarItem>
                                        <MenubarSeparator />
                                        <MenubarItem>
                                            <Button className="w-full">
                                                Logout
                                            </Button>
                                        </MenubarItem>
                                    </MenubarContent>
                                </MenubarMenu>
                            </Menubar>
                        </div>
                    </div>
                </div>
            </nav>
            <Navbar />
        </>
    );
}
