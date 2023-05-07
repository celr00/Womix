import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewComponent } from './new/new.component';
import { PreventUnsavedChangesGuard } from './new/prevent-unsaved-changes.guard';
import { SavedComponent } from './saved/saved.component';

const routes: Routes = [
  {
    path: 'new',
    component: NewComponent,
    data: {
      breadcrumb: 'Nuevo'
    },
    canDeactivate: [PreventUnsavedChangesGuard]
  },
  {
    path: 'list',
    data: {
      breadcrumb: 'Lista'
    },
    loadChildren: () => import('./list/list.module')
      .then(x => x.ListModule)
  },
  {
    path: 'saved',
    component: SavedComponent,
    data: {
      breadcrumb: 'Guardados'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JobsRoutingModule { }
