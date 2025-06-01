import { useState } from "react";
import PublicLanding from "./Pages/PublicLanding";
import LoginView from "./Pages/LoginViex";
import RegisterView from "./Pages/RegisterView";
import PublicProfile from "./Pages/PublicProfile";
import PrivateDashboard from "./Pages/PrivateDashboard";

export default function App() {
    const [currentView, setCurrentView] = useState("landing");
    const [selectedFarmer, setSelectedFarmer] = useState(null);
    const [loggedInFarmer, setLoggedInFarmer] = useState(null);

    const handleViewProfile = (farmer) => {
        setSelectedFarmer(farmer);
        setCurrentView("profile");
    };

    const handleLogin = () => {
        setCurrentView("login");
    };

    const handleRegister = () => {
        setCurrentView("register");
    };

    const handleLoginSuccess = (farmer) => {
        setLoggedInFarmer(farmer);
        setCurrentView("dashboard");
    };

    const handleRegisterSuccess = (farmerData) => {
        setLoggedInFarmer(farmerData);
        setCurrentView("dashboard");
    };

    const handleLogout = () => {
        setLoggedInFarmer(null);
        setCurrentView("landing");
    };

    const handleBack = () => {
        setCurrentView("landing");
        setSelectedFarmer(null);
    };

    return (
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

            {currentView === "dashboard" && loggedInFarmer && (
                <PrivateDashboard farmer={loggedInFarmer} onLogout={handleLogout} />
            )}
        </div>
    );
}
