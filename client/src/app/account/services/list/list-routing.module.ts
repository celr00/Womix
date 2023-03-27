import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list.component';

const routes: Routes = [
  {
    path: '',
    component: ListComponent,
    data: {
      breadcrumb: {
        alias: 'servicesListTitle'
      }
    }
  },
  {
    path: ':id',
    loadChildren: () => import('./item/item.module')
      .then(x => x.ItemModule),
    data: {
      breadcrumb: {
        alias: 'servicesItemTitle'
      }
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListRoutingModule { }
