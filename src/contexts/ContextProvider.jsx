import { createContext, useContext, useState } from "react";

const stateContext = createContext({
    user: null,
    token: null,
    setUser: () => {},
    setToken: () => {},
});

export const ContextProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem("USER");
        return storedUser ? JSON.parse(storedUser) : null;
    });

    const [token, _setToken] = useState(
        localStorage.getItem("ACCESS_TOKEN") || null
    );

    const setToken = (token) => {
        _setToken(token);
        if (token) {
            localStorage.setItem("ACCESS_TOKEN", token);
        } else {
            localStorage.removeItem("ACCESS_TOKEN");
        }
    };

    const setUserAndStorage = (userData) => {
        setUser(userData);
        if (userData) {
            localStorage.setItem("USER", JSON.stringify(userData));
        } else {
            localStorage.removeItem("USER");
        }
    };

    return (
        <stateContext.Provider
            value={{
                user,
                token,
                setUser: setUserAndStorage,
                setToken,
            }}
        >
            {children}
        </stateContext.Provider>
    );
};

export const useStateContext = () => useContext(stateContext);
