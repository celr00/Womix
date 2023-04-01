import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandingRoutingModule } from './landing-routing.module';
import { LandingComponent } from './landing.component';
import { RegisterComponent } from './register/register.component';
import { CoreModule } from '../core/core.module';
import { SharedModule } from '../shared/shared.module';
import { LoginComponent } from './login/login.component';
import { FooterComponent } from './footer/footer.component';


@NgModule({
  declarations: [
    LandingComponent,
    RegisterComponent,
    LoginComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    LandingRoutingModule,
    CoreModule,
    SharedModule
  ]
})
export class LandingModule { }
