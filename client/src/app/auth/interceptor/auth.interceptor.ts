import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private auth: AuthService) {}

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        console.log('intercept');
        const token = from(this.auth.getToken());
        return token.pipe(
            switchMap((jwt) => {
                if (jwt === null) {
                    return next.handle(request);
                }
                const reqWithAuth = request.clone({
                    setHeaders: {
                        // eslint-disable-next-line @typescript-eslint/naming-convention
                        Authorization: `Bearer ${jwt}`,
                    },
                });
                console.log(reqWithAuth);
                return next.handle(reqWithAuth);
            }),
        );
    }
}
