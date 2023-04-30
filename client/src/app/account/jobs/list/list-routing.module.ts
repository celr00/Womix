import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list.component';

const routes: Routes = [
  {
    path: '',
    component: ListComponent,
    data: {
      breadcrumb: 'Mis trabajos'
    }
  },
  {
    path: ':id',
    loadChildren: () => import('./item/item.module')
      .then(x => x.ItemModule),
    data: {
      breadcrumb: {
        alias: 'jobItemComponentBreadcrumbTitle'
      }
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListRoutingModule { }
