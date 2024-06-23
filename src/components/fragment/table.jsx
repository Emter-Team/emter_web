import clsx from "clsx";
import React from "react";

const Table = ({ children, className }) => {
    return (
        <div
            className={clsx(
                "mt-4 w-full relative overflow-x-auto whitespace-nowrap",
                className
            )}
        >
            <table
                className={clsx(
                    "w-full text-sm text-left text-dark whitespace-nowrap",
                    className
                )}
            >
                {children}
            </table>
        </div>
    );
};

const Thead = ({ children, className }) => {
    return (
        <thead
            className={clsx(
                " text-dark bg-third rounded border-b-2 whitespace-nowrap",
                className
            )}
        >
            {children}
        </thead>
    );
};

const Tbody = ({ children, className }) => {
    return (
        <tbody className={clsx("whitespace-nowrap", className)}>
            {children}
        </tbody>
    );
};

const Th = ({ children, className }) => {
    return (
        <th
            scope="col"
            className={clsx("px-6 py-5 whitespace-nowrap", className)}
        >
            {children}
        </th>
    );
};

const Td = ({ children, className, colSpan, width, textAlign }) => {
    return (
        <td
            width={width}
            align={textAlign}
            className={clsx("px-6 py-2 text-dark whitespace-nowrap", className)}
            colSpan={colSpan}
        >
            {children}
        </td>
    );
};

Table.Thead = Thead;
Table.Tbody = Tbody;
Table.Th = Th;
Table.Td = Td;

export default Table;
