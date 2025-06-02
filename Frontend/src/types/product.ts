import type { Rating } from "./rating";

export interface Product {
    id_lote: number;
    nombre: string;
    tipoCultivo: string;
    descripcion: string;
    fechaSiembre: string;
    fechaCosecha: string;
    practicasUtilizadas: string;
    urlFirmado: string;
    qrImageUrl?: string;
    fechaCarga: string;
    fechaExpiracion: string;
    certificaciones: string[];
    calificaciones?: Rating[];
    agricultor: {
        id_agrigultor: number;
        nombre?: string;
        ubicacion?: string;
    };
    promedioCalificaciones?: number;
    price?: string;
    priceUnit?: string;
}

export interface ProductUploadDTO {
    nombre: string;
    tipoCultivo: string;
    descripcion: string;
    fechaSiembre: string;
    fechaCosecha?: string; 
    practicasUtilizadas: string;
    urlFirmado?: string;
    qrImageUrl?: string;
    fechaCarga?: string;
    fechaExpiracion?: string;
    certificaciones: string[];
    agricultor: {
        id_agrigultor: number;
    };
}
