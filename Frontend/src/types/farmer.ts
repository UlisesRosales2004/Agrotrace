import type { Product } from "./product";
import type { User } from "./user";

export interface Farmer extends User {
    location: string;
    image?: string;
    rating: number;
    productsCount: number;
    products?: Product[];
}
