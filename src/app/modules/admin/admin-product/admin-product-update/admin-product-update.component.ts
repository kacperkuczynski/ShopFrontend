import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatLegacySnackBar as MatSnackBar } from '@angular/material/legacy-snack-bar';
import { ActivatedRoute } from '@angular/router';
import { __values } from 'tslib';
import { AdminMessageService } from '../../common/service/admin-message.service';
import { AdminProductUpdateService } from './admin-product-update.service';
import { AdminProductUpdate } from '../model/adminProductUpdate';
import { AdminProductImageService } from '../admin-product-image.service';

@Component({
  selector: 'app-admin-product-update',
  templateUrl: './admin-product-update.component.html',
  styleUrls: ['./admin-product-update.component.scss']
})
export class AdminProductUpdateComponent implements OnInit {

  product!: AdminProductUpdate;
  productForm!: FormGroup;
  imageForm!: FormGroup;
  requiredFileTypes = "image/jpeg, image/png";
  image: string | null = null;

  constructor(
    private router: ActivatedRoute,
    private adminProductUpdateService: AdminProductUpdateService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private adminMessageService: AdminMessageService,
    private adminProductImage: AdminProductImageService

  ) { }

  ngOnInit(): void {
    this.getProduct();

    this.productForm = this.formBuilder.group({
        name: ['', [Validators.required, Validators.minLength(4)]],
        description: ['', [Validators.required, Validators.minLength(4)]],
        fullDescription: ['', [Validators.required, Validators.minLength(4)]],
        categoryId: ['', [Validators.required]],
        price: ['', [Validators.required, Validators.min(0)]],
        currency: ['PLN', [Validators.required]],
        slug: ['', [Validators.required, Validators.minLength(4)]]
    });

    this.imageForm = this.formBuilder.group({
      file: ['']
    })

  }

  getProduct() {
    let id = Number(this.router.snapshot.params['id']);
    this.adminProductUpdateService.getProduct(id)
      .subscribe(product => this.mapFormValues(product));
  }

  submit() {
    let id = Number(this.router.snapshot.params['id']);
    this.adminProductUpdateService.saveProduct(id, {
      name: this.productForm.get('name')?.value,
      description: this.productForm.get('description')?.value,
      fullDescription: this.productForm.get('fullDescription')?.value,
      categoryId: this.productForm.get('categoryId')?.value,
      price: this.productForm.get('price')?.value,
      currency: this.productForm.get('currency')?.value,
      slug: this.productForm.get('slug')?.value,
      image: this.image
    } as AdminProductUpdate).subscribe({
      next: product => {
        this.mapFormValues(product);
        this.snackBar.open("Produkt został zapisany", '', { duration: 3000 });
      },
      error: err => this.adminMessageService.addSpringErrors(err.error)
    });
  }

  uploadFile(){
    let formData = new FormData();
    formData.append('file', this.imageForm.get('file')?.value);//file z backendu
    this.adminProductImage.uploadImage(formData)
    .subscribe(result => this.image = result.filename);
  }

  onFileChange(event: any){
    if(event.target.files.length > 0){
    this.imageForm.patchValue({
      file: event.target.files[0]
    });
  }
  }



  private mapFormValues(product: AdminProductUpdate): void {
    this.productForm.setValue({
      name: product.name,
      description: product.description,
      fullDescription: product.fullDescription,
      categoryId: product.categoryId,
      price: product.price,
      currency: product.currency,
      slug: product.slug
    });
    this.image = product.image;
  }
}
