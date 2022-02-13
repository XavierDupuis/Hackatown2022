import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CartModalComponent } from '@app/components/main-page/cart/cart-modal/cart-modal.component';
import { CartService } from '@app/services/cart-service/cart.service';

@Component({
    selector: 'app-header-bar',
    templateUrl: './header-bar.component.html',
    styleUrls: ['./header-bar.component.scss'],
})
export class HeaderBarComponent implements OnInit {
    @Input() title!: string;

    constructor(private cartService: CartService, public dialog: MatDialog) {
        this.cartService.selectedProductsSubject.subscribe((selectedProducts) => {
            const didCartBecomeEmpty = selectedProducts.length === 0;
            if (didCartBecomeEmpty) {
                this.closeCart();
            }
        })
    }

    get numberOfItemsInCart() {
        return this.cartService.selectedProducts.length;
    }

    ngOnInit(): void {}

    openCart() {
        this.dialog.open(CartModalComponent, {
            width: '80%',
            height: '60%',
        });
    }

    closeCart() {
        this.dialog.closeAll();
    }
}
