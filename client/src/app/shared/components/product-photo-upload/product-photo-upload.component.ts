import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from 'src/app/landing/account.service';
import { ProductService } from 'src/app/product/product.service';
import { environment } from 'src/environments/environment';
import { Product } from '../../models/product';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-photo-upload',
  templateUrl: './product-photo-upload.component.html',
  styleUrls: ['./product-photo-upload.component.scss']
})
export class ProductPhotoUploadComponent implements OnInit {
  @Input() product: Product = {} as Product;
  @Output() sendProduct = new EventEmitter<Product>();
  uploader?: FileUploader;
  hasBaseDropzoneOver = false;
  baseUrl = environment.apiUrl;
  productId: Number;

  constructor(private route: ActivatedRoute, private accountService: AccountService, private productService: ProductService, private toastr: ToastrService) {
    this.productId = Number(this.route.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    this.initializeUploader();
  }

  initializeUploader() {
    const token = this.accountService.getUserToken();
    this.uploader = new FileUploader({
      url: this.baseUrl + 'products/photo/' + this.productId,
      authToken: 'Bearer ' + token,
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1042,
    });

    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    };

    this.uploader.onSuccessItem = (item, response, status, headers) => {
      if (response) {
        const product: Product = JSON.parse(response);
        this.product = product;
        this.sendProduct.emit(product);
      }
    };
  }

  removePhoto(photoId: number) {
    this.productService.deletePhoto(photoId, this.product.id).subscribe({
      next: product => {
        this.product = product;
        this.toastr.success('Photo deleted successfully');
      },
      error: () => {
        this.toastr.error('Failed to delete the photo');
      }
    })
  }

  fileOverBase(e: any) {
    this.hasBaseDropzoneOver = e;
  }
}
