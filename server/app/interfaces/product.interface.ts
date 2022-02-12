export interface Product {
    name: string;
    description: string;
    quantityInitial: number;
    quantityLeft: number;
    price: number;
    imageURL: string;
    maxPickupDate: Date;
}
