import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MessagesRoutingModule } from './messages-routing.module';
import { MessagesComponent } from './messages.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    MessagesComponent,
  ],
  imports: [
    CommonModule,
    MessagesRoutingModule,
    SharedModule,
    FormsModule,
  ]
})
export class MessagesModule { }
