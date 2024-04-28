import { Component, OnDestroy, OnInit } from '@angular/core';
import { LegacyPageEvent as PageEvent } from '@angular/material/legacy-paginator';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, Subscription } from 'rxjs';
import { CategoryService } from './category.service';
import { CategoryProducts } from './model/categoryProducts';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit, OnDestroy {

  categoryProducts!: CategoryProducts;
  private sub!: Subscription;

  constructor(
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.sub = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => this.getCategoryWithProducts(0, 10));

    this.getCategoryWithProducts(0, 10);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  getCategoryWithProducts(page: number, size: number) {
    let slug = this.route.snapshot.params['slug'];
    this.categoryService.getCategoryWithProducts(slug, page, size)
      .subscribe(categoryProducts => this.categoryProducts = categoryProducts);
  }

  onPageChange(event: PageEvent) {
    this.getCategoryWithProducts(event.pageIndex, event.pageSize);
  }

}
