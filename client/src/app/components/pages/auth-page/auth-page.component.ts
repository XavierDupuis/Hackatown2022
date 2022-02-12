import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@app/auth/services/auth.service';

@Component({
    selector: 'app-auth-page',
    templateUrl: './auth-page.component.html',
    styleUrls: ['./auth-page.component.scss'],
})
export class AuthPageComponent implements OnInit {
    constructor(private auth: AuthService, private router: Router) {}

    ngOnInit(): void {
        this.auth.isLoggedIn$.subscribe((val) => console.log(val));
    }

    redirect() {
        this.router.navigate(['/']);
    }
}
