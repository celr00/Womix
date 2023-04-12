import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ItemComponent } from './item.component';
import { EditComponent } from './edit/edit.component';
import { PreventUnsavedChangesGuard } from './edit/prevent-unsaved-changes.guard';

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
        alias: 'serviceEditTitle'
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
