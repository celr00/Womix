import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountProductsNewComponent } from './account-products-new/account-products-new.component';
import { PreventUnsavedChangesGuard } from './account-products-new/prevent-unsaved-changes.guard';

const routes: Routes = [
  {
    path: 'new',
    component: AccountProductsNewComponent,
    data: {
      breadcrumb: {
        alias: 'newProductTitle'
      }
    },
    canDeactivate: [PreventUnsavedChangesGuard]
  },
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
