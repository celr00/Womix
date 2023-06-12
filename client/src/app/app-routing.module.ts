import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './account/account.component';
import { NotFoundComponent } from './core/not-found/not-found.component';
import { ServerErrorComponent } from './core/server-error/server-error.component';
import { TestErrorComponent } from './core/test-error/test-error.component';
import { AuthGuard } from './core/guards/auth.guard';
import { DevGuard } from './core/guards/dev.guard';
import { AdminComponent } from './admin/admin.component';
import { AdminGuard } from './core/guards/admin.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./landing/landing.module')
      .then(m => m.LandingModule),
    data: {
      breadcrumb: 'Inicio'
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
      breadcrumb: 'Productos'
    },
      loadChildren: () => import('./product/product.module')
        .then(m => m.ProductModule)
  },
  {
    path: 'services',
    data: {
      breadcrumb: 'Servicios'
    },
    loadChildren: () => import('./services/services.module')
      .then(m => m.ServicesModule)
  },
  {
    path: 'jobs',
    data: {
      breadcrumb: 'Trabajos'
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
    data: {
      breadcrumb: 'Perfil'
    },
    canActivate: [AuthGuard],
    component: AccountComponent,
    loadChildren: () => import('./account/account.module')
      .then(m => m.AccountModule)
  },
  {
    path: 'admin',
    data: {
      breadcrumb: 'Administrador'
    },
    canActivate: [AuthGuard, AdminGuard],
    component: AdminComponent,
    loadChildren: () => import('./admin/admin.module')
      .then(m => m.AdminModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
