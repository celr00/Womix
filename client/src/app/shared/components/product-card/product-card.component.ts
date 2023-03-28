import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { FileUploader } from 'ng2-file-upload';
import { environment } from 'src/environments/environment';
import { AccountService } from 'src/app/landing/account.service';
import { ProductService } from 'src/app/product/product.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent {
  @Input() product: Product = {} as Product;


}
