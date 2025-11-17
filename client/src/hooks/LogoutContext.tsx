import { createContext, useState, useContext, type ReactNode } from "react";

interface LogoutProviderProps {
    children: ReactNode;
}

const LogoutContext = createContext<any>(null);

export const LogoutProvider = ({ children }: LogoutProviderProps) => {
    const [isLoggedOut, setIsLoggedOut] = useState(false);

    return (
        <LogoutContext.Provider value={{ isLoggedOut, setIsLoggedOut }}>
            {children}
        </LogoutContext.Provider>
    );
};

export const useLogout = () => useContext(LogoutContext);
