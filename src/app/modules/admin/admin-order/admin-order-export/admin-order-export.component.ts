import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminOrderService } from '../admin-order.service';

@Component({
  selector: 'app-admin-order-export',
  templateUrl: './admin-order-export.component.html',
  styleUrls: ['./admin-order-export.component.scss']
})
export class AdminOrderExportComponent implements OnInit {

  formGroup!: FormGroup;
  statuses = [];

  constructor(
    private formBuilder: FormBuilder,
    private adminOrderService: AdminOrderService
  ) { }

  ngOnInit(): void {
    this.getInitData();
    this.formGroup = this.formBuilder.group({
      from: ['', Validators.required],
      to: ['', Validators.required],
      orderStatus: ['', Validators.required]
    })
  }

  export(){
    if(this.formGroup.valid){
      this.adminOrderService.exportOrders(
        this.formGroup.get("from")?.value.toISOString(),
        this.formGroup.get("to")?.value.toISOString(),
        this.formGroup.get("orderStatus")?.value,
      )
    .subscribe(response => {
      let a = document.createElement('a');
      let objectUrl = URL.createObjectURL(response.body);
      a.href = objectUrl;
      a.download = response.headers.get("Content-Disposition");
      a.click();
      URL.revokeObjectURL(objectUrl);
    });
    }
  }

  getInitData() {
    this.adminOrderService.getInitData()
    .subscribe(data => this.statuses = data.orderStatuses);
  }

}
