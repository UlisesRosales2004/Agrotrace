import type { Product } from "./product";

export interface User {
    id: string;
    name: string;
    email: string;
    location: string;
    image?: string;
    rating: number;
    productsCount: number;
    products?: Product[];
}

export interface RegisterPayload {
    name: string;
    email: string;
    password: string;
    location: string;
    profileImage?: string;
}

export interface UserActivation {
    id: string;
    activated: boolean;
}
