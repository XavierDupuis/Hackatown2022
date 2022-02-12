import { Component, OnInit } from '@angular/core';
import { Product } from '@app/components/main-page/products/product-card/product.interface';
import { ProductService } from '@app/services/product-service/product.service';

@Component({
    selector: 'app-product-card-list',
    templateUrl: './product-card-list.component.html',
    styleUrls: ['./product-card-list.component.scss'],
})
export class ProductCardListComponent implements OnInit {
    products: Product[];

    constructor(private productService: ProductService) {
        this.productService.requestProductList().subscribe((result) => {
            const newProducts = result as Product[];
            this.products = newProducts;
        });
    }

    ngOnInit(): void {}
}
