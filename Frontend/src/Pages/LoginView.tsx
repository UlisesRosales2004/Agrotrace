import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { login as loginRequest } from "../services/authService";
import { useUser } from "../context/UserContext";
import type { Usuario } from "../types/user";

interface LoginViewProps {
    onBack: () => void;
    onRegister: () => void;
    onLoginSuccess: (user: Usuario) => void;
}

const LoginView: React.FC<LoginViewProps> = ({ onBack, onRegister, onLoginSuccess }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useUser();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        console.log("🔍 INICIO - Iniciando proceso de login");
        console.log("📧 Email:", email);

        setIsLoading(true);

        try {
            console.log("🌐 PASO 1 - Enviando request al servidor...");
            const response = await loginRequest(email, password);
            console.log("✅ PASO 2 - Respuesta del servidor:", response);

            // El servidor devuelve el usuario directamente, no en { user: ... }
            const user = response;
            console.log("👤 PASO 3 - Usuario extraído:", user);
            console.log("👤 PASO 3.1 - Tipo de usuario:", typeof user);
            console.log("👤 PASO 3.2 - Usuario es undefined?", user === undefined);
            console.log("👤 PASO 3.3 - Usuario es null?", user === null);

            if (!user) {
                console.error("❌ ERROR - Usuario es null o undefined");
                alert("Error: No se recibió información del usuario");
                setIsLoading(false);
                return;
            }

            console.log("🔄 PASO 4 - Guardando en contexto...");
            login(user);
            console.log("✅ PASO 5 - Usuario guardado en contexto");

            console.log("🚀 PASO 6 - Llamando onLoginSuccess...");
            console.log("🚀 PASO 6.1 - Función onLoginSuccess existe?", typeof onLoginSuccess === 'function');

            onLoginSuccess(user);
            console.log("✅ PASO 7 - onLoginSuccess ejecutado");

        } catch (err) {
            console.error("💥 ERROR en login:", err);
            console.error("💥 ERROR tipo:", typeof err);
            console.error("💥 ERROR mensaje:", err instanceof Error ? err.message : 'Error desconocido');
            alert("Credenciales incorrectas o error de conexión");
        } finally {
            console.log("🏁 FINAL - Desactivando loading");
            setIsLoading(false);
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
                                disabled={isLoading}
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
                                disabled={isLoading}
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading ? "Ingresando..." : "Ingresar"}
                    </button>

                    <div className="text-center">
                        <button type="button" onClick={onRegister} disabled={isLoading} className="text-green-600 hover:text-green-700 disabled:opacity-50">
                            ¿No tenés cuenta? Crear agricultor
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginView;