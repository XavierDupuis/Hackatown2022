import { Product } from '@app/product-service/product.interface';

export interface SellerProfile {
    _id: string;
    reviews: Review[];
    availableProducts: Product[];
    name: string;
    description: string;
    productsHistory: Product[];
    imageUrl: string;
}

export interface Review {
    sellerId: string;
    rating: number;
    title: string;
    review: string;
}

// export interface Product {

// }
