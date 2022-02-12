export interface SellerProfile {
    // TODO make Review[]
    reviews: Review[];
    // TODO make Product[]
    availableProducts: string[];
    name: string;
    description: string;
    // TODO make Product[]
    productsHistory: string[];
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
