import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const UserContext = React.createContext();

function App() {
    const [authenticatedUser, setAuthenticatedUser] = useState(null);

    useEffect(() => {
        // Check if user is already authenticated (e.g., from stored token)
        const token = localStorage.getItem("Authorization");
        if (token) {
            instance
                .get("auth/user", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then((response) => {
                    setAuthenticatedUser(response.data.user);
                })
                .catch((error) => {
                    console.error("Failed to fetch user:", error);
                });
        }
    }, []);

    return (
        <UserContext.Provider
            value={{ authenticatedUser, setAuthenticatedUser }}
        >
            <div className="min-h-screen bg-white">
                <Outlet />
            </div>
            <ToastContainer />
        </UserContext.Provider>
    );
}

export default App;
