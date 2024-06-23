import React from "react";

export default function Content({ children }) {
    return (
        <div className="w-full mt-20 p-0 md:p-4 md:w-10/12 h-screen">
            {children}
        </div>
    );
}
