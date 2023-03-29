import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/landing/account.service';
import { ProductService } from 'src/app/product/product.service';
import { AppUser } from 'src/app/shared/models/app-user';
import { Product } from 'src/app/shared/models/product';
import { ProductsParams } from 'src/app/shared/models/productsParams';
import { BreadcrumbService } from 'xng-breadcrumb';

@Component({
  selector: 'app-account-products-list',
  templateUrl: './account-products-list.component.html',
  styleUrls: ['./account-products-list.component.scss']
})
export class AccountProductsListComponent implements OnInit {
  user: AppUser = {} as AppUser;
  products: Product[] = [];
  params: ProductsParams;
  totalCount = 0;

  constructor(private productService: ProductService, private accountService: AccountService,
    private bcService: BreadcrumbService) {
    this.productService.resetParams();
    this.params = this.productService.getParams();
    this.bcService.set('@productListTitle', 'My products')
  }

  ngOnInit(): void {
    this.loadUser();
  }

  loadUser() {
    this.accountService.getUser().subscribe({
      next: user => {
        this.user = user;
      },
      complete: () => {
        this.params.userId = this.user.id;
        this.productService.setParams(this.params);
        this.loadProducts();
      }
    })
  }

  loadProducts() {
    this.productService.getAll().subscribe({
      next: response => {
        this.products = response.data;
        this.totalCount = response.count;
      }
    })
  }

  onPageChanged(event: any) {
    const params = this.productService.getParams();
    if (params.pageNumber !== event) {
      params.pageNumber = event;
      this.productService.setParams(params);
      this.params = params;
      this.loadProducts();
    }
  }

}
