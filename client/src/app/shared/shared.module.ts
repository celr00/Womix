import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatePickerComponent } from './components/date-picker/date-picker.component';
import { TextInputComponent } from './components/text-input/text-input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';



@NgModule({
  declarations: [
    DatePickerComponent,
    TextInputComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    BsDatepickerModule.forRoot(),
    BsDropdownModule.forRoot(),
  ],
  exports: [
    TextInputComponent,
    DatePickerComponent,
    ReactiveFormsModule,
    BsDatepickerModule,
    BsDropdownModule,
  ]
})
export class SharedModule { }
