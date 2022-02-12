import { Injectable } from '@angular/core';
import { ProductAddedToCart } from '@app/components/main-page/products/modal-select-product/modal-select-product/modal-select-product.component';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class CartService {
    selectedProducts: ProductAddedToCart[] = [];
    selectedProductsSubject: BehaviorSubject<ProductAddedToCart[]> = new BehaviorSubject<ProductAddedToCart[]>([]);
    constructor() {}

    addProduct(productToAdd: ProductAddedToCart) {
        if (!productToAdd) {
            return;
        }
        this.selectedProducts.push(productToAdd);
        this.selectedProductsSubject.next(this.selectedProducts);
    }

    removeProduct(productToRemove: ProductAddedToCart) {
        if (!productToRemove) {
            return;
        }
        const productIndex = this.selectedProducts.findIndex((product) => {
            return (productToRemove = product);
        });
        if (productIndex === -1) {
            return;
        }
        this.selectedProducts.splice(productIndex, 1);
        this.selectedProductsSubject.next(this.selectedProducts);
    }
}
