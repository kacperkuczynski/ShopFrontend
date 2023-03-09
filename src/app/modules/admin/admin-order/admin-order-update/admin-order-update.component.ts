import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminOrderService } from '../admin-order.service';
import { AdminOrder } from '../model/adminOrder';

@Component({
  selector: 'app-admin-order-update',
  templateUrl: './admin-order-update.component.html',
  styleUrls: ['./admin-order-update.component.scss']
})
export class AdminOrderUpdateComponent implements OnInit {

  order!: AdminOrder;

  constructor(
    private activatedRoute: ActivatedRoute,
    private adminOrderService: AdminOrderService
    ) { }

  ngOnInit(): void {
    this.getOrder();
  }

  getOrder() {
    let id = Number(this.activatedRoute.snapshot.params['id']);
    this.adminOrderService.getOrder(id)
      .subscribe(order => this.order = order);
  }
}
