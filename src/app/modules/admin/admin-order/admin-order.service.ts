import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Page } from '../../common/model/page';
import { AdminOrder } from './model/adminOrder';

@Injectable({
  providedIn: 'root'
})
export class AdminOrderService {
  constructor(private http: HttpClient) { }
  
  getOrders(pageIndex: number, pageSize: number): Observable<Page<AdminOrder>> {
    return this.http.get<Page<AdminOrder>>(`/api/admin/orders?page=${pageIndex}&size=${pageSize}`);
  }
  
  getOrder(id: number): Observable<AdminOrder> {
    return this.http.get<AdminOrder>("/api/admin/orders/" + id);
  }
  
  saveStatus(id: number, value: any):Observable<void> {
    return this.http.patch<void>("/api/admin/orders/" + id, value);
  }
  
  getInitData(): Observable<any> {
    return this.http.get<any>("/api/admin/orders/initData");
  }

  exportOrders(from: string, to: string, orderStatus: string): Observable<any> {
    return this.http.get(`/api/admin/orders/export?from=${from}&to=${to}&orderStatus=${orderStatus}`,
    {responseType: `blob`, observe: 'response'}
    );
  }

  getSalesStatistics(): Observable<any>{
    return this.http.get("/api/admin/orders/stats");
  }

}
