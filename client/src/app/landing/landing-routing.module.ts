import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LandingComponent } from './landing.component';
import { LoginComponent } from './login/login.component';
import { PreventUnsavedChangesGuard } from './register/prevent-unsaved-changes.guard';

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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LandingRoutingModule { }
