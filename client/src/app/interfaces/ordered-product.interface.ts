import { Product } from '@app/interfaces/product.interface';

export interface OrderedProduct {
    pickUpDate: Date;
    product: Product;
}
