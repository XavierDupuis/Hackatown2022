import { Product } from '@app/interfaces/product.interface';

export interface Order {
    orderId: string;
    userId: string;
    total: number;
    orderedProduct: Product[];
    date: Date;
}
