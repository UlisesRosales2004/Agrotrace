import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import type { Farmer } from "../types/farmer";
import { register } from "../services/authService";
import { AxiosError } from "axios";

interface RegisterViewProps {
    onBack: () => void;
    onRegisterSuccess: (user: Farmer) => void;
}

const RegisterView: React.FC<RegisterViewProps> = ({ onBack, onRegisterSuccess }) => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        location: "",
        profileImage: "",
    });

    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            const { user } = await register(formData);
            const farmer: Farmer = {
                ...user,
                location: user.location || formData.location,
                rating: user.rating || 0,
                productsCount: user.productsCount || 0,
                image: user.image || formData.profileImage || undefined,
            };
            onRegisterSuccess(farmer);
        } catch (err: unknown) {
            const error = err as AxiosError<{ message: string }>;
            console.error(error);
            setError(error.response?.data?.message || "Error al registrar");
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center py-8">
            <div className="max-w-md w-full space-y-8 p-8">
                <div className="text-center">
                    <button onClick={onBack} className="flex items-center text-green-600 hover:text-green-700 mb-4">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Volver
                    </button>
                    <h2 className="text-3xl font-bold text-gray-900">Crear Cuenta</h2>
                    <p className="mt-2 text-gray-600">Únete como agricultor</p>
                </div>

                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        {(["name", "email", "password", "location", "profileImage"] as const).map((field) => (
                            <div key={field}>
                                <label htmlFor={field} className="block text-sm font-medium text-gray-700">
                                    {field === "profileImage"
                                        ? "Foto de perfil (opcional)"
                                        : field.charAt(0).toUpperCase() + field.slice(1)}
                                </label>
                                <input
                                    id={field}
                                    name={field}
                                    type={field === "password" ? "password" : field === "email" ? "email" : "text"}
                                    required={field !== "profileImage"}
                                    value={formData[field]}
                                    onChange={handleChange}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                                    placeholder={field === "profileImage" ? "URL de la imagen" : ""}
                                />
                            </div>
                        ))}
                    </div>

                    {error && <p className="text-red-600 text-sm">{error}</p>}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors"
                    >
                        {loading ? "Creando cuenta..." : "Crear cuenta"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default RegisterView;
