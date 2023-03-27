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
import { ProductCardComponent } from './components/product-card/product-card.component';
import { UserCardComponent } from './components/user-card/user-card.component';
import { NgxGalleryModule } from '@kolkov/ngx-gallery';
import { FileUploadModule } from 'ng2-file-upload';
import { ProductPhotoUploadComponent } from './components/product-photo-upload/product-photo-upload.component';



@NgModule({
  declarations: [
    DatePickerComponent,
    TextInputComponent,
    PagerComponent,
    ProductCardComponent,
    UserCardComponent,
    ProductPhotoUploadComponent
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
    ProductCardComponent,
    UserCardComponent,
    FileUploadModule,
    NgxGalleryModule,
    ProductPhotoUploadComponent,
  ]
})
export class SharedModule { }
