import { useEffect, useState } from "react";
import { User } from "lucide-react";
import FarmerCard from "../components/FarmerCard";
import type { Farmer } from "../types/farmer";
//!import { getFarmers } from "../services/farmerService";
import farmersData from "../data/farmersData";

interface PublicLandingProps {
    onLogin: () => void;
    onViewProfile: (farmer: Farmer) => void;
}

const PublicLanding: React.FC<PublicLandingProps> = ({ onLogin, onViewProfile }) => {
    const [farmers, setFarmers] = useState<Farmer[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFarmers = async () => {
            try {
                //!const data = await getFarmers();
                const data = farmersData;
                setFarmers(data);
            } catch (error) {
                console.error("Error fetching farmers:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchFarmers();
    }, []);

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <h1 className="text-2xl font-bold text-green-600">🌱 AgroTrace</h1>
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

                {loading ? (
                    <p className="text-center text-gray-500">Cargando agricultores...</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {farmers.map((farmer) => (
                            <FarmerCard key={farmer.id} farmer={farmer} onViewProfile={onViewProfile} />
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
};

export default PublicLanding;
