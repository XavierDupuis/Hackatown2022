import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '@app/services/cart-service/cart.service';

@Component({
    selector: 'app-header-bar',
    templateUrl: './header-bar.component.html',
    styleUrls: ['./header-bar.component.scss'],
})
export class HeaderBarComponent implements OnInit {
    @Input() title!: string;
    @Input() theme: string;
    @Output() themeChange = new EventEmitter<string>();

    constructor(private cartService: CartService, private router: Router) {
        this.viewSecond();
    }

    get numberOfItemsInCart() {
        return this.cartService.numberOfItemsInCart;
    }

    toggleTheme() {
        this.theme = this.isCurrentThemeDark() ? 'light-theme' : 'dark-theme';
    }

    isCurrentThemeDark() {
        return this.theme === 'dark-theme';
    }

    ngOnInit(): void {}

    viewSecond() {
        console.log('asdsad');
        this.router.navigate(['Second']);
    }
}
