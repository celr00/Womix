import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './account/account.component';

const routes: Routes = [
  {path: '', loadChildren: () => import('./landing/landing.module').then(m => m.LandingModule),
  data: {breadcrumb: 'Home'}},
  {
    path: 'products',
      loadChildren: () => import('./product/product.module')
        .then(m => m.ProductModule)
  },
  {
    path: 'services',
      loadChildren: () => import('./services/services.module')
        .then(m => m.ServicesModule)
  },
  {path: 'user', loadChildren: () => import('./user/user.module').then(m => m.UserModule)},
  {
    path: 'account',
    component: AccountComponent,
    loadChildren: () => import('./account/account.module').then(m => m.AccountModule)
  },
  {path: 'messages', loadChildren: () => import('./messages/messages.module').then(m => m.MessagesModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
