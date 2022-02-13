import { AfterViewInit, Component } from '@angular/core';
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
export class PublicSellerComponent implements AfterViewInit {
    found: boolean = false;
    sellerInfo: Seller;
    products: Product[];
    constructor(private sellerIdentity: SellerIdentityService, private sellerService: SellerService, private profileService: ProfileService) {
        this.sellerService.currentSeller.subscribe((seller) => {
            if (seller === undefined) {
                this.products = [];
                this.found = false;
                return;
            }
            this.found = true;
            // eslint-disable-next-line no-underscore-dangle
            this.getProductsFromUser(seller.userId);
            this.sellerInfo = seller;
        });
    }

    ngAfterViewInit() {}

    get hasSellerAccount() {
        return this.sellerIdentity.userSellerIdentity;
    }

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

    getProductsFromUser(sellerId: string) {
        this.profileService.requestProductFromSeller(sellerId).subscribe((result) => {
            const newProducts = result as Product[];
            this.products = newProducts;
            console.log(newProducts);
            // this.products = newProducts;
        });
    }
}
