/* eslint-disable no-underscore-dangle */
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NewSellerService } from '@app/components/pages/seller/new-seller.service';

const NOT_ALL_WHITE_SPACE_RGX = new RegExp('.*[^ ].*');

@Component({
    selector: 'app-new-seller',
    templateUrl: './new-seller.component.html',
    styleUrls: ['./new-seller.component.scss'],
})
export class NewSellerComponent {
    newSellerFrom = new FormGroup({
        name: new FormControl('', [Validators.required, Validators.pattern(NOT_ALL_WHITE_SPACE_RGX)]),
        description: new FormControl('', [Validators.required, Validators.pattern(NOT_ALL_WHITE_SPACE_RGX)]),
    });

    get name() {
        return this.newSellerFrom.value.name;
    }

    get description() {
        return this.newSellerFrom.value.description;
    }
    constructor(private newSellerService: NewSellerService, private dialogRef: MatDialogRef<NewSellerComponent>, private _snackBar: MatSnackBar) {}

    create() {
        this.newSellerService.create({ name: this.newSellerFrom.value.name, description: this.newSellerFrom.value.description });
        this.dialogRef.close();
        this._snackBar.open('Page Modified!', 'Dismiss', { duration: 2500 });
    }
}
