import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountProductsListRoutingModule } from './account-products-list-routing.module';
import { AccountProductsListComponent } from './account-products-list.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    AccountProductsListComponent,
  ],
  imports: [
    CommonModule,
    AccountProductsListRoutingModule,
    SharedModule,
  ]
})
export class AccountProductsListModule { }
