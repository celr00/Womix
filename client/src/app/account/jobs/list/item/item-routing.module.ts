import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PreventUnsavedChangesGuard } from './edit/prevent-unsaved-changes.guard';
import { EditComponent } from './edit/edit.component';
import { ItemComponent } from './item.component';

const routes: Routes = [
  {
    path: '',
    component: ItemComponent
  },
  {
    path: 'edit',
    component: EditComponent,
    data: {
      breadcrumb: {
        alias: 'jobEditItemBreadCrumbTitle'
      }
    },
    canDeactivate: [PreventUnsavedChangesGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ItemRoutingModule { }
