/* eslint-disable no-underscore-dangle */
import { Injectable } from '@angular/core';
import { Hub } from '@aws-amplify/core';
import { Auth } from 'aws-amplify';
import { BehaviorSubject, from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface AuthState {
    isLoggedIn: boolean;
    username: string | null;
    id: string | null;
    email: string | null;
}

const initialAuthState = {
    isLoggedIn: false,
    username: null,
    id: null,
    email: null,
};

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    // readonly isLoggedIn$ = this.auth$.pipe(map((state) => state.isLoggedIn));
    private readonly authState = new BehaviorSubject<AuthState>(initialAuthState);

    get auth$(): Observable<AuthState> {
        return this.authState;
    }

    get isLoggedIn$() {
        return this.auth$.pipe(map((state) => state.isLoggedIn));
    }

    /** Observe the isLoggedIn slice of the auth state */

    constructor() {
        console.log('auth service');
        // Get the user on creation of this service
        Auth.currentAuthenticatedUser().then(
            (user: unknown) => this.setUser(user),
            () => this.authState.next(initialAuthState),
        );

        // Use Hub channel 'auth' to get notified on changes
        Hub.listen('auth', ({ payload: { event, data } }) => {
            if (event === 'signIn') {
                // On 'signIn' event, the data is a CognitoUser object
                this.setUser(data);
            } else {
                this.authState.next(initialAuthState);
            }
        });

        this.isLoggedIn$.subscribe((val) => {
            console.log('loggedin', val);
        });
    }

    async getUserInfo() {
        return await Auth.currentAuthenticatedUser();
    }

    async signOut() {
        try {
            await Auth.signOut();
        } catch (e) {
            console.error(e);
        }
    }

    isLoggedIn(): Observable<boolean> {
        return from(this.isLoggedInAsync());
    }

    async getToken() {
        try {
            const session = await Auth.currentSession();
            const cognitoToken = session.getAccessToken();
            return cognitoToken.getJwtToken();
        } catch (e) {
            return null;
        }
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private setUser(user: any) {
        if (!user) {
            return;
        }

        const {
            attributes: { sub: id, email },
            username,
        } = user;

        this.authState.next({ isLoggedIn: true, id, username, email });
    }

    private async isLoggedInAsync(): Promise<boolean> {
        try {
            const user = await Auth.currentAuthenticatedUser();
            console.log(user);
            return true;
        } catch (e) {
            return false;
        }
    }
}
