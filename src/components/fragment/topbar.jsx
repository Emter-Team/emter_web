// Topbar.js
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
import { useStateContext } from "@/contexts/ContextProvider";
import http from "@/services/axios";

export default function Topbar({ user }) {
    const { setUser, setToken } = useStateContext();

    const handleLogout = async () => {
        try {
            await http.post("/auth/logout");
            setUser(null);
            setToken(null);
        } catch (error) {
            if (error.response && error.response.status === 401) {
                console.log("Unauthorized, token invalid or expired");
            } else {
                console.error("Failed to logout:", error);
            }
        }
    };

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
                        {user ? (
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
                                                        {user?.name}
                                                    </h4>
                                                    <div className="truncate ...">
                                                        {user?.email}
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
                                                <Button
                                                    className="w-full"
                                                    onClick={handleLogout}
                                                >
                                                    Logout
                                                </Button>
                                            </MenubarItem>
                                        </MenubarContent>
                                    </MenubarMenu>
                                </Menubar>
                            </div>
                        ) : null}
                    </div>
                </div>
            </nav>
        </>
    );
}
