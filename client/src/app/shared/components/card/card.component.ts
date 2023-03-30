import { Component, Input, OnInit } from '@angular/core';
import { Photo, Service } from '../../models/service';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from '@kolkov/ngx-gallery';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() item: any;
  galleryOptions: NgxGalleryOptions[] = [];
  galleryImages: NgxGalleryImage[] = [];
  photos: Photo[] = [];
  @Input() isProduct = true;
  @Input() showSellerName = true;

  constructor() {
    this.galleryOptions = [
      {
        imagePercent: 100,
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide,
        preview: false,
        imageSwipe: true,
        thumbnailsSwipe: true,
        previewCloseOnClick: true,
        previewCloseOnEsc: true,
        thumbnailMargin: 0,
        thumbnailsMargin: 0,
        previewKeyboardNavigation: true,
        thumbnails: false,
        imageAutoPlay: true,
        imageAutoPlayInterval: Math.floor(Math.random() * (10000 - 5000 + 1) + 5000),
        imageArrows: false,
      },
    ];
  }

  ngOnInit(): void {
    this.galleryImages = this.defineGalleryImages(this.isProduct);
  }

  private defineGalleryImages(isProduct: boolean): any[] {
    if (isProduct && this.item.productPhotos.length === 0) return [];
    if (!isProduct && this.item.servicePhotos.length === 0) return [];
    const imageUrls = [];
    const photos: Photo[] = [];
    !isProduct && this.item.servicePhotos.forEach((x:any) => {
      photos.push(x.photo)
    });
    isProduct && this.item.productPhotos.forEach((x:any) => {
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

}
