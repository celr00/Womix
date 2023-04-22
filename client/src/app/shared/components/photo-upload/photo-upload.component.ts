import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from 'src/app/landing/account.service';
import { ProductService } from 'src/app/product/product.service';
import { environment } from 'src/environments/environment';
import { Product } from '../../models/product';
import { ActivatedRoute } from '@angular/router';
import { Photo, Service } from '../../models/service';
import { ServicesService } from 'src/app/services/services.service';
import { UserEntity } from '../../models/app-user-entity';

@Component({
  selector: 'app-photo-upload',
  templateUrl: './photo-upload.component.html',
  styleUrls: ['./photo-upload.component.scss']
})
export class PhotoUploadComponent implements OnInit {
  @Input() object: any;
  @Output() send = new EventEmitter<any>();
  @Input() controller: string = '';
  @Input() photos: Photo[] = [];
  @Input() userId?: number;
  uploader?: FileUploader;
  hasBaseDropzoneOver = false;
  baseUrl = environment.apiUrl;
  id: Number;
  url = '';

  constructor(private route: ActivatedRoute, private accountService: AccountService,
    private productService: ProductService, private toastr: ToastrService,
    private serviceService: ServicesService) {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    switch (this.controller) {
      case "products":
        this.url = `${this.controller}/photo/${this.id}`;
        break;
      case "services":
        this.url = `${this.controller}/photo/${this.id}`;
        break;
      case "account":
        this.url = `${this.controller}/photo/${this.userId}`;
        break;
      default:
        break;
    }
    this.initializeUploader();
  }

  initializeUploader() {
    const token = this.accountService.getAccountToken();
    this.uploader = new FileUploader({
      url: this.baseUrl + this.url,
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
        switch (this.controller) {
          case "services":
            const service: Service = JSON.parse(response);
            this.object = service;
            this.send.emit(this.object);
            this.photos = [];
            service.servicePhotos.forEach(x => {
              this.photos.push(x.photo);
            });
            break;
          case "products":
            const product: Product = JSON.parse(response);
            this.object = product;
            this.send.emit(this.object);
            this.photos = [];
            product.productPhotos.forEach(x => {
              this.photos.push(x.photo);
            });
            break;
          case "account":
            const user: UserEntity = JSON.parse(response);
            this.object = user;
            this.send.emit(this.object);
            this.photos = [];
            this.photos.push(user.appUserPhoto.photo);
            break;
          default:
            break;
        }
      }
    };
  }

  delete(photoId: number) {
    switch (this.controller) {
      case "services":
        this.serviceService.deletePhoto(photoId, +this.id).subscribe({
          next: service => {
            this.object = service;
            this.photos = [];
            service.servicePhotos.forEach(x => {
              this.photos.push(x.photo)
            });
            this.send.emit(service);
            this.toastr.success('Photo deleted successfully');
          },
        })
        break;
      case "products":
        this.productService.deletePhoto(photoId, +this.id).subscribe({
          next: product => {
            this.object = product;
            this.photos = [];
            product.productPhotos.forEach(x => {
              this.photos.push(x.photo)
            });
            this.send.emit(product);
            this.toastr.success('Photo deleted successfully');
          },
        })
        break;
      case "account":
        this.accountService.removePhoto(this.userId!).subscribe({
          next: () => {
            this.photos = [];
            this.toastr.success('Photo deleted successfully');
          },
        })
        break;
      default:
        break;
    }
  }

  fileOverBase(e: any) {
    this.hasBaseDropzoneOver = e;
  }
}
