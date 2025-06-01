import { useState } from "react";
import PublicLanding from "./Pages/PublicLanding";
import LoginView from "./Pages/LoginView";
import RegisterView from "./Pages/RegisterView";
import PublicProfile from "./Pages/PublicProfile";
import PrivateDashboard from "./Pages/PrivateDashboard";
import { UserProvider } from "./context/UserContext";
import type { Farmer } from "./types/farmer";

type ViewType = "landing" | "login" | "register" | "profile" | "dashboard";

export default function App() {
    const [currentView, setCurrentView] = useState<ViewType>("landing");
    const [selectedFarmer, setSelectedFarmer] = useState<Farmer | null>(null);
    const [currentUser, setCurrentUser] = useState<Farmer | null>(null);

    const handleViewProfile = (farmer: Farmer) => {
        setSelectedFarmer(farmer);
        setCurrentView("profile");
    };

    const handleLogin = () => {
        setCurrentView("login");
    };

    const handleRegister = () => {
        setCurrentView("register");
    };

    const handleLoginSuccess = () => {
        setCurrentView("dashboard");
    };

    const handleRegisterSuccess = (user: Farmer) => {
        // Convertir User a Farmer si es necesario
        const farmer: Farmer = {
            ...user,
            location: user.location || "",
            rating: user.rating || 0,
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
