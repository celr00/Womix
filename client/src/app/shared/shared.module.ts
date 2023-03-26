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
import { ProductModule } from '../product/product.module';
import { UserModule } from '../user/user.module';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { UserCardComponent } from './components/user-card/user-card.component';



@NgModule({
  declarations: [
    DatePickerComponent,
    TextInputComponent,
    PagerComponent,
    ProductCardComponent,
    UserCardComponent
  ],
  imports: [
    CommonModule,
    PaginationModule.forRoot(),
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
    PagerComponent,
    PaginationModule,
    ProductCardComponent,
    UserCardComponent,
  ]
})
export class SharedModule { }
