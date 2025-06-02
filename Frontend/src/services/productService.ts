import type { Product, ProductUploadDTO } from "../types/product";
import api from "../lib/axios";

export const createProduct = async (productData: ProductUploadDTO): Promise<Product> => {
    try {
        const response = await api.post('/lotes', productData);
        return response.data;
    } catch (error) {
        console.error('Error creating product:', error);
        throw error;
    }
};

export const updateProduct = async (productData: ProductUploadDTO, id: string): Promise<Product> => {
    const res = await api.put(`/lotes/${id}`, productData);
    return res.data;
};

export const deleteProduct = async (id: number): Promise<Product> => {
    const res = await api.delete(`/lotes/${id}`);
    return res.data;
};

export const getFarmerProducts = async (agricultor_id: number): Promise<Product[]> => {
    try {
        // 1. Obtener todos los lotes
        const response = await api.get('/lotes');
        const allLotes = response.data;

        console.log('Todos los lotes obtenidos:', allLotes);

        // 2. Filtrar solo los lotes que pertenecen al agricultor logueado
        const farmerLotes = allLotes.filter((lote: any) => {
            // Aquí necesitas ajustar el nombre del campo según tu estructura de datos
            // Posibles nombres de campos:
            return lote.agricultor_id === agricultor_id ||
                lote.id_agricultor === agricultor_id ||
                lote.agrigultor_id === agricultor_id || // Por si hay typo como en tu código
                lote.agricultor?.id_agrigultor === agricultor_id; // Si es un objeto anidado
        });

        console.log(`Lotes filtrados para agricultor ${agricultor_id}:`, farmerLotes);

        return farmerLotes;

    } catch (error) {
        console.error(`Error fetching products for farmer ${agricultor_id}:`, error);
        throw error;
    }
};