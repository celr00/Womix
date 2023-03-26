import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountProductsRoutingModule } from './account-products-routing.module';
import { AccountProductsComponent } from './account-products.component';
import { AccountProductsNewComponent } from './account-products-new/account-products-new.component';
import { AccountSavedProfilesComponent } from './account-saved-profiles/account-saved-profiles.component';
import { AccountMessagesComponent } from './account-messages/account-messages.component';


@NgModule({
  declarations: [
    AccountProductsComponent,
    AccountProductsNewComponent,
    AccountSavedProfilesComponent,
    AccountMessagesComponent,
  ],
  imports: [
    CommonModule,
    AccountProductsRoutingModule
  ]
})
export class AccountProductsModule { }
