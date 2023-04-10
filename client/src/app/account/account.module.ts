import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { AccountComponent } from './account.component';
import { SharedModule } from '../shared/shared.module';
import { AccountHomeComponent } from './account-home/account-home.component';
import { AccountChangePasswordComponent } from './account-change-password/account-change-password.component';
import { AccountNavComponent } from './account-nav/account-nav.component';
import { AccountSavedProfilesComponent } from './account-saved-profiles/account-saved-profiles.component';
import { AccountEditComponent } from './account-edit/account-edit.component';
import { AccountOffCanvasComponent } from './account-nav/account-off-canvas/account-off-canvas.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AccountComponent,
    AccountEditComponent,
    AccountHomeComponent,
    AccountChangePasswordComponent,
    AccountNavComponent,
    AccountSavedProfilesComponent,
    AccountOffCanvasComponent,
  ],
  imports: [
    CommonModule,
    AccountRoutingModule,
    SharedModule,
    FormsModule,
  ],
})
export class AccountModule {}
