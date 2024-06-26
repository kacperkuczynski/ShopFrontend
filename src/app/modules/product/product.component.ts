import { Component, OnInit } from '@angular/core';
import { LegacyPageEvent as PageEvent } from '@angular/material/legacy-paginator';
import { Page } from 'src/app/modules/common/model/page';
import { Product } from '../common/model/product';
import { ProductService } from './product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  page!: Page<Product>;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(){
    this.getProductPage(0, 10);
  }

  onPageEvent(event: PageEvent){
    this.getProductPage(event.pageIndex, event.pageSize);
  }

  private getProductPage(page: number, size:number) {
    this.productService.getProducts(page,size)
      .subscribe(page => this.page = page);
  }

}
