import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandingRoutingModule } from './landing-routing.module';
import { LandingComponent } from './landing.component';
import { RegisterComponent } from './register/register.component';
import { CoreModule } from '../core/core.module';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    LandingComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    LandingRoutingModule,
    CoreModule,
    SharedModule
  ]
})
export class LandingModule { }
