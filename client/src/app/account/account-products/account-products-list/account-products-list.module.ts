import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountProductsListRoutingModule } from './account-products-list-routing.module';
import { AccountProductsListComponent } from './account-products-list.component';
import { AccountProductDetailComponent } from './account-product-detail/account-product-detail.component';


@NgModule({
  declarations: [
    AccountProductsListComponent,
    AccountProductDetailComponent
  ],
  imports: [
    CommonModule,
    AccountProductsListRoutingModule
  ]
})
export class AccountProductsListModule { }
