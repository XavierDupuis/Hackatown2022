import { Injectable } from '@angular/core';
import { ProductAddedToCart } from '@app/components/main-page/products/modal-select-product/modal-select-product/modal-select-product.component';

@Injectable({
    providedIn: 'root',
})
export class CartService {
    selectedProducts: ProductAddedToCart[] = [];
    constructor() {}

    addProduct(product: ProductAddedToCart) {
        this.selectedProducts.push(product);
    }
}
