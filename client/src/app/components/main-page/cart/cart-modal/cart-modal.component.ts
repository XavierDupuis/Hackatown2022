import { Component } from '@angular/core';
import { ProductAddedToCart } from '@app/interfaces/product.interface';
import { CartService } from '@app/services/cart-service/cart.service';

@Component({
    selector: 'app-cart-modal',
    templateUrl: './cart-modal.component.html',
    styleUrls: ['./cart-modal.component.scss'],
})
export class CartModalComponent {
    displayedColumns = ['name', 'price', 'quantity', 'subtotal', 'remove'];

    constructor(private cartService: CartService) {}

    get cartProducts() {
        return this.cartService.selectedProductsSubject;
    }

    areThereProductsInCart() {
        return this.cartService.selectedProducts.length > 0;
    }

    get totalCost() {
        return this.cartProducts
            .getValue()
            .map((p) => [p.quantity, p.product.price])
            .reduce((acc, [q, p]) => acc + q * p, 0);
    }

    removeProductFromCart(product: ProductAddedToCart) {
        this.cartService.removeProduct(product);
    }

    confirmOrder() {
        this.cartService.addOrder(this.cartProducts.value, this.totalCost);
    }
}
