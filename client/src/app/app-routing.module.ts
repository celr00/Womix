import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './account/account.component';
import { NotFoundComponent } from './core/not-found/not-found.component';
import { ServerErrorComponent } from './core/server-error/server-error.component';
import { TestErrorComponent } from './core/test-error/test-error.component';
import { AuthGuard } from './core/guards/auth.guard';
import { DevGuard } from './core/guards/dev.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./landing/landing.module')
      .then(m => m.LandingModule),
    data: {
      breadcrumb: 'Home'
    }
  },
  {
    path: 'test-error',
    component: TestErrorComponent,
    canActivate: [ DevGuard ],
  },
  {
    path: 'not-found',
    component: NotFoundComponent,
    canActivate: [ DevGuard ],
  },
  {
    path: 'server-error',
    component: ServerErrorComponent,
    canActivate: [ DevGuard ],
  },
  {
    path: 'products',
    data: {
      breadcrumb: 'Products'
    },
      loadChildren: () => import('./product/product.module')
        .then(m => m.ProductModule)
  },
  {
    path: 'services',
    data: {
      breadcrumb: 'Services'
    },
    loadChildren: () => import('./services/services.module')
      .then(m => m.ServicesModule)
  },
  {
    path: 'jobs',
    data: {
      breadcrumb: 'Jobs'
    },
    loadChildren: () => import('./jobs/jobs.module')
      .then(m => m.JobsModule)
  },
  {
    path: 'user',
    loadChildren: () => import('./user/user.module')
      .then(m => m.UserModule)
  },
  {
    path: 'account',
    canActivate: [AuthGuard],
    component: AccountComponent,
    loadChildren: () => import('./account/account.module')
      .then(m => m.AccountModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
