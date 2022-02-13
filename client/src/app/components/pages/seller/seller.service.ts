import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Seller } from '@app/auth/services/seller.interface';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class SellerService {
    currentSeller = new BehaviorSubject<Seller | undefined>(undefined);

    constructor(private http: HttpClient) {}

    getSeller(sellerId: string) {
        console.log('sellerId', sellerId);
        this.http.get(`${environment.serverURL}/sellers/${sellerId}`).subscribe(
            (res) => {
                if (res === null) {
                    this.currentSeller.next(undefined);
                    return;
                }
                const seller = res as Seller;

                this.currentSeller.next(seller);
            },
            () => {
                console.log('Error getting seller identity');
            },
        );
    }

    getSellerIdFromUserId(userId: string) {
        return this.http.get(`${environment.serverURL}/sellerFood/seller-id/${userId}`);
    }
}
