import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
// eslint-disable-next-line max-len
import {
    ModalSelectProductComponent,
    ProductAddedToCart
} from '@app/components/main-page/products/modal-select-product/modal-select-product/modal-select-product.component';
import { Product } from '@app/interfaces/product.interface';
import { CartService } from '@app/services/cart-service/cart.service';

@Component({
    selector: 'app-product-card',
    templateUrl: './product-card.component.html',
    styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent implements OnInit {
    @Input() product!: Product;

    constructor(public dialog: MatDialog, private cartService: CartService) {}

    openProductSelectionDialog(): void {
        const dialogRef = this.dialog.open(ModalSelectProductComponent, {
            // width: '80%',
            data: { quantity: 1, product: this.product },
        });

        dialogRef.afterClosed().subscribe((product: ProductAddedToCart) => {
            this.cartService.addProduct(product);
        });
    }

    ngOnInit(): void {}
}
