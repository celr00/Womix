import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AccountEditComponent} from './account-edit/account-edit.component';
import { AccountHomeComponent } from './account-home/account-home.component';
import { AccountChangePasswordComponent } from './account-change-password/account-change-password.component';
import { AccountSavedProfilesComponent } from './account-saved-profiles/account-saved-profiles.component';
import { AccountProductsComponent } from './account-products/account-products.component';
import { ServicesComponent } from './services/services.component';
import { MessagesComponent } from './messages/messages.component';
import { PreventUnsavedChangesPasswordGuard } from './account-change-password/prevent-unsaved-changes-password.guard';
import { PreventUnsavedChangesAccountGuard } from './account-edit/prevent-unsaved-changes-account.guard';
import { JobsComponent } from './jobs/jobs.component';
import { AuthGuard } from '../core/guards/auth.guard';

const routes: Routes = [
  {
    path: 'summary',
    data: {
      breadcrumb: {
        alias: 'userName'
      }
    },
    canActivate: [AuthGuard],
    component: AccountHomeComponent
  },
  {
    path: 'edit',
    component: AccountEditComponent,
    data: {
      breadcrumb: 'Editar perfil'
    },
    canDeactivate: [PreventUnsavedChangesAccountGuard]
  },
  {
    path: 'products',
    data: {
      breadcrumb: 'Productos'
    },
    component: AccountProductsComponent,
    loadChildren: () =>
      import('./account-products/account-products.module')
        .then(x => x.AccountProductsModule),
  },
  {
    path: 'services',
    data: {
      breadcrumb: 'Servicios'
    },
    component: ServicesComponent,
    loadChildren: () =>
      import('./services/services.module')
        .then(x => x.ServicesModule)
  },
  {
    path: 'jobs',
    data: {
      breadcrumb: 'Trabajos'
    },
    component: JobsComponent,
    loadChildren: () =>
      import('./jobs/jobs.module')
        .then(x => x.JobsModule)
  },
  {
    path: 'messages/:username',
    component: MessagesComponent,
    loadChildren: () =>
      import('./messages/messages.module')
        .then(x => x.MessagesModule)
  },
  { path: 'saved-profiles', component: AccountSavedProfilesComponent },
  {
    path: 'change-password',
    component: AccountChangePasswordComponent,
    data: {
      breadcrumb: {
        alias: 'changePassword'
      }
    },
    canDeactivate: [PreventUnsavedChangesPasswordGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountRoutingModule {}
