import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountServicesNewComponent } from './account-services-new/account-services-new.component';
import { AccountServicesListComponent } from './account-services-list/account-services-list.component';

const routes: Routes = [
  { path: 'new', component: AccountServicesNewComponent },
  { path: 'list', component: AccountServicesListComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountServicesRoutingModule { }
