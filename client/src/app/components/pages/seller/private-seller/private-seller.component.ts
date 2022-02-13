import { Component } from '@angular/core';
import { SellerIdentityService } from '@app/auth/services/seller-identity.service';
import { Seller } from '@app/auth/services/seller.interface';
import { SellerService } from '@app/components/pages/seller/seller.service';
import { Product } from '@app/interfaces/product.interface';
import { ProfileService } from '@app/services/profile-service/profile.service';

@Component({
    selector: 'app-private-seller',
    templateUrl: './private-seller.component.html',
    styleUrls: ['./private-seller.component.scss'],
})
export class PrivateSellerComponent {
    sellerId: string;
    sellerInfo: Seller;
    constructor(private sellerIdentity: SellerIdentityService, private sellerService: SellerService, private profileService: ProfileService) {
        this.sellerIdentity.userSellerIdentity.subscribe((id) => {
            this.sellerId = id === undefined ? '' : id.id;
        });
        console.log(this.sellerId);
        // Todo: if userid is undefined
        this.sellerService.currentSeller.subscribe((sellerInfo) => {
            if (sellerInfo !== undefined) {
                this.sellerInfo = sellerInfo;
            }
        });
        this.sellerService.getSeller(this.sellerId);
        console.log(this.sellerInfo);
    }
    get hasSellerAccount() {
        return this.sellerIdentity.userSellerIdentity;
    }

    // get sellerId() {
    //     return this.sellerIdentity.userSellerIdentity;
    // }

    get name() {
        return this.sellerInfo.name;
    }
    get description() {
        return this.sellerInfo.description;
    }

    getProductsFromUser() {
        this.profileService.requestProductFromUser().subscribe((result) => {
            const newProducts = result as Product[];
            console.log(newProducts);
            // this.products = newProducts;
        });
    }
}
