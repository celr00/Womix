import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions } from '@kolkov/ngx-gallery';
import { ToastrService } from 'ngx-toastr';
import { ConfirmService } from 'src/app/core/services/confirm.service';
import { ProductService } from 'src/app/product/product.service';
import { Modal } from 'src/app/shared/models/modal';
import { Product } from 'src/app/shared/models/product';
import { Photo } from 'src/app/shared/models/service';
import { BreadcrumbService } from 'xng-breadcrumb';

@Component({
  selector: 'app-account-product-detail',
  templateUrl: './account-product-detail.component.html',
  styleUrls: ['./account-product-detail.component.scss']
})
export class AccountProductDetailComponent implements OnInit {
  id: number;
  product: Product = {} as Product;
  galleryOptions: NgxGalleryOptions[] = [];
  galleryImages: NgxGalleryImage[] = [];
  modal: Modal = new Modal;

  constructor(private route: ActivatedRoute, private bcService: BreadcrumbService, private productService: ProductService, private router: Router,
    private toastr: ToastrService, private confirmService: ConfirmService) {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.galleryOptions = [
      {
        imagePercent: 100,
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide,
        preview: true,
        imageSwipe: true,
        thumbnailsSwipe: true,
        previewCloseOnClick: true,
        previewCloseOnEsc: true,
        thumbnailMargin: 0,
        thumbnailsMargin: 0,
        previewKeyboardNavigation: true,
      },
    ];
  }

  ngOnInit(): void {
    this.loadProduct();
  }

  loadProduct() {
    this.productService.getProduct(this.id).subscribe({
      next: product => {
        this.product = product;
        this.bcService.set('@productName', product.name);
        this.galleryImages = this.defineGalleryImages();
      }
    })
  }

  delete() {
    this.modal.title = `Borrar ${this.product.name}`;
    this.modal.message = `¿Confirma querer borrar el producto: '${this.product.name}'?`;
    this.modal.btnOkText = 'Borrar';
    this.confirmService.confirm(this.modal).subscribe({
      next: res => {
        res && this.productService.delete(this.id).subscribe({
          next: () => {
            this.router.navigateByUrl('/account/products/list');
            this.toastr.success('Producto eliminado correctamente.');
          },
        })
      }
    })
  }

  defineGalleryImages(): any[] {
    if (this.product.productPhotos.length === 0) return [];
    const imageUrls = [];
    const photos: Photo[] = [];
    this.product.productPhotos.forEach(x => {
      photos.push(x.photo)
    });
    for (const photo of photos) {
      imageUrls.push({
        small: photo.url,
        medium: photo.url,
        big: photo.url,
      });
    }
    return imageUrls;
  }

  showGallery(): boolean {
    return this.galleryImages.length > 0;
  }

}
