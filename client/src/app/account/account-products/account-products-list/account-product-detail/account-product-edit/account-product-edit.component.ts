import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ConfirmService } from 'src/app/core/services/confirm.service';
import { ProductService } from 'src/app/product/product.service';
import { Modal } from 'src/app/shared/models/modal';
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
  modal: Modal = new Modal;

  constructor(private productService: ProductService, private fb: FormBuilder,
    private route: ActivatedRoute, private bcService: BreadcrumbService, private toastr: ToastrService,
    private router: Router, private confirmService: ConfirmService) {
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
    this.modal.title = `Guardar cambios realizados a ${this.product.name}`;
    this.modal.message = `¿Desea guardar los cambios realizado al producto: ${this.product.name}?`;
    const value = this.productForm.value;
    this.confirmService.confirm(this.modal).subscribe({
      next: modal => {
        modal && this.productService.edit(value).subscribe({
          next: () => {
            this.productForm.reset(value);
            this.toastr.success('Producto actualizado correctamente.');
            this.router.navigateByUrl('/account/products/list/' + this.product.id);
          },
        })
      }
    })
  }

  initForm(product: Product) {
    this.productForm = this.fb.group({
      id: [''],
      name: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(100)]],
      description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(300)]],
      price: ['', [Validators.required]],
      stockQuantity: ['', [Validators.required]],
      productItemClass: this.fb.group({
        itemClassId: [product.productItemClass.itemClassId, [Validators.required]]
      }),
    })
    this.productForm.patchValue(this.product);
  }

  receive(event: Product) {
    this.product = event;
  }

}
