import type { Farmer } from "../types/farmer";


export const fetchFarmers = async (): Promise<Farmer[]> => {
    const response = await fetch("/api/farmers");
    if (!response.ok) throw new Error("Error al obtener los agricultores");
    return response.json();
};
