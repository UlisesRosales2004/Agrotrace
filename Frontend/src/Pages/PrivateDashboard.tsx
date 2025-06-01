import { Package, Plus, Upload } from "lucide-react";
import ProductCard from "../components/ProductCard";
import { useState } from "react";

const PrivateDashboard = ({ farmer, onLogout }) => {
    const [showUploadForm, setShowUploadForm] = useState(false);
    const [products, setProducts] = useState(farmer.products || []);
    const [newProduct, setNewProduct] = useState({
        name: "",
        type: "",
        description: "",
        plantingDate: "",
        practices: "",
    });

    const handleUploadSubmit = async (e) => {
        e.preventDefault();

        // Simular envío al backend y respuesta con URL firmada
        const signedUrl = `https://blockchain.agri/verify/${Math.random().toString(36).substr(2, 9)}`;

        const product = {
            id: Date.now(),
            name: newProduct.name,
            harvestDate: new Date().toISOString().split("T")[0],
            certifications: newProduct.practices.split(",").map((p) => p.trim()),
            rating: 0,
            signedUrl,
        };

        setProducts([...products, product]);
        setNewProduct({ name: "", type: "", description: "", plantingDate: "", practices: "" });
        setShowUploadForm(false);
    };

    const handleInputChange = (e) => {
        setNewProduct({
            ...newProduct,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <h1 className="text-2xl font-bold text-green-600">AgroTrace - Dashboard</h1>
                        <div className="flex items-center gap-4">
                            <span className="text-gray-700">Hola, {farmer.name}</span>
                            <button onClick={onLogout} className="text-gray-600 hover:text-gray-800">
                                Cerrar sesión
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-900">Mis Productos</h2>
                    <button
                        onClick={() => setShowUploadForm(true)}
                        className="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition-colors flex items-center gap-2"
                    >
                        <Plus className="w-5 h-5" />
                        Subir nuevo lote
                    </button>
                </div>

                {/* Upload Form Modal */}
                {showUploadForm && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
                            <h3 className="text-2xl font-bold text-gray-900 mb-6">Subir Nuevo Lote</h3>
                            <form onSubmit={handleUploadSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Nombre del cultivo
                                    </label>
                                    <input
                                        name="name"
                                        type="text"
                                        required
                                        value={newProduct.name}
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                                        placeholder="Ej: Tomates Cherry"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Tipo de cultivo</label>
                                    <input
                                        name="type"
                                        type="text"
                                        required
                                        value={newProduct.type}
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                                        placeholder="Ej: Hortalizas"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Descripción</label>
                                    <textarea
                                        name="description"
                                        required
                                        value={newProduct.description}
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                                        rows={3}
                                        placeholder="Describe tu cultivo..."
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Fecha de siembra</label>
                                    <input
                                        name="plantingDate"
                                        type="date"
                                        required
                                        value={newProduct.plantingDate}
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Prácticas utilizadas
                                    </label>
                                    <input
                                        name="practices"
                                        type="text"
                                        required
                                        value={newProduct.practices}
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                                        placeholder="Ej: Orgánico, Agroecológico (separar con comas)"
                                    />
                                </div>
                                <div className="flex gap-4 pt-4">
                                    <button
                                        type="button"
                                        onClick={() => setShowUploadForm(false)}
                                        className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 transition-colors"
                                    >
                                        Cancelar
                                    </button>
                                    <button
                                        type="submit"
                                        className="flex-1 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                                    >
                                        <Upload className="w-4 h-4" />
                                        Subir
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {/* Products Grid */}
                {products.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {products.map((product) => (
                            <ProductCard key={product.id} product={product} showQR={true} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-600 mb-4">Aún no has subido productos</p>
                        <button
                            onClick={() => setShowUploadForm(true)}
                            className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition-colors"
                        >
                            Subir tu primer lote
                        </button>
                    </div>
                )}
            </main>
        </div>
    );
};

export default PrivateDashboard;
