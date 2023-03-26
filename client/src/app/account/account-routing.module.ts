import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountEditComponent } from './account-edit/account-edit.component';
import { AccountHomeComponent } from './account-home/account-home.component';
import { AccountServicesComponent } from './account-services/account-services.component';
import { AccountChangePasswordComponent } from './account-change-password/account-change-password.component';
import { AccountMessagesComponent } from './account-messages/account-messages.component';
import { AccountSavedProfilesComponent } from './account-saved-profiles/account-saved-profiles.component';
import { AccountProductsComponent } from './account-products/account-products.component';

const routes: Routes = [
  {path: 'summary', component: AccountHomeComponent},
  {path: 'edit', component: AccountEditComponent},
  {
    path: 'products',
    component: AccountProductsComponent,
    loadChildren: () => import('./account-products/account-products.module')
      .then(x => x.AccountProductsModule)
  },
  {
    path: 'services',
    component: AccountServicesComponent,
    loadChildren: () => import('./account-services/account-services.module')
      .then(x => x.AccountServicesModule)
  },
  {path: 'saved-profiles', component: AccountSavedProfilesComponent},
  {path: 'messages', component: AccountMessagesComponent},
  {
    path: 'change-password',
    component: AccountChangePasswordComponent,
    data: {breadcrumb: {alias: 'changePassword'}}
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
