import { OrderedProducts } from '@app/interfaces/ordered-product.interface';

export interface Order {
    userId: string;
    total: number;
    orderedProducts: OrderedProducts[];
    date: Date;
}

export interface OrderUI {
    total: number;
    orderedProducts: OrderedProducts[];
}
