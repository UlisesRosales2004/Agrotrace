import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { register } from "../services/authService";
import { AxiosError } from "axios";
import type { RegisterPayload, Usuario } from "../types/user";

interface RegisterViewProps {
    onBack: () => void;
    onRegisterSuccess: (user: Usuario) => void;
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
            const payload: RegisterPayload = {
                nombre: formData.name,
                email: formData.email,
                contrasenia: formData.password,
                ubicacion: formData.location,
                fotoPerfilUrl: formData.profileImage || undefined,
            };

            const response = await register(payload);
            console.log("Response from register:", response); // Debug log

        

            // Verificar que user no sea undefined
            if (!response) {
                throw new Error("No se recibió información del usuario del servidor");
            }
            const user = response

            const defaultAvatar = `https://cdn-icons-png.flaticon.com/512/149/149071.png`;

            const farmer: Usuario = {
                id_agrigultor: user.id_agrigultor || user.id_agrigultor,
                nombre: user.nombre || formData.name,
                email: user.email || formData.email,
                ubicacion: user.ubicacion || formData.location,
                calificacionPromedio: user.calificacionPromedio || 0,
                fotoPerfilUrl: user.fotoPerfilUrl || formData.profileImage || defaultAvatar,
                fechaRegistro: user.fechaRegistro || new Date().toISOString(),
                lotes: user.lotes || [],
                // Agregar propiedades que puedan faltar
                contrasenia: user.contrasenia || "", // Si es necesario
            };

            onRegisterSuccess(farmer);
        } catch (err: unknown) {
            console.error("Registration error:", err); // Debug log

            const error = err as AxiosError<{ message: string }>;

            // Manejo más específico del error
            if (error.response?.data?.message) {
                setError(error.response.data.message);
            } else if (error.message) {
                setError(error.message);
            } else {
                setError("Error al registrar. Intenta nuevamente.");
            }
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
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                Nombre
                            </label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                required
                                value={formData.name}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                            />
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                value={formData.email}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Contraseña
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                value={formData.password}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                            />
                        </div>

                        <div>
                            <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                                Ubicación
                            </label>
                            <input
                                id="location"
                                name="location"
                                type="text"
                                required
                                value={formData.location}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                            />
                        </div>

                        <div>
                            <label htmlFor="profileImage" className="block text-sm font-medium text-gray-700">
                                Foto de perfil (opcional)
                            </label>
                            <input
                                id="profileImage"
                                name="profileImage"
                                type="text"
                                value={formData.profileImage}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                                placeholder="URL de la imagen"
                            />
                        </div>
                    </div>

                    {error && <p className="text-red-600 text-sm">{error}</p>}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors disabled:opacity-50"
                    >
                        {loading ? "Creando cuenta..." : "Crear cuenta"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default RegisterView;