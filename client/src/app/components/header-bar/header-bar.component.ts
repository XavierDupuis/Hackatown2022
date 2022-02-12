import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CartModalComponent } from '@app/components/main-page/cart/cart-modal/cart-modal.component';
import { Product } from '@app/components/main-page/products/product-card/product.interface';
import { CartService } from '@app/services/cart-service/cart.service';
import { ProductService } from '@app/services/product-service/product.service';

@Component({
    selector: 'app-header-bar',
    templateUrl: './header-bar.component.html',
    styleUrls: ['./header-bar.component.scss'],
})
export class HeaderBarComponent implements OnInit {
    @Input() title!: string;

    constructor(private cartService: CartService, public dialog: MatDialog, private productService: ProductService) {}

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

    name = 1;
    testAddProduct() {
        const testProduct: Product = {
            name: 'testName' + this.name++,
            description: 'testDescription',
            quantityInitial: 5,
            quantityLeft: 3,
            price: 200,
            imageURL: 'https://hips.hearstapps.com/hmg-prod/images/homemade-spaghetti-sauce-horizontal-1530890913.jpg',
            maxPickupDate: new Date('2019-01-16'),
        };
        this.productService.addProduct(testProduct).subscribe();
    }
}
