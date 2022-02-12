import { Component, OnInit } from '@angular/core';
import { ProductAddedToCart } from '@app/components/main-page/products/modal-select-product/modal-select-product/modal-select-product.component';
import { CartService } from '@app/services/cart-service/cart.service';

@Component({
    selector: 'app-cart-modal',
    templateUrl: './cart-modal.component.html',
    styleUrls: ['./cart-modal.component.scss'],
})
export class CartModalComponent implements OnInit {
    displayedColumns: string[];
    columns = [
        {
            columnDef: 'name',
            header: 'Name',
            footer: 'Total',
            cell: (cartProduct: ProductAddedToCart) => `${cartProduct.product.name}`,
        },
        {
            columnDef: 'price',
            header: 'Unit Price',
            cell: (cartProduct: ProductAddedToCart) => `${cartProduct.product.price}`,
        },
        {
            columnDef: 'quantity',
            header: 'Quantity',
            cell: (cartProduct: ProductAddedToCart) => `${cartProduct.quantity}`,
        },
        {
            columnDef: 'subtotal',
            header: 'Sub Total',
            cell: (cartProduct: ProductAddedToCart) => `${(cartProduct.quantity * cartProduct.product.price) / 100}`,
        },
    ];

    constructor(private cartService: CartService) {
        this.displayedColumns = this.columns.map((c) => c.columnDef);
    }

    get cartProducts() {
        return this.cartService.selectedProducts;
    }

    areThereProductsInCart() {
        return this.cartService.selectedProducts.length > 0;
    }

    get totalCost() {
        return this.cartProducts.map((p) => [p.quantity, p.product.price]).reduce((acc, [q, p]) => acc + q * p, 0) / 100;
    }

    ngOnInit(): void {}
}
