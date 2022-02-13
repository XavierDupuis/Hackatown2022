/* eslint-disable @typescript-eslint/naming-convention */
import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@app/auth/services/auth.service';
import { environment } from 'src/environments/environment';

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
    constructor(private authService: AuthService, private router: Router, private http: HttpClient) {}

    ngAfterViewInit(): void {
        this.getUser();
    }

    async getUser() {
        this.authService.getUserInfo().then((result) => {
            this.user = result.attributes;
        });
    }

    requestOrdersList() {
        return this.http.get(`${environment.serverURL}/orders`);
    }

    signOut() {
        this.authService.signOut();
        this.router.navigate(['/']);
    }
}
