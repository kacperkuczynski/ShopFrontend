import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AdminProductUpdate } from './model/adminProductUpdate';

@Injectable({
  providedIn: 'root'
})
export class AdminProductUpdateService {
  
  constructor(private http: HttpClient) { }
  
  getProduct(id: number): Observable<AdminProductUpdate>{
    return this.http.get<AdminProductUpdate>("/api/admin/product/" + id);
  }

  saveProduct(id: number, value: AdminProductUpdate) {
    return this.http.put<AdminProductUpdate>('/api/admin/products/' + id, value)
  }
}
