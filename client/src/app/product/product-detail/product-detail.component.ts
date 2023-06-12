import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../product.service';
import { Product } from 'src/app/shared/models/product';
import { BreadcrumbService } from 'xng-breadcrumb';
import { UserService } from 'src/app/user/user.service';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from '@kolkov/ngx-gallery';
import { Photo } from 'src/app/shared/models/photo';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  id: number;
  product?: Product;
  galleryOptions: NgxGalleryOptions[] = [];
  galleryImages: NgxGalleryImage[] = [];

  constructor(private route : ActivatedRoute, private productService: ProductService,
    private bcService: BreadcrumbService, private userService: UserService) {
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
        imageAutoPlay: true,
        imageAutoPlayInterval: 5000,
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
        this.bcService.set('@productDetails', product.name);
        this.galleryImages = this.defineGalleryImages();
      },
    })
  }

  private defineGalleryImages(): any[] {
    if (!this.product) return [];
    if (this.product.productPhotos.length === 0) return [];
    const imageUrls = [];
    const photos: Photo[] = [];
    this.product.productPhotos.forEach(x => {
      if (x.photo.visible) photos.push(x.photo)
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
