import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountProductsRoutingModule } from './account-products-routing.module';
import { AccountProductsComponent } from './account-products.component';
import { AccountProductsNewComponent } from './account-products-new/account-products-new.component';


@NgModule({
  declarations: [
    AccountProductsComponent,
    AccountProductsNewComponent
  ],
  imports: [
    CommonModule,
    AccountProductsRoutingModule
  ]
})
export class AccountProductsModule { }
