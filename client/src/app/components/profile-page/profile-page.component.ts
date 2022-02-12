import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@app/auth/services/auth.service';

@Component({
    selector: 'app-profile-page',
    templateUrl: './profile-page.component.html',
    styleUrls: ['./profile-page.component.scss'],
})
export class ProfilePageComponent {
    constructor(private authService: AuthService, private router: Router) {}

    signOut() {
        this.authService.signOut();
        this.router.navigate(['/']);
    }
}
