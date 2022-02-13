import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductAddedToCart } from '@app/interfaces/product.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) {

  }

  requestOrdersList() {
    return this.http.get(`${environment.serverURL}/orders`);
  }

  addOrder(products: ProductAddedToCart[], totalCost: number) {
    // const newOrder: Order = { date: new Date(Date.now()), orderedProduct: products, total: totalCost };
    return this.http.post(`${environment.serverURL}/order`, null, { responseType: 'json' }).subscribe();
  }

}
