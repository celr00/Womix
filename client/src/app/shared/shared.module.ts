import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatePickerComponent } from './components/date-picker/date-picker.component';
import { TextInputComponent } from './components/text-input/text-input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { PagerComponent } from './pager/pager.component';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { UserCardComponent } from './components/user-card/user-card.component';
import { NgxGalleryModule } from '@kolkov/ngx-gallery';
import { FileUploadModule } from 'ng2-file-upload';
import { CardComponent } from './components/card/card.component';
import { PhotoUploadComponent } from './components/photo-upload/photo-upload.component';



@NgModule({
  declarations: [
    DatePickerComponent,
    TextInputComponent,
    PagerComponent,
    UserCardComponent,
    CardComponent,
    PhotoUploadComponent,
  ],
  imports: [
    CommonModule,
    PaginationModule.forRoot(),
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    BsDatepickerModule.forRoot(),
    BsDropdownModule.forRoot(),
    FileUploadModule,
    NgxGalleryModule,
  ],
  exports: [
    TextInputComponent,
    DatePickerComponent,
    ReactiveFormsModule,
    BsDatepickerModule,
    BsDropdownModule,
    PagerComponent,
    PaginationModule,
    UserCardComponent,
    FileUploadModule,
    NgxGalleryModule,
    CardComponent,
    PhotoUploadComponent,
  ]
})
export class SharedModule { }
