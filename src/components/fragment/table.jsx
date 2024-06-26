import clsx from "clsx";
import React from "react";

// Table Component
const Table = ({ children, className }) => {
    return (
        <div
            className={clsx("mt-4 w-full relative overflow-x-auto", className)}
        >
            <table
                className={clsx(
                    "w-full text-sm text-left text-primary",
                    className
                )}
            >
                {children}
            </table>
        </div>
    );
};

const Tr = ({ children, className }) => {
    return (
        <tr
            className={clsx(
                "bg-white border-b border-b-secondary/20 text-primary",
                className
            )}
        >
            {children}
        </tr>
    );
};

const Thead = ({ children, className }) => {
    return (
        <thead
            className={clsx(
                "text-primary bg-white rounded border-b-2 border-secondary/20",
                className
            )}
        >
            {children}
        </thead>
    );
};

const Tbody = ({ children, className }) => {
    return <tbody className={className}>{children}</tbody>;
};

const Th = ({ children, className }) => {
    return (
        <th scope="col" className={clsx("px-6 py-5", className)}>
            {children}
        </th>
    );
};

const Td = ({ children, className, colSpan, width, textAlign }) => {
    return (
        <td
            width={width}
            align={textAlign}
            className={clsx("px-6 py-2 text-primary", className)}
            colSpan={colSpan}
        >
            {children}
        </td>
    );
};

// Export Table Components
Table.Tr = Tr;
Table.Thead = Thead;
Table.Tbody = Tbody;
Table.Th = Th;
Table.Td = Td;

export default Table;
