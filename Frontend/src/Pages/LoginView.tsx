import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { login as loginRequest } from "../services/authService";
import { useUser } from "../context/UserContext";

interface LoginViewProps {
    onBack: () => void;
    onRegister: () => void;
    onLoginSuccess: () => void; // Ya no necesita el user como parámetro
}

const LoginView: React.FC<LoginViewProps> = ({ onBack, onRegister, onLoginSuccess }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useUser();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const { user } = await loginRequest(email, password);
            login(user); // Guarda el user en el context
            onLoginSuccess(); // Solo notifica que el login fue exitoso
        } catch (err) {
            console.error("Error de login", err);
            alert("Credenciales incorrectas");
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="max-w-md w-full space-y-8 p-8">
                <div className="text-center">
                    <button onClick={onBack} className="flex items-center text-green-600 hover:text-green-700 mb-4">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Volver
                    </button>
                    <h2 className="text-3xl font-bold text-gray-900">Iniciar Sesión</h2>
                    <p className="mt-2 text-gray-600">Accede a tu cuenta de agricultor</p>
                </div>

                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
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
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                                placeholder="••••••••"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors"
                    >
                        Ingresar
                    </button>

                    <div className="text-center">
                        <button type="button" onClick={onRegister} className="text-green-600 hover:text-green-700">
                            ¿No tenés cuenta? Crear agricultor
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginView;
