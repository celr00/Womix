import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AccountEditComponent} from './account-edit/account-edit.component';
import { AccountHomeComponent } from './account-home/account-home.component';
import { AccountChangePasswordComponent } from './account-change-password/account-change-password.component';
import { AccountMessagesComponent } from './account-messages/account-messages.component';
import { AccountSavedProfilesComponent } from './account-saved-profiles/account-saved-profiles.component';
import { AccountProductsComponent } from './account-products/account-products.component';
import { ServicesComponent } from './services/services.component';

const routes: Routes = [
  { path: 'summary', component: AccountHomeComponent },
  {
    path: 'edit',
    component: AccountEditComponent,
    data: {
      breadcrumb: {
        alias: 'editProfileTitle'
      }
    }
  },
  {
    path: 'products',
    component: AccountProductsComponent,
    loadChildren: () =>
      import('./account-products/account-products.module')
        .then(x => x.AccountProductsModule),
  },
  {
    path: 'services',
    component: ServicesComponent,
    loadChildren: () =>
      import('./services/services.module')
        .then(x => x.ServicesModule)
  },
  { path: 'saved-profiles', component: AccountSavedProfilesComponent },
  { path: 'messages', component: AccountMessagesComponent },
  {
    path: 'change-password',
    component: AccountChangePasswordComponent,
    data: { breadcrumb: { alias: 'changePassword' } },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountRoutingModule {}
