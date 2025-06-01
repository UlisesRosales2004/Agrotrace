import { ArrowLeft } from "lucide-react";
import { useState } from "react";

const RegisterView = ({ onBack, onRegisterSuccess }) => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        location: "",
        profileImage: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simular registro exitoso
        onRegisterSuccess(formData);
    };

    const handleChange = (e) => {
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
                                Nombre completo
                            </label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                required
                                value={formData.name}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                                placeholder="Tu nombre completo"
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
                                placeholder="tu@email.com"
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
                                placeholder="••••••••"
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
                                placeholder="Ciudad, Provincia"
                            />
                        </div>
                        <div>
                            <label htmlFor="profileImage" className="block text-sm font-medium text-gray-700">
                                Foto de perfil (opcional)
                            </label>
                            <input
                                id="profileImage"
                                name="profileImage"
                                type="url"
                                value={formData.profileImage}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                                placeholder="URL de la imagen"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors"
                    >
                        Crear cuenta
                    </button>
                </form>
            </div>
        </div>
    );
};

export default RegisterView;
