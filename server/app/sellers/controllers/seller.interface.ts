export type SellerProfile = NewSellerProfile;

export interface NewSellerProfile extends SellerProfileCreation {
    imageUrl: string;
    reviews: Review[];
}

export interface SellerProfileCreation {
    userId: string;
    name: string;
    description: string;
}

export interface Review {
    sellerId: string;
    rating: number;
    title: string;
    review: string;
}
