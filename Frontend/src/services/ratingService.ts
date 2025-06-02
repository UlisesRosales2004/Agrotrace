import api from "../lib/axios";

export interface Rating {
    id?: number;
    cantidadEstrellas: number;
    lote: {
        id_lote: number;
    };
}

export const getAllRatings = async (): Promise<Rating[]> => {
    const res = await api.get(`/calificaciones`);
    return res.data;
};

export const getRatingById = async (id: number): Promise<Rating> => {
    const res = await api.get(`/calificaciones/${id}`);
    return res.data;
};

export const createRating = async (ratingData: Omit<Rating, 'id'>): Promise<Rating> => {
    const res = await api.post(`/calificaciones`, ratingData);
    return res.data;
};

export const updateRating = async (id: number, ratingData: Omit<Rating, 'id'>): Promise<Rating> => {
    const res = await api.put(`/calificaciones/${id}`, ratingData);
    return res.data;
};

export const deleteRating = async (id: number): Promise<void> => {
    const res = await api.delete(`/calificaciones/${id}`);
    return res.data;
};