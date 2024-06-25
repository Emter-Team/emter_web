import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarSeparator,
    MenubarTrigger,
} from "@/components/ui/menubar";
import { Button } from "../ui/button";
import { useStateContext } from "@/contexts/ContextProvider";
import http from "@/services/axios";
import Navbar from "./navbar";
import { Bell, CircleGauge, CircleUserRound, UserRoundCog } from "lucide-react";
import NavLink from "./navlink";

export default function Topbar({ user }) {
    const navigate = useNavigate();
    const { setUser, setToken } = useStateContext();
    const location = useLocation();

    const handleLogout = async () => {
        try {
            await http.post("/auth/logout");
            setUser(null);
            setToken(null);
            navigate("/auth/login");
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
            <nav className="bg-white fixed z-[99] top-0 md:border-b-[2px] border-b-secondary/20 w-full h-[72px]">
                <div className="max-w-8xl mx-auto px-4 sm:px-4 lg:px-24">
                    <div className="flex justify-between w-full items-center">
                        <NavLink
                            to="/"
                            className="text-2xl p-2 rounded font-bold text-primary"
                        >
                            <img
                                src="/images/app/emter.png"
                                alt=""
                                className="w-40"
                            />
                        </NavLink>
                        {user ? (
                            <div className="flex justify-end items-center gap-x-2">
                                <Bell
                                    size={24}
                                    absoluteStrokeWidth={true}
                                    className="text-secondary"
                                />
                                <Menubar className="border-none items-center flex">
                                    <MenubarMenu>
                                        <MenubarTrigger className="bg-white focus:bg-primary/10 focus:text-white  hover:bg-primary/10 rounded-xl py-3">
                                            <CircleUserRound
                                                absoluteStrokeWidth={true}
                                                size="36"
                                                className="text-primary"
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
                                            <NavLink
                                                to="/dashboard"
                                                active={
                                                    location.pathname ===
                                                    "/dashboard"
                                                }
                                                className="flex items-center w-full h-full"
                                            >
                                                <MenubarItem>
                                                    <CircleGauge
                                                        size={18}
                                                        className={`mr-2`}
                                                    />
                                                    Dashboard
                                                </MenubarItem>
                                            </NavLink>
                                            <MenubarSeparator />
                                            <NavLink
                                                to={`/profiles/${user?.username}`}
                                                active={
                                                    location.pathname ===
                                                    `/profiles/${user?.username}`
                                                }
                                                className="flex items-center w-full h-full"
                                            >
                                                <MenubarItem>
                                                    <UserRoundCog
                                                        size={18}
                                                        className="mr-2"
                                                    />{" "}
                                                    Pengaturan
                                                </MenubarItem>
                                            </NavLink>
                                            <MenubarSeparator />
                                            <Button
                                                className="w-48"
                                                onClick={handleLogout}
                                            >
                                                <MenubarItem className="flex justify-center">
                                                    Logout
                                                </MenubarItem>
                                            </Button>
                                        </MenubarContent>
                                    </MenubarMenu>
                                </Menubar>
                            </div>
                        ) : null}
                    </div>
                </div>
            </nav>
            <Navbar user={user} />
        </>
    );
}
