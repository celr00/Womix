import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ItemRoutingModule } from './item-routing.module';
import { ItemComponent } from './item.component';
import { EditComponent } from './edit/edit.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    ItemComponent,
    EditComponent
  ],
  imports: [
    CommonModule,
    ItemRoutingModule,
    SharedModule,
  ]
})
export class ItemModule { }
