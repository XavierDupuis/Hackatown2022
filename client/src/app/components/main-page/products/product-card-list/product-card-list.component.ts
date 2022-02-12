import { Component, OnInit } from '@angular/core';
import { Product } from '@app/components/main-page/products/product-card/product.interface';

@Component({
    selector: 'app-product-card-list',
    templateUrl: './product-card-list.component.html',
    styleUrls: ['./product-card-list.component.scss'],
})
export class ProductCardListComponent implements OnInit {
    products: Product[] = [
        {
            name: 'MEAL NAME 1',
            description: 'Description du produit, peut être longue ou moins longue, mais elle sera longue pour tester css',
            maxPickupDate: new Date('15-12-2022'),
            imageURL: 'https://hips.hearstapps.com/hmg-prod/images/homemade-spaghetti-sauce-horizontal-1530890913.jpg',
            price: 1.0,
            qtyLeft: 29,
        },
        {
            name: 'MEAL NAME 2',
            description: 'Description du produit, peut être longue ou moins longue, mais elle sera longue pour tester css',
            maxPickupDate: new Date('16-12-2022'),
            imageURL: 'https://hips.hearstapps.com/del.h-cdn.co/assets/16/19/1462829771-sunshine-daydream.jpg',
            price: 2.0,
            qtyLeft: 72,
        },
        {
            name: 'MEAL NAME 3',
            description: 'Description du produit, peut être longue ou moins longue, mais elle sera longue pour tester css',
            maxPickupDate: new Date('17-12-2022'),
            imageURL: 'https://www.culturesforhealth.com/learn/wp-content/uploads/2016/04/Basic-Fruit-Smoothie-Recipe_header-1200x675.jpg',
            price: 3.0,
            qtyLeft: 12,
        },
        {
            name: 'MEAL NAME 4',
            description: 'Description du produit, peut être longue ou moins longue, mais elle sera longue pour tester css',
            maxPickupDate: new Date('18-12-2022'),
            imageURL: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/meal-prep-index-1566932947.png',
            price: 4.0,
            qtyLeft: 22,
        },
    ];

    constructor() {}

    ngOnInit(): void {}
}
