import type { Product, ProductUploadDTO } from "../types/product";
import api from "../lib/axios";

export const uploadProduct = async (farmerId: string, productData: ProductUploadDTO): Promise<Product> => {
    const res = await api.post(`/farmers/${farmerId}/products`, productData);
    return res.data;
};

export const getFarmerProducts = async (farmerId: string): Promise<Product[]> => {
    const res = await api.get(`/farmers/${farmerId}/products`);
    return res.data;
};
