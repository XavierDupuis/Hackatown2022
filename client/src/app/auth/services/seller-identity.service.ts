/* eslint-disable no-underscore-dangle */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Seller, SellerIdentity } from '@app/auth/services/seller.interface';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class SellerIdentityService {
    userSellerIdentity = new BehaviorSubject<SellerIdentity | undefined>(undefined);

    constructor(private http: HttpClient) {
        this.refreshIndentity();
    }

    refreshIndentity() {
        this.http.get(`${environment.serverURL}/sellers/me`).subscribe(
            (res) => {
                if (res === null) {
                    this.userSellerIdentity.next(undefined);
                    return;
                }
                const seller = res as Seller;
                const identity = seller._id !== undefined ? { id: seller._id } : undefined;
                this.userSellerIdentity.next(identity);
            },
            () => {
                console.log('Error getting seller identity');
            },
        );
    }
}
