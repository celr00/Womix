import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountServicesRoutingModule } from './account-services-routing.module';
import { AccountServicesComponent } from './account-services.component';
import { AccountServicesListComponent } from './account-services-list/account-services-list.component';
import { AccountServicesNewComponent } from './account-services-new/account-services-new.component';


@NgModule({
  declarations: [
    AccountServicesComponent,
    AccountServicesListComponent,
    AccountServicesNewComponent,
  ],
  imports: [
    CommonModule,
    AccountServicesRoutingModule
  ]
})
export class AccountServicesModule { }
