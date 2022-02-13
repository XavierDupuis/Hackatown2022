import { ObjectId } from 'mongodb';

export interface ProductUI {
    id?: ObjectId;
    name: string;
    description: string;
    quantityInitial: number;
    quantityLeft: number;
    price: number;
    imageURL: string;
    maxPickupDate: Date;
    productionDate: Date;
}

export interface Product extends ProductUI {
    sellerId: string;
}
