import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { map, startWith, switchMap } from 'rxjs';
import { AdminOrderService } from './admin-order.service';
import { AdminOrder } from './model/adminOrder';

@Component({
  selector: 'app-admin-order',
  templateUrl: './admin-order.component.html',
  styleUrls: ['./admin-order.component.scss']
})
export class AdminOrderComponent implements AfterViewInit {

  displayedColumns: string[] = ["id", "placeDate", "orderStatus", "grossValue", "actions"];
  totalElements: number = 0;
  data: Array<AdminOrder> = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  
  constructor(private adminOrderService: AdminOrderService) { }

  ngAfterViewInit(): void {
    this.paginator.page.pipe(
      startWith({}),
      switchMap(() => {
        return this.adminOrderService.getOrders(this.paginator.pageIndex, this.paginator.pageSize);
      }),
      map(data => {
        if (data === null) {
          return [];
        }
        this.totalElements = data.totalElements;
        return data.content;
      })
    ).subscribe(data => this.data = data);
  }


}
