import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '@app/auth/services/auth.service';
import { first, map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(private router: Router, private authService: AuthService) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const isLoggedIn$ = this.authService.isLoggedIn();
        return isLoggedIn$
            .pipe(
                map((isLoggedIn) => {
                    if (!isLoggedIn) {
                        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
                    } else {
                        this.router.navigate(['/']);
                    }
                    return isLoggedIn;
                }),
            )
            .pipe(first());
    }
}
