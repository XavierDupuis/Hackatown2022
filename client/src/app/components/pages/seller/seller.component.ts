import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SellerIdentityService } from '@app/auth/services/seller-identity.service';
import { SellerService } from '@app/components/pages/seller/seller.service';

@Component({
    templateUrl: './seller.component.html',
    styleUrls: ['./seller.component.scss'],
})
export class SellerComponent implements OnInit {
    isUserSellerPage = false;

    constructor(
        private route: ActivatedRoute,
        /* private authService: AuthService*/
        private sellerService: SellerService,
        private userSellerIdentity: SellerIdentityService,
    ) {}

    ngOnInit(): void {
        this.route.params.subscribe((params) => {
            const id = params.id;
            const userSellerId = this.userSellerIdentity.userSellerIdentity.getValue();
            if (id === 'me' || id === userSellerId) {
                this.userSellerIdentity.refreshIndentity();
                this.isUserSellerPage = true;
                return;
            }
            this.isUserSellerPage = false;
            this.sellerService.getSeller(id);
        });
    }

    test() {
        this.userSellerIdentity.refreshIndentity();
    }
}
