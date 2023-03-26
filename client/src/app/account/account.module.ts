import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { AccountComponent } from './account.component';
import { SharedModule } from '../shared/shared.module';
import { AccountEditComponent } from './account-edit/account-edit.component';
import { AccountHomeComponent } from './account-home/account-home.component';
import { AccountServicesComponent } from './account-services/account-services.component';
import { AccountChangePasswordComponent } from './account-change-password/account-change-password.component';
import { AccountNavComponent } from './account-nav/account-nav.component';


@NgModule({
  declarations: [
    AccountComponent,
    AccountEditComponent,
    AccountHomeComponent,
    AccountServicesComponent,
    AccountChangePasswordComponent,
    AccountNavComponent,
  ],
  imports: [
    CommonModule,
    AccountRoutingModule,
    SharedModule,
  ]
})
export class AccountModule { }
