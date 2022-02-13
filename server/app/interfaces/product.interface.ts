import { ObjectId } from 'mongodb';

export interface Product {
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

// export interface ProductDB extends Product {
//     id: string;
// }
