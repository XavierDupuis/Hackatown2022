import { Component } from '@angular/core';
import { SellerIdentityService } from '@app/auth/services/seller-identity.service';
import { Seller } from '@app/auth/services/seller.interface';
import { SellerService } from '@app/components/pages/seller/seller.service';
import { Product } from '@app/interfaces/product.interface';
import { ProfileService } from '@app/services/profile-service/profile.service';

@Component({
    selector: 'app-public-seller',
    templateUrl: './public-seller.component.html',
    styleUrls: ['./public-seller.component.scss'],
})
export class PublicSellerComponent {
    found: boolean = false;
    sellerInfo: Seller;
    products: Product[];
    constructor(private sellerIdentity: SellerIdentityService, private sellerService: SellerService, private profileService: ProfileService) {
        // this.sellerIdentity.userSellerIdentity.subscribe((id) => {
        //     console.log('my seller id', id);
        //     this.sellerId = id === undefined ? '' : id.id;
        // });
        // console.log(this.sellerId);
        // // Todo: if userid is undefined
        // this.sellerService.currentSeller.subscribe((sellerInfo) => {
        //     if (sellerInfo !== undefined) {
        //         this.sellerInfo = sellerInfo;
        //     }
        // });
        // this.sellerService.getSeller(this.sellerId);
        // console.log(this.sellerInfo);
    }

    ngAfterViewInit() {
        console.log('public');
        this.sellerService.currentSeller.subscribe((seller) => {
            if (seller === undefined) {
                return;
            }
            this.sellerInfo = seller;
        });
    }

    get hasSellerAccount() {
        return this.sellerIdentity.userSellerIdentity;
    }

    // get sellerId() {
    //     return this.sellerIdentity.userSellerIdentity;
    // }

    get name() {
        if (this.sellerInfo === undefined) {
            return '';
        }
        return this.sellerInfo.name;
    }
    get description() {
        if (this.sellerInfo === undefined) {
            return '';
        }
        return this.sellerInfo.description;
    }

    getProductsFromUser() {
        this.profileService.requestProductFromUser().subscribe((result) => {
            const newProducts = result as Product[];
            this.products = newProducts;
            console.log(newProducts);
            // this.products = newProducts;
        });
    }
}
