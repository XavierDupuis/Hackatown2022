/* eslint-disable @typescript-eslint/naming-convention */
import { AfterViewInit, Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@app/auth/services/auth.service';
import { Order } from '@app/interfaces/order.interface';
import { ProfileService } from '@app/services/profile-service/profile.service';

interface AuthUser {
    email: string;
    email_verified: boolean;
    family_name: string;
    name: string;
    phone_number: string;
    phone_number_verified: boolean;
    sub: string;
}

@Component({
    selector: 'app-profile-page',
    templateUrl: './profile-page.component.html',
    styleUrls: ['./profile-page.component.scss'],
})
export class ProfilePageComponent implements AfterViewInit {
    user: AuthUser = {
        email: 'string',
        email_verified: true,
        family_name: 'string',
        name: 'string',
        phone_number: 'string',
        phone_number_verified: true,
        sub: 'string',
    };
    orders: Order[];
    constructor(private authService: AuthService, private router: Router, private profileService: ProfileService) {}

    ngAfterViewInit(): void {
        this.getUser();

        this.profileService.requestOrdersList().subscribe((result) => {
            const newOrders = result as Order[];
            this.orders = newOrders;
        });

    }

    async getUser() {
        this.authService.getUserInfo().then((result) => {
            this.user = result.attributes;
        });
    }

    signOut() {
        this.authService.signOut();
        this.router.navigate(['/']);
    }
}
