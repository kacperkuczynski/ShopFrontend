import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  constructor(private http: HttpClient) { }

  getCountProducts(cartId: number):Observable<Number>{
    return this.http.get<Number>("/api/cartItems/count/"+ cartId);
  }
}
