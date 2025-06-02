

import { Package, Plus, Upload } from "lucide-react";
import ProductCard from "../components/ProductCard";
import { useEffect, useState } from "react";
import type { Product, ProductUploadDTO } from "../types/product";
import { getFarmerProducts, createProduct } from "../services/productService";
import { useUser } from "../context/UserContext";

interface PrivateDashboardProps {
    onLogout: () => void;
}

const PrivateDashboard: React.FC<PrivateDashboardProps> = ({ onLogout }) => {
    const { user: farmer } = useUser();
    const [showUploadForm, setShowUploadForm] = useState(false);
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true); // Agregar estado de loading
    const [error, setError] = useState<string | null>(null); // Agregar estado de error

    // Estado del formulario
    const [newProduct, setNewProduct] = useState({
        name: "",
        type: "",
        description: "",
        plantingDate: "",
        harvestDate: "",
        practices: ""
    });

    useEffect(() => {
        const fetchProducts = async () => {
            if (!farmer?.id_agrigultor) {
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                setError(null);

                console.log('Fetching products for farmer:', farmer.id_agrigultor);
                const fetched = await getFarmerProducts(farmer.id_agrigultor);

                console.log('Productos obtenidos:', fetched);
                setProducts(fetched);

            } catch (error) {
                console.error("Error al obtener productos:", error);
                setError("Error al cargar los productos. Por favor, intenta de nuevo.");
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [farmer?.id_agrigultor]); // Más específico en la dependencia

    const handleUploadSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!farmer?.id_agrigultor) return;

        const certifications = newProduct.practices
            ? newProduct.practices.split(",").map((p) => p.trim()).filter(p => p.length > 0)
            : [];

        try {
            const payload: ProductUploadDTO = {
                nombre: newProduct.name,
                tipoCultivo: newProduct.type,
                descripcion: newProduct.description,
                fechaSiembre: newProduct.plantingDate,
                fechaCosecha: newProduct.harvestDate || "",
                practicasUtilizadas: newProduct.practices || "",
                certificaciones: certifications,
                agricultor: {
                    id_agrigultor: farmer.id_agrigultor
                }
            };

            const createdProduct = await createProduct(payload);
            setProducts((prev) => [...prev, createdProduct]);

            // Reset form
            setNewProduct({
                name: "",
                type: "",
                description: "",
                plantingDate: "",
                harvestDate: "",
                practices: ""
            });

            setShowUploadForm(false);
        } catch (err) {
            console.error("Error al subir producto:", err);
            setError("Error al subir el producto. Por favor, intenta de nuevo.");
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
    };

    // Si no hay farmer logueado, mostrar loading
    if (!farmer) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
                    <p>Cargando...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <h1 className="text-2xl font-bold text-green-600">AgroTrace - Dashboard</h1>
                        <div className="flex items-center gap-4">
                            <span className="text-gray-700">
                                Hola, {farmer.nombre} (ID: {farmer.id_agrigultor})
                            </span>
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

                {/* Error Message */}
                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
                        {error}
                        <button
                            onClick={() => setError(null)}
                            className="float-right text-red-700 hover:text-red-900"
                        >
                            ×
                        </button>
                    </div>
                )}

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
                                    <label className="block text-sm font-medium text-gray-700">Fecha de cosecha</label>
                                    <input
                                        name="harvestDate"
                                        type="date"
                                        value={newProduct.harvestDate}
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

                {/* Loading State */}
                {loading ? (
                    <div className="text-center py-12">
                        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-600 mx-auto mb-4"></div>
                        <p className="text-gray-600">Cargando tus productos...</p>
                    </div>
                ) : (
                    /* Products Grid */
                    products.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {products.map((product) => (
                                <ProductCard key={product.id_lote} product={product} showQR={true} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                            <p className="text-gray-600 mb-4">
                                Aún no has subido productos para tu cuenta (ID: {farmer.id_agrigultor})
                            </p>
                            <button
                                onClick={() => setShowUploadForm(true)}
                                className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition-colors"
                            >
                                Subir tu primer lote
                            </button>
                        </div>
                    )
                )}
            </main>
        </div>
    );
};

export default PrivateDashboard;