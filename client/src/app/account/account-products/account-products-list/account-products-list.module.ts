import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountProductsListRoutingModule } from './account-products-list-routing.module';
import { AccountProductsListComponent } from './account-products-list.component';


@NgModule({
  declarations: [
    AccountProductsListComponent,
  ],
  imports: [
    CommonModule,
    AccountProductsListRoutingModule
  ]
})
export class AccountProductsListModule { }
