import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
  @ViewChild('search') searchTerm?: ElementRef;
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

  onIdClick() {
    switch (this.params.sort) {
      case 'idDesc':
        this.params.sort = 'idAsc';
        this.productService.setParams(this.params);
        break;
      case 'idAsc':
        this.params.sort = 'idDesc';
        this.productService.setParams(this.params);
        break;
      default:
        this.params.sort = 'idAsc';
        this.productService.setParams(this.params);
        break;
    }
    this.loadProducts();
  }

  onNameClick() {
    switch (this.params.sort) {
      case 'nameDesc':
        this.params.sort = 'nameAsc';
        this.productService.setParams(this.params);
        break;
      case 'nameAsc':
        this.params.sort = 'nameDesc';
        this.productService.setParams(this.params);
        break;
      default:
        this.params.sort = 'nameAsc';
        this.productService.setParams(this.params);
        break;
    }
    this.loadProducts();
  }

  onDescriptionClick() {
    switch (this.params.sort) {
      case 'descriptionDesc':
        this.params.sort = 'descriptionAsc';
        this.productService.setParams(this.params);
        break;
      case 'descriptionAsc':
        this.params.sort = 'descriptionDesc';
        this.productService.setParams(this.params);
        break;

      default:
        this.params.sort = 'descriptionAsc';
        this.productService.setParams(this.params);
        break;
    }
    this.loadProducts();
  }

  onItemClassClick() {
    switch (this.params.sort) {
      case 'itemClassDesc':
        this.params.sort = 'itemClassAsc';
        this.productService.setParams(this.params);
        break;
      case 'itemClassAsc':
        this.params.sort = 'itemClassDesc';
        this.productService.setParams(this.params);
        break;
      default:
        this.params.sort = 'itemClassAsc';
        this.productService.setParams(this.params);
        break;
    }
    this.loadProducts();
  }

  onPriceClick() {
    switch (this.params.sort) {
      case 'priceDesc':
        this.params.sort = 'priceAsc';
        this.productService.setParams(this.params);
        break;
      case 'priceAsc':
        this.params.sort = 'priceDesc';
        this.productService.setParams(this.params);
        break;
      default:
        this.params.sort = 'priceAsc';
        this.productService.setParams(this.params);
        break;
    }
    this.loadProducts();
  }

  onQuantityClick() {
    switch (this.params.sort) {
      case 'quantityDesc':
        this.params.sort = 'quantityAsc';
        this.productService.setParams(this.params);
        break;
      case 'quantityAsc':
        this.params.sort = 'quantityDesc';
        this.productService.setParams(this.params);
        break;
      default:
        this.params.sort = 'quantityAsc';
        this.productService.setParams(this.params);
        break;
    }
    this.loadProducts();
  }

  onSearch() {
    const params = this.productService.getParams();
    params.search = this.searchTerm?.nativeElement.value;
    params.pageNumber = 1;
    this.productService.setParams(params);
    this.params = params;
    this.loadProducts();
  }

  onReset() {
    if (this.searchTerm) this.searchTerm.nativeElement.value = '';
    this.params = new ProductsParams();
    this.params.userId = this.user.id;
    this.params.pageSize = 12;
    this.productService.setParams(this.params);
    this.loadProducts();
  }

}
