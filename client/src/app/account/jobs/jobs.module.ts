import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JobsRoutingModule } from './jobs-routing.module';
import { JobsComponent } from './jobs.component';
import { NewComponent } from './new/new.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { SavedComponent } from './saved/saved.component';


@NgModule({
  declarations: [
    JobsComponent,
    NewComponent,
    SavedComponent
  ],
  imports: [
    CommonModule,
    JobsRoutingModule,
    SharedModule,
  ],
})
export class JobsModule { }
