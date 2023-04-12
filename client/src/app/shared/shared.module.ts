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
import { DetailComponent } from './components/detail/detail.component';
import { ConfirmDialogComponent } from './components/modals/confirm-dialog/confirm-dialog.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ConsentDialogComponent } from './components/modals/consent-dialog/consent-dialog.component';


@NgModule({
  declarations: [
    DatePickerComponent,
    TextInputComponent,
    PagerComponent,
    UserCardComponent,
    CardComponent,
    PhotoUploadComponent,
    DetailComponent,
    ConfirmDialogComponent,
    ConsentDialogComponent,
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
    ModalModule.forRoot(),
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
    DetailComponent,
    ModalModule,
  ]
})
export class SharedModule { }
