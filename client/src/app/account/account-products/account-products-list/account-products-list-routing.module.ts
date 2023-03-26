import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountProductDetailComponent } from './account-product-detail/account-product-detail.component';
import { AccountProductsListComponent } from './account-products-list.component';

const routes: Routes = [
  { path: '', component: AccountProductsListComponent },
  { path: ':id', component: AccountProductDetailComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountProductsListRoutingModule { }
