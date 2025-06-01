import { User } from "lucide-react";
import FarmerCard from "../components/FarmerCard";
import farmersData from "../data/farmersData";

const PublicLanding = ({ onLogin, onViewProfile }) => {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center">
                            <h1 className="text-2xl font-bold text-green-600">AgroTrace</h1>
                        </div>
                        <button
                            onClick={onLogin}
                            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors flex items-center gap-2"
                        >
                            <User className="w-4 h-4" />
                            Login como agricultor
                        </button>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Trazabilidad Agrícola Transparente</h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Conoce a nuestros agricultores y la historia detrás de cada producto
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {farmersData.map((farmer) => (
                        <FarmerCard key={farmer.id} farmer={farmer} onViewProfile={onViewProfile} />
                    ))}
                </div>
            </main>
        </div>
    );
};

export default PublicLanding;
