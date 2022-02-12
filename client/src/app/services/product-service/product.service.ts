import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '@app/components/main-page/products/product-card/product.interface';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class ProductService {
    constructor(private http: HttpClient) {}

    requestProductList() {
        return this.http.get(`${environment.serverURL}/products`);
    }

    requestHistoryList() {
        return this.http.get(`${environment.serverURL}/products/history`);
    }

    addProduct(product: Product) {
        return this.http.post(`${environment.serverURL}/products`, product, { responseType: 'text' });
    }
}
