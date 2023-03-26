import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountProductsNewComponent } from './account-products-new/account-products-new.component';
import { AccountProductsListComponent } from './account-products-list/account-products-list.component';

const routes: Routes = [
  { path: 'new', component: AccountProductsNewComponent },
  {
    path: 'list',
    loadChildren: () => import('./account-products-list/account-products-list.module')
      .then(x => x.AccountProductsListModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountProductsRoutingModule { }
