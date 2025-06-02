import type { Product } from "./product";

export interface Usuario {
    id_agrigultor: number;
    nombre: string;
    email: string;
    ubicacion: string;
    fotoPerfilUrl?: string;
    fechaRegistro: string;
    calificacionPromedio?: number;
    lotes?: Product[];
    productsCount?: number;
    contrasenia: string
}

export interface RegisterPayload {
    nombre: string;
    email: string;
    contrasenia: string;
    ubicacion: string;
    fotoPerfilUrl?: string;
    fechaRegistro?: string;
}

export interface UserActivation {
    id_agrigultor: number;
    activated: boolean;
}
