import { Component, Input, OnInit } from '@angular/core';
import { Product } from '@app/components/main-page/products/product-card/product.interface';

@Component({
    selector: 'app-product-card',
    templateUrl: './product-card.component.html',
    styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent implements OnInit {
    @Input() product!: Product;
    constructor() {}

    ngOnInit(): void {}
}
