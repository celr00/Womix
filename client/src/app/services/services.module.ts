import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServicesRoutingModule } from './services-routing.module';
import { ServicesComponent } from './services.component';
import { SharedModule } from '../shared/shared.module';
import { DetailComponent } from './detail/detail.component';


@NgModule({
  declarations: [
    ServicesComponent,
    DetailComponent
  ],
  imports: [
    CommonModule,
    ServicesRoutingModule,
    SharedModule,
  ]
})
export class ServicesModule { }
