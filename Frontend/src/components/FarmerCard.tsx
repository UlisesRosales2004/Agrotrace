import { Eye, MapPin, Package } from "lucide-react";
import StarRating from "./StarRating";
import type { Usuario } from "../types/user";

interface FarmerCardProps {
    farmer: Usuario;
    onViewProfile: (farmer: Usuario) => void;
}

const FarmerCard: React.FC<FarmerCardProps> = ({ farmer, onViewProfile }) => {
      const defaultAvatar = `https://cdn-icons-png.flaticon.com/512/149/149071.png`;
    return (
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow">
            <div className="flex items-center mb-4">
                <img
                    src={farmer.fotoPerfilUrl || defaultAvatar}
                    alt={farmer.nombre}
                    className="w-16 h-16 rounded-full object-cover mr-4"
                />
                <div>
                    <h3 className="text-lg font-semibold text-gray-800">{farmer.nombre}</h3>
                    <div className="flex items-center text-gray-600 text-sm">
                        <MapPin className="w-4 h-4 mr-1" />
                        {farmer.ubicacion}
                    </div>
                </div>
            </div>

            <div className="space-y-2 mb-4">
                <StarRating rating={farmer.productsCount || 0} />
                <div className="flex items-center text-gray-600 text-sm">
                    <Package className="w-4 h-4 mr-1" />
                    {farmer.productsCount} productos
                </div>
            </div>

            <button
                onClick={() => onViewProfile(farmer)}
                className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
            >
                <Eye className="w-4 h-4" />
                Ver perfil
            </button>
        </div>
    );
};

export default FarmerCard;
