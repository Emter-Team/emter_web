import { IconCheck, IconExclamationMark, IconX } from "@tabler/icons-react";
import React, { useEffect, useState } from "react";

export default function Toast({ variant = "red", message, duration = 3000 }) {
    const [status, setStatus] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setStatus(false);
        }, duration);

        return () => clearTimeout(timer);
    }, [duration]);

    const handleClose = () => {
        setStatus(false);
    };

    if (!status) return null;

    return (
        <div
            id={`toast-${variant}`}
            className="fixed top-10 left-1/2 transform -translate-x-1/2 -translate-y-1/2 min-w-xs flex items-center justify-center p-3 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800"
            role="alert"
        >
            <div
                className={`inline-flex items-center justify-center flex-shrink-0 w-10 h-10 text-${variant}-500 bg-${variant}-100 rounded-lg dark:bg-${variant}-800 dark:text-${variant}-200 bg-green-100 text-green-800`}
            >
                {variant === "red" ? (
                    <IconX />
                ) : variant === "green" ? (
                    <IconCheck />
                ) : (
                    <IconExclamationMark className="p-4 bg-yellow-500/50" />
                )}
            </div>
            <div className="ms-3 text-sm font-normal mr-2">{message}</div>
            <button
                type="button"
                className={`ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700`}
                data-dismiss-target="#toast-danger"
                aria-label="Close"
                onClick={handleClose}
            >
                <span className="sr-only">Close</span>
                <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                >
                    <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                </svg>
            </button>
        </div>
    );
}
