import { Component } from '@angular/core';
import { SellerIdentityService } from '@app/auth/services/seller-identity.service';

@Component({
    selector: 'app-private-seller',
    templateUrl: './private-seller.component.html',
    styleUrls: ['./private-seller.component.scss'],
})
export class PrivateSellerComponent {
    constructor(private sellerIdentity: SellerIdentityService) {}

    get hasSellerAccount() {
        return this.sellerIdentity.userSellerIdentity.getValue();
    }
}
