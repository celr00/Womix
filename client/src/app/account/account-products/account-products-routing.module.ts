import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountProductsNewComponent } from './account-products-new/account-products-new.component';

const routes: Routes = [
  { path: 'new', component: AccountProductsNewComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountProductsRoutingModule { }
