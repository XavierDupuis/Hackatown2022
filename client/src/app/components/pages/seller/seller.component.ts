import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SellerIdentityService } from '@app/auth/services/seller-identity.service';

@Component({
    templateUrl: './seller.component.html',
    styleUrls: ['./seller.component.scss'],
})
export class SellerComponent implements OnInit {
    isUserSellerPage = false;

    constructor(
        private route: ActivatedRoute,
        /* private authService: AuthService*/
        private userSellerIdentity: SellerIdentityService,
    ) {}

    ngOnInit(): void {
        this.route.params.subscribe((params) => {
            console.log(params);
        });
    }

    test() {
        this.userSellerIdentity.refresh();
    }
}
