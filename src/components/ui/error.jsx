import React from "react";

export default function Error({ value, children }) {
    return (
        <div className="text-[13px] font-light mt-2 text-danger block">
            {value ? value : children}
        </div>
    );
}
