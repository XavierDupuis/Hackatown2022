import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SellerProfileCreationParams } from '@app/components/pages/seller/new-seller-params.interface';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class NewSellerService {
    constructor(private http: HttpClient) {}

    create(params: SellerProfileCreationParams) {
        this.http.post(`${environment.serverURL}/sellers/create`, params).subscribe();
    }
}
