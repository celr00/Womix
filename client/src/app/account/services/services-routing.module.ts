import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewComponent } from './new/new.component';

const routes: Routes = [
  {
    path: 'new',
    component: NewComponent,
    data: {
      breadcrumb: {
        alias: 'newServiceTitle'
      }
    }
  },
  {
    path: 'list',
    loadChildren: () => import('./list/list.module')
      .then(x => x.ListModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServicesRoutingModule { }