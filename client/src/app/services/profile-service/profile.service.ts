import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from '@app/interfaces/order.interface';
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

  addOrder(order: Order) {
    return this.http.post(`${environment.serverURL}/orders`, order, { responseType: 'json' });
  }

}
