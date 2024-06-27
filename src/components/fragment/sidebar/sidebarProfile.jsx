import React from "react";
import NavLink from "../navlink";

export default function SidebarProfile({ user }) {
    return (
        <div className="h-min md:h-screen w-full md:w-2/12 mt-20 pt-4 flex flex-col gap-4">
            <NavLink
                to={`/profiles/${user?.username}`}
                className="whitespace-nowrap"
                active={location.pathname === `/profiles/${user?.username}`}
            >
                General
            </NavLink>
            <NavLink
                to={`/profiles/${user?.username}/update`}
                active={
                    location.pathname === `/profiles/${user?.username}/update`
                }
                className="whitespace-nowrap"
            >
                Ubah Profil
            </NavLink>
            <NavLink
                to={`/profiles/${user?.username}/change_password`}
                active={
                    location.pathname ===
                    `/profiles/${user?.username}/change_password`
                }
                className="whitespace-nowrap"
            >
                Keamanan
            </NavLink>
            <NavLink
                to={`/profiles/${user?.username}/danger`}
            active={
                    location.pathname === `/profiles/${user?.username}/danger`
                }
                className="whitespace-nowrap"
            >
                Area Berbahaya
            </NavLink>
        </div>
    );
}
