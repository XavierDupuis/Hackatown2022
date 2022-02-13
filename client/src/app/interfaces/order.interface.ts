import { Product } from '@app/interfaces/product.interface';

export interface Order {
    userId: string;
    total: number;
    orderedProduct: Product[];
    date: Date;
}

export interface OrderUI {
    userId: string;
    total: number;
    orderedProduct: Product[];
}
