import { OrderedProduct } from '@app/interfaces/ordered-product.interface';

export interface Order {
    userId: string;
    total: number;
    orderedProduct: OrderedProduct[];
    date: Date;
}

export interface OrderUI {
    userId: string;
    total: number;
    orderedProduct: OrderedProduct[];
}
