import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountProductsListComponent } from './account-products-list.component';

const routes: Routes = [
  {
    path: '',
    component: AccountProductsListComponent,
    data: {
      breadcrumb: 'Lista'
    },
  },
  {
    path: ':id',
    loadChildren: () => import('./account-product-detail/account-product-detail.module')
      .then(x => x.AccountProductDetailModule),
    data: {
      breadcrumb: {
        alias: 'productName'
      }
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountProductsListRoutingModule { }
