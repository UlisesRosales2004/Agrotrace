import { ArrowLeft, MapPin, Package } from "lucide-react";
import ProductCard from "../components/ProductCard";
import StarRating from "../components/StarRating";

const PublicProfile = ({ farmer, onBack }) => {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center h-16">
                        <button onClick={onBack} className="flex items-center text-green-600 hover:text-green-700 mr-4">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Volver
                        </button>
                        <h1 className="text-2xl font-bold text-green-600">AgroTrace</h1>
                    </div>
                </div>
            </header>

            {/* Profile Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Farmer Info */}
                <div className="bg-white rounded-lg shadow-md p-8 mb-8">
                    <div className="flex items-center mb-6">
                        <img
                            src={farmer.image || "/placeholder.svg"}
                            alt={farmer.name}
                            className="w-24 h-24 rounded-full object-cover mr-6"
                        />
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900">{farmer.name}</h2>
                            <div className="flex items-center text-gray-600 text-lg mt-2">
                                <MapPin className="w-5 h-5 mr-2" />
                                {farmer.location}
                            </div>
                            <div className="mt-2">
                                <StarRating rating={farmer.rating} size="w-5 h-5" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Products */}
                <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">Productos</h3>
                    {farmer.products.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {farmer.products.map((product) => (
                                <ProductCard key={product.id} product={product} showQR={true} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                            <p className="text-gray-600">Este agricultor aún no ha subido productos</p>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default PublicProfile;
