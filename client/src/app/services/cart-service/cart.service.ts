import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OrderUI } from '@app/interfaces/order.interface';
import { OrderedProduct } from '@app/interfaces/ordered-product.interface';
import { ProductAddedToCart } from '@app/interfaces/product.interface';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class CartService {
    selectedProducts: ProductAddedToCart[] = [];
    selectedProductsSubject: BehaviorSubject<ProductAddedToCart[]> = new BehaviorSubject<ProductAddedToCart[]>([]);
    constructor(private http: HttpClient) {}

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

    resetCart() {
        this.selectedProducts = [];
        this.selectedProductsSubject.next(this.selectedProducts);
    }

    addOrder(products: ProductAddedToCart[], totalCost: number) {
        const orderedProducts: OrderedProduct[] = products.map((p) => {
            return { pickUpDate: new Date(Date.now()), productId: p.product._id as string, quantity: p.quantity }
        })
        const newOrder: OrderUI = { orderedProducts: orderedProducts, total: totalCost };

        this.http.post(`${environment.serverURL}/orders`, newOrder, { responseType: 'text' }).subscribe(
            (res) => {
                const isOrderOk = res === 'OK';
                if (isOrderOk) {
                    this.resetCart()
                }
            }
        );
    }
}
