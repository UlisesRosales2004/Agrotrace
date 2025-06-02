import { useState } from "react";
import PublicLanding from "./Pages/PublicLanding";
import LoginView from "./Pages/LoginView";
import RegisterView from "./Pages/RegisterView";
import PublicProfile from "./Pages/PublicProfile";
import PrivateDashboard from "./Pages/PrivateDashboard";
import { UserProvider } from "./context/UserContext";
import type { Usuario } from "./types/user";

type ViewType = "landing" | "login" | "register" | "profile" | "dashboard";

export default function App() {
    const [currentView, setCurrentView] = useState<ViewType>("landing");
    const [selectedFarmer, setSelectedFarmer] = useState<Usuario | null>(null);
    const [currentUser, setCurrentUser] = useState<Usuario | null>(null);

    const handleViewProfile = (farmer: Usuario) => {
        setSelectedFarmer(farmer);
        setCurrentView("profile");
    };

    const handleLogin = () => {
        setCurrentView("login");
    };

    const handleRegister = () => {
        setCurrentView("register");
    };

    // AQUÍ ESTÁ EL PROBLEMA Y LA SOLUCIÓN
    const handleLoginSuccess = (user: Usuario) => {
        // Actualizar el estado local del usuario también
        setCurrentUser(user);
        setCurrentView("dashboard");
    };

    const handleRegisterSuccess = (user: Usuario) => {
        // Convertir User a Farmer si es necesario
        const farmer: Usuario = {
            ...user,
            ubicacion: user.ubicacion || "",
            calificacionPromedio: user.calificacionPromedio || 0,
            productsCount: user.productsCount || 0,
        };
        setCurrentUser(farmer);
        setCurrentView("dashboard");
    };

    const handleLogout = () => {
        setCurrentUser(null);
        setCurrentView("landing");
    };

    const handleBack = () => {
        setCurrentView("landing");
        setSelectedFarmer(null);
    };

    return (
        <UserProvider user={currentUser}>
            <div className="App">
                {currentView === "landing" && <PublicLanding onLogin={handleLogin} onViewProfile={handleViewProfile} />}

                {currentView === "login" && (
                    <LoginView onBack={handleBack} onRegister={handleRegister} onLoginSuccess={handleLoginSuccess} />
                )}

                {currentView === "register" && (
                    <RegisterView onBack={handleBack} onRegisterSuccess={handleRegisterSuccess} />
                )}

                {currentView === "profile" && selectedFarmer && (
                    <PublicProfile farmer={selectedFarmer} onBack={handleBack} />
                )}

                {currentView === "dashboard" && <PrivateDashboard onLogout={handleLogout} />}
            </div>
        </UserProvider>
    );
}