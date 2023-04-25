import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from 'src/app/landing/account.service';
import { ProductService } from 'src/app/product/product.service';
import { AppUser } from 'src/app/shared/models/app-user';
import { Type } from 'src/app/shared/models/type';
import { BreadcrumbService } from 'xng-breadcrumb';

@Component({
  selector: 'app-account-products-new',
  templateUrl: './account-products-new.component.html',
  styleUrls: ['./account-products-new.component.scss']
})
export class AccountProductsNewComponent implements OnInit {
  productForm: FormGroup = new FormGroup({})
  types: Type[] = [];
  user: AppUser = {} as AppUser;

  constructor(private bcService: BreadcrumbService, private productService: ProductService,
    private fb: FormBuilder, private accountService: AccountService, private router: Router,
    private toastr: ToastrService) {
    this.bcService.set('@newProductTitle', 'Create a new product');
  }

  ngOnInit(): void {
    this.loadTypes();
  }

  onSubmit() {
    const value = this.productForm.value;
    this.productService.add(value).subscribe({
      next: () => {
        this.productForm.reset(value);
        this.toastr.success('Producto agregado exitosamente');
        this.router.navigateByUrl('/account/products/list');
      },
    })
  }

  initForm(itemClassId: number, userId: number) {
    this.productForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(100)]],
      description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(300)]],
      price: ['', [Validators.required]],
      stockQuantity: ['', [Validators.required]],
      userProduct: this.fb.group({
        userId: [userId, [Validators.required]]
      }),
      productItemClass: this.fb.group({
        itemClassId: [itemClassId, [Validators.required]]
      }),
    })
  }

  loadTypes() {
    this.productService.getTypes().subscribe({
      next: types => {
        this.types = types;
      },
      complete: () => {
        this.loadUser();
      }
    })
  }

  loadUser() {
    this.accountService.getUser().subscribe({
      next: user => {
        this.user = user;
      },
      complete: () => {
        this.initForm(this.types[0].id, this.user.id);
      }
    })
  }
}
