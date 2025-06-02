import api from "../lib/axios";
import type { Product } from "../types/product";
import type { Usuario } from "../types/user";


export const getFarmers = async (): Promise<Usuario[]> => {
    try {
        const response = await api.get('/agricultores');
        return response.data;
    } catch (error) {
        console.error('Error fetching farmers:', error);
        throw error;
    }
};

export const getFarmerById = async (id: number): Promise<Usuario> => {
    try {
        const response = await api.get(`/agricultores/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching farmer ${id}:`, error);
        throw error;
    }
};

export const getProductsByFarmerId = async (farmerId: number): Promise<Product[]> => {
    try {
        const response = await api.get(`/agricultores/${farmerId}/productos`)
        return response.data;
    } catch (error) {
        console.error(`Error fetching products for farmer ${farmerId}:`, error);
        throw error;
    }
};