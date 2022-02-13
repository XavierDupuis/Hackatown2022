import { Component } from '@angular/core';
import { SellerIdentityService } from '@app/auth/services/seller-identity.service';
import { Seller } from '@app/auth/services/seller.interface';
import { SellerService } from '@app/components/pages/seller/seller.service';
import { Subject } from 'rxjs';

@Component({
    selector: 'app-private-seller',
    templateUrl: './private-seller.component.html',
    styleUrls: ['./private-seller.component.scss'],
})
export class PrivateSellerComponent {
    sellerInfo: Subject<Seller>;

    constructor(private sellerIdentity: SellerIdentityService, private sellerService: SellerService) {
        this.sellerService.currentSeller.subscribe(this.sellerInfo);
        this.sellerService.getSeller(this.sellerId?.id as string);
        console.log(this.sellerInfo);
    }

    get hasSellerAccount() {
        return this.sellerIdentity.userSellerIdentity.getValue();
    }

    get sellerId() {
        return this.sellerIdentity.userSellerIdentity.getValue();
    }
}
