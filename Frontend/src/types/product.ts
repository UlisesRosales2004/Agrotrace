export interface Product {
    id: string;
    name: string;
    harvestDate: string;
    certifications: string[];
    rating: number;
    signedUrl: string;
    price: string;
    priceUnit: string;
}

export interface ProductUploadDTO {
    name: string;
    type: string;
    description: string;
    plantingDate: string;
    certifications: string[];
}
