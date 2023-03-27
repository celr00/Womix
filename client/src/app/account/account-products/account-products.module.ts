import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountProductsRoutingModule } from './account-products-routing.module';
import { AccountProductsComponent } from './account-products.component';
import { AccountProductsNewComponent } from './account-products-new/account-products-new.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    AccountProductsComponent,
    AccountProductsNewComponent
  ],
  imports: [
    CommonModule,
    AccountProductsRoutingModule,
    SharedModule,
  ]
})
export class AccountProductsModule { }
