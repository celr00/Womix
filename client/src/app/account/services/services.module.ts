import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServicesRoutingModule } from './services-routing.module';
import { ServicesComponent } from './services.component';
import { NewComponent } from './new/new.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    ServicesComponent,
    NewComponent,
  ],
  imports: [
    CommonModule,
    ServicesRoutingModule,
    SharedModule,
  ]
})
export class ServicesModule { }
