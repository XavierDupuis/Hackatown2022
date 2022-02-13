import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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

    constructor(private newSellerService: NewSellerService) {}

    create() {
        this.newSellerService.create({ name: 'Chez Olivier', description: 'Pas mangeable' });
        // response.subscribe(() => {
        //     console.log('User created');
        // });
    }
}
