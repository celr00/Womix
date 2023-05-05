import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ConfirmService } from 'src/app/core/services/confirm.service';
import { AccountService } from 'src/app/landing/account.service';
import { ProductService } from 'src/app/product/product.service';
import { Modal } from 'src/app/shared/models/modal';
import { Product } from 'src/app/shared/models/product';
import { ProductsParams } from 'src/app/shared/models/productsParams';
import { Photo } from 'src/app/shared/models/service';
import { Type } from 'src/app/shared/models/type';
import { BreadcrumbService } from 'xng-breadcrumb';

@Component({
  selector: 'app-account-product-edit',
  templateUrl: './account-product-edit.component.html',
  styleUrls: ['./account-product-edit.component.scss']
})
export class AccountProductEditComponent implements OnInit {
  @HostListener('window:beforeunload', ['$event']) unloadNotification($event:any) {
    if (this.productForm?.dirty) {
      $event.returnValue = true;
    }
  }
  productForm: FormGroup = new FormGroup({})
  types?: Type[];
  product?: Product
  id: number;
  photos: Photo[] = [];
  modal: Modal = new Modal;
  accountId: number;
  params: ProductsParams;
  available: boolean = false; // initialize available to false

  constructor(private productService: ProductService, private fb: FormBuilder,
    private route: ActivatedRoute, private bcService: BreadcrumbService, private toastr: ToastrService,
    private router: Router, private confirmService: ConfirmService, private accountService: AccountService) {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.accountId = this.accountService.getAccountId();
    this.params = this.productService.getParams();
  }

  ngOnInit(): void {
    this.loadTypes();
    this.params.userId = this.accountId;
    this.params.pageSize = 12;
    this.productService.setParams(this.params);
    this.productService.getAll().subscribe({})
  }

  loadProduct() {
    this.productService.getProduct(this.id).subscribe({
      next: product => {
        this.product = product;
        this.bcService.set('@productName', product.name);
        this.bcService.set('@editTitle', 'Editar');
        this.initForm(product);
        this.product.productPhotos.forEach(x => {
          this.photos.push(x.photo)
        });
        this.available = product.available; // set the value of available from product
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
    const product = this.product!;
    this.modal.title = `Guardar cambios realizados a ${ product.name }`;
    this.modal.message = `¿Desea guardar los cambios realizado al producto: ${ product.name }?`;
    const value = this.productForm.value;
    value.available = this.available; // add the value of available to the form value
    this.confirmService.confirm(this.modal).subscribe({
      next: modal => {
        console.log(value);

        modal && this.productService.edit(value).subscribe({
          next: () => {
            this.productForm.reset(value);
            this.toastr.success('Producto actualizado correctamente.');
            this.router.navigateByUrl('/account/products/list/' + this.id);
          },
        })
      }
    })
  }

  initForm(product: Product) {
    this.productForm = this.fb.group({
      id: [product.id],
      name: [product.name, [Validators.required, Validators.minLength(10), Validators.maxLength(100)]],
      description: [product.description, [Validators.required, Validators.minLength(10), Validators.maxLength(300)]],
      price: [product.price, [Validators.required]],
      available: [product.available, [Validators.required]],
      productItemClass: this.fb.group({
        itemClassId: [product.productItemClass.itemClassId, [Validators.required]]
      }),
    });

    this.productForm.patchValue(product);
  }

  receive(event: Product) {
    this.product = event;
  }

  delete() {
    const product = this.product!;
    this.modal.title = `Eliminar ${product.name}`;
    this.modal.message = `Confirma querer eliminar el producto '${product.name}'?`;
    this.modal.btnOkText = 'Eliminar';
    this.confirmService.confirm(this.modal).subscribe({
      next: modal => {
        modal && this.productService.delete(this.id).subscribe({
          next: () => {
            this.router.navigateByUrl('/account/products/list');
            this.toastr.success('Servicio eliminado exitosamente');
          },
        })
      }
    })
  }

  onToggleAvailable(): void {
    this.available = !this.available; // toggle the available property
  }

}
