import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
// eslint-disable-next-line max-len
import { ModalSelectProductComponent } from '@app/components/main-page/products/modal-select-product/modal-select-product/modal-select-product.component';
import { SellerService } from '@app/components/pages/seller/seller.service';
import { Product, ProductAddedToCart } from '@app/interfaces/product.interface';
import { CartService } from '@app/services/cart-service/cart.service';
interface SellerId {
    sellerId: string;
}
@Component({
    selector: 'app-product-card',
    templateUrl: './product-card.component.html',
    styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent implements OnInit {
    @Input() product!: Product;

    constructor(public dialog: MatDialog, private cartService: CartService, private router: Router, private sellerService: SellerService) {}

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

    goToSellerPage() {
        const sellerUserId = this.product.sellerId;
        if (sellerUserId === undefined) {
            return;
        }
        const sellerId$ = this.sellerService.getSellerIdFromUserId(sellerUserId);
        sellerId$.subscribe((obj) => {
            const { sellerId } = obj as SellerId;
            this.router.navigate([`/seller/${sellerId}`]);
        });
    }
}
