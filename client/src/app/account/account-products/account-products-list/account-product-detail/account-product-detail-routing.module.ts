import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountProductEditComponent } from './account-product-edit/account-product-edit.component';
import { AccountProductDetailComponent } from './account-product-detail.component';
import { PreventUnsavedChangesGuard } from './account-product-edit/prevent-unsaved-changes.guard';

const routes: Routes = [
  { path: '', component: AccountProductDetailComponent },
  {
    path: 'edit',
    component: AccountProductEditComponent,
    data: {
      breadcrumb: {
        alias: 'editTitle'
      }
    },
    canDeactivate: [PreventUnsavedChangesGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountProductDetailRoutingModule { }
