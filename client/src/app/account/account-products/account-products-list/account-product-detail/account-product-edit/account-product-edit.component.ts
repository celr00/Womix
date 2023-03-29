import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from 'src/app/product/product.service';
import { Product } from 'src/app/shared/models/product';
import { Photo } from 'src/app/shared/models/service';
import { Type } from 'src/app/shared/models/type';
import { BreadcrumbService } from 'xng-breadcrumb';

@Component({
  selector: 'app-account-product-edit',
  templateUrl: './account-product-edit.component.html',
  styleUrls: ['./account-product-edit.component.scss']
})
export class AccountProductEditComponent implements OnInit {
  productForm: FormGroup = new FormGroup({})
  types: Type[] = [];
  id: number;
  product: Product = {} as Product;
  photos: Photo[] = [];

  constructor(private productService: ProductService, private fb: FormBuilder,
    private route: ActivatedRoute, private bcService: BreadcrumbService, private toastr: ToastrService,
    private router: Router) {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    this.loadTypes();
  }

  loadProduct() {
    this.productService.getProduct(this.id).subscribe({
      next: product => {
        this.product = product;
        this.bcService.set('@productName', product.name);
        this.bcService.set('@editTitle', 'Edit ' + product.name);
        this.initForm(this.product);
        this.product.productPhotos.forEach(x => {
          this.photos.push(x.photo)
        });
      },
    })
  }

  loadTypes() {
    this.productService.getTypes().subscribe({
      next: types => {
        this.types = types;
      },
      complete: () => {
        this.loadProduct();
      }
    })
  }

  onSubmit() {
    this.productService.edit(this.productForm.value).subscribe({
      next: () => {
        this.toastr.success('Product updated successfully');
        this.router.navigateByUrl('/account/products/list/' + this.product.id);
      },
      error: () => {
        
      }
    })
  }

  initForm(product: Product) {
    this.productForm = this.fb.group({
      id: [''],
      name: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(100)]],
      description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(100)]],
      price: ['', [Validators.required]],
      stockQuantity: ['', [Validators.required]],
      productItemClass: this.fb.group({
        itemClassId: [product.productItemClassId, [Validators.required]]
      }),
    })
    this.productForm.patchValue(this.product);
  }

  receive(event: Product) {
    this.product = event;
  }

}
