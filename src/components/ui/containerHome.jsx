import clsx from "clsx";
import React from "react";

export default function ContainerHome({ children, className }) {
    return (
        <div
            className={clsx(
                "max-w-7xl mx-auto mt-[72px] px-4 sm:px-4 md:px-0 flex flex-wrap items-center",
                className
            )}
        >
            {children}
        </div>
    );
}
