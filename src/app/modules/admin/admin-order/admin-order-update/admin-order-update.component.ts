import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  formGroup!: FormGroup;

  statuses!: Map<string, string> 

  constructor(
    private activatedRoute: ActivatedRoute,
    private adminOrderService: AdminOrderService,
    private formBuilder: FormBuilder
    ) { }

  ngOnInit(): void {
    this.getOrder();
    this.getInitData();
    this.formGroup = this.formBuilder.group({
      orderStatus: ['', Validators.required]
    })
  }
  

  getOrder() {
    let id = Number(this.activatedRoute.snapshot.params['id']);
    this.adminOrderService.getOrder(id)
      .subscribe(order => {
        this.order = order;
        this.formGroup.setValue({
          orderStatus: order.orderStatus
        })
      });
  }

  changeStatus(){
    this.adminOrderService.saveStatus(this.order.id, this.formGroup.value)
    .subscribe();
  }
  getInitData() {
    this.adminOrderService.getInitData()
    .subscribe(data => this.statuses = data.orderStatuses);
  }
}
