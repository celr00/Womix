import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountProductDetailRoutingModule } from './account-product-detail-routing.module';
import { AccountProductDetailComponent } from './account-product-detail.component';
import { AccountProductEditComponent } from './account-product-edit/account-product-edit.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    AccountProductDetailComponent,
    AccountProductEditComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AccountProductDetailRoutingModule,
  ]
})
export class AccountProductDetailModule { }
