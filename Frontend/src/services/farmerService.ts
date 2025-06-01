import api from "../lib/axios";
import type { Farmer } from "../types/farmer";
import type { Product } from "../types/product";

export const getFarmers = async (): Promise<Farmer[]> => {
    const response = await api.get(`/farmers`);
    return response.data;
};

export const getFarmerById = async (id: string): Promise<Farmer> => {
    const response = await api.get(`/farmers/${id}`);
    return response.data;
};

export const getProductsByFarmerId = async (farmerId: string): Promise<Product[]> => {
    const response = await api.get(`/farmers/${farmerId}/products`);
    return response.data;
}
