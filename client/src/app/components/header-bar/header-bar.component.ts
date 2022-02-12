import { Component, Input, OnInit } from '@angular/core';
import { CartService } from '@app/services/cart-service/cart.service';

@Component({
    selector: 'app-header-bar',
    templateUrl: './header-bar.component.html',
    styleUrls: ['./header-bar.component.scss'],
})
export class HeaderBarComponent implements OnInit {
    @Input() title!: string;

    constructor(private cartService: CartService) {}

    get numberOfItemsInCart() {
        return this.cartService.numberOfItemsInCart;
    }

    ngOnInit(): void {}
}
