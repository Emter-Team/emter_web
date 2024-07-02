import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ContextProvider } from "./contexts/ContextProvider";
import Topbar from "./components/fragment/topbar";

export const UserContext = React.createContext();

function App() {
    const [authenticatedUser, setAuthenticatedUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("Authorization");
        if (token) {
            instance
                .get("/auth/user", {
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
        <ContextProvider>
            <UserContext.Provider
                value={{ authenticatedUser, setAuthenticatedUser }}
            >
                <div className="min-h-screen bg-white">
                    <Outlet />
                </div>
                <ToastContainer />
            </UserContext.Provider>
        </ContextProvider>
    );
}

export default App;
