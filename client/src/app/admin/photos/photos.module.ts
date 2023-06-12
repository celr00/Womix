import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PhotosRoutingModule } from './photos-routing.module';
import { PhotosComponent } from './photos.component';
import { CardComponent } from './card/card.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    PhotosComponent,
    CardComponent
  ],
  imports: [
    CommonModule,
    PhotosRoutingModule,
    SharedModule
  ]
})
export class PhotosModule { }
