import api from "../lib/axios";
import type { RegisterPayload, Usuario } from "../types/user";

export const login = async (email: string, password: string): Promise<Usuario> => {
    const response = await api.post("/agricultores/login", {
        email,
        contrasenia: password
    });

    console.log(response)
    return response.data;
};

export const register = async (data: RegisterPayload): Promise<Usuario> => {
    const payload = {
        ...data,
        fechaRegistro: data.fechaRegistro || new Date().toISOString().split('T')[0]
    };
    const response = await api.post("/agricultores/registro", payload);
    return response.data;
};