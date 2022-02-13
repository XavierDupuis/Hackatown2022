import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(private http: HttpClient) {}

  requestOrdersList() {
    return this.http.get(`${environment.serverURL}/orders`);
  }

  requestProductFromUser() {
    return this.http.get(`${environment.serverURL}/sellerFood`);
  }
}
