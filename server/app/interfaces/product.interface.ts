export interface Product {
    id: string;
    name: string;
    description: string;
    quantityInitial: number;
    quantityLeft: number;
    price: number;
    imageURL: string;
    maxPickupDate: Date;
}
