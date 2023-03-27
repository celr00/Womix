import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountProductEditComponent } from './account-product-edit/account-product-edit.component';
import { AccountProductDetailComponent } from './account-product-detail.component';

const routes: Routes = [
  { path: '', component: AccountProductDetailComponent },
  {
    path: 'edit',
    component: AccountProductEditComponent,
    data: {
      breadcrumb: {
        alias: 'editTitle'
      }
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountProductDetailRoutingModule { }
