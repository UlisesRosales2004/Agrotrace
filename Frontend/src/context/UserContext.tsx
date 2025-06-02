import React, { createContext, useContext, useState } from "react";
import type { Usuario } from "../types/user";

interface UserContextValue {
    user: Usuario | null;
    login: (user: Usuario) => void;
    logout: () => void;
}

const UserContext = createContext<UserContextValue | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode; user?: Usuario | null }> = ({
    children,
    user = null,
}) => {
    const [currentUser, setCurrentUser] = useState<Usuario | null>(user);

    const login = (user: Usuario) => setCurrentUser(user);
    const logout = () => setCurrentUser(null);

    return <UserContext.Provider value={{ user: currentUser, login, logout }}>{children}</UserContext.Provider>;
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUser debe usarse dentro de un UserProvider");
    }
    return context;
};
