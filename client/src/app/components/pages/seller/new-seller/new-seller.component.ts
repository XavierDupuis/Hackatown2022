import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Seller } from '@app/auth/services/seller.interface';
import { NewSellerService } from '@app/components/pages/seller/new-seller.service';

const NOT_ALL_WHITE_SPACE_RGX = new RegExp('.*[^ ].*');

@Component({
    selector: 'app-new-seller',
    templateUrl: './new-seller.component.html',
    styleUrls: ['./new-seller.component.scss'],
})
export class NewSellerComponent {
    @Input() sellerInfo: Seller;
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
    constructor(private newSellerService: NewSellerService) {}

    create() {
        console.log({ name: this.name, description: this.description });
        this.newSellerService.create({ name: this.name, description: this.description });
        // response.subscribe(() => {
        //     console.log('User created');
        // });
    }
}
