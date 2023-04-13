import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JobsRoutingModule } from './jobs-routing.module';
import { JobsComponent } from './jobs.component';
import { NewComponent } from './new/new.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    JobsComponent,
    NewComponent
  ],
  imports: [
    CommonModule,
    JobsRoutingModule,
    SharedModule,
  ],
})
export class JobsModule { }
