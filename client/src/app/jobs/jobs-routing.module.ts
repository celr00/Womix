import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JobsComponent } from './jobs.component';

const routes: Routes = [
  {
    path: '',
    component: JobsComponent
  },
  // {
  //   path: ':id',
  //   component: DetailComponent,
  //   data: {
  //     breadcrumb: {
  //       alias: 'servicesDetailPage'
  //     }
  //   }
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JobsRoutingModule { }
