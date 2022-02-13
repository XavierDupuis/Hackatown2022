import { OrderedProduct as OrderedProduct } from '@app/interfaces/ordered-product.interface';

export interface Order {
    userId: string;
    total: number;
    orderedProducts: OrderedProduct[];
    date: Date;
}

export interface OrderUI {
    total: number;
    orderedProducts: OrderedProduct[];
}
