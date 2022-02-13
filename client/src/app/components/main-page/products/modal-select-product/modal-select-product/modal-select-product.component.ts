import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductAddedToCart } from '@app/interfaces/product.interface';

@Component({
    selector: 'app-modal-select-product',
    templateUrl: './modal-select-product.component.html',
    styleUrls: ['./modal-select-product.component.scss'],
})
export class ModalSelectProductComponent implements OnInit {
    constructor(
        public dialogRef: MatDialogRef<ModalSelectProductComponent>,
        @Inject(MAT_DIALOG_DATA) public productAddedToCart: ProductAddedToCart,
    ) {}

    onNoClick(): void {
        this.dialogRef.close();
    }

    isQuantityValid() {
        if (!this.productAddedToCart.quantity) {
            return false;
        }
        return this.productAddedToCart.quantity <= this.productAddedToCart.product.quantityLeft;
    }

    ngOnInit(): void {}
}
