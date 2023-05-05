import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LandingComponent } from './landing.component';
import { LoginComponent } from './login/login.component';
import { PreventUnsavedChangesGuard } from './register/prevent-unsaved-changes.guard';
import { PasswordResetComponent } from './password-reset/password-reset.component';

const routes: Routes = [
  {
    path: '',
    component: LandingComponent
  },
  {
    path: 'sign-up',
    component: RegisterComponent,
    canDeactivate: [PreventUnsavedChangesGuard]
  },
  {
    path: 'sign-in',
    component: LoginComponent,
  },
  {
    path: 'password_reset/:token',
    data: {
      breadcrumb: 'Recuperación de contraseña'
    },
    component: PasswordResetComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LandingRoutingModule { }
