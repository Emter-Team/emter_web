import React from "react";
import NavLink from "../navlink";

export default function SidebarPost() {
    return (
        <div className="h-min md:h-screen w-full md:w-2/12 mt-20 pt-4 flex flex-col gap-4">
            <NavLink
                to="/posts"
                active={location.pathname === "/posts"}
                className="whitespace-nowrap"
            >
                Berita
            </NavLink>
            <NavLink
                to="/post_categories"
                active={location.pathname === "/post_categories"}
                className="whitespace-nowrap"
            >
                Jenis Berita
            </NavLink>
        </div>
    );
}
