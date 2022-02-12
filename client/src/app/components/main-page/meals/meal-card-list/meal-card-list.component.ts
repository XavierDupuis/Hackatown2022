import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-meal-card-list',
    templateUrl: './meal-card-list.component.html',
    styleUrls: ['./meal-card-list.component.scss'],
})
export class MealCardListComponent implements OnInit {
    meals = [0, 1, 2, 3, 4, 5];

    constructor() {}

    ngOnInit(): void {}
}
