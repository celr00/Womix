import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JobsRoutingModule } from './jobs-routing.module';
import { JobsComponent } from './jobs.component';
import { SharedModule } from '../shared/shared.module';
import { JobCardComponent } from './job-card/job-card.component';
import { JobInfoComponent } from './job-info/job-info.component';


@NgModule({
  declarations: [
    JobsComponent,
    JobCardComponent,
    JobInfoComponent
  ],
  imports: [
    CommonModule,
    JobsRoutingModule,
    SharedModule,
  ]
})
export class JobsModule { }