import api from "../lib/axios";
import type { RegisterPayload, User } from "../types/user";

export const login = async (email: string, password: string): Promise<{ user: User }> => {
    const res = await api.post("/auth/login", { email, password });
    return res.data;
};

export const register = async (data: RegisterPayload): Promise<{ user: User }> => {
    const response = await api.post("/auth/register", data);
    return response.data;
};
