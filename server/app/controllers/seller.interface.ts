export interface SellerProfile {
    _id: string;
    name: string;
    description: string;
    imageUrl: string;
    reviews: Review[];
}

export interface Review {
    sellerId: string;
    rating: number;
    title: string;
    review: string;
}
