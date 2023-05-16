import { Component, OnInit } from '@angular/core';
import { Service } from 'src/app/shared/models/service';
import { ServicesService } from '../services.service';
import { ActivatedRoute } from '@angular/router';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from '@kolkov/ngx-gallery';
import { UserService } from 'src/app/user/user.service';
import { BreadcrumbService } from 'xng-breadcrumb';
import { Photo } from 'src/app/shared/models/photo';

@Component({
  // selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  id: number;
  service?: Service;
  galleryOptions: NgxGalleryOptions[] = [];
  galleryImages: NgxGalleryImage[] = [];

  constructor(private route : ActivatedRoute, private serviceService: ServicesService,
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
      },
    ];
  }

  ngOnInit(): void {
    this.loadService();
  }

  loadService() {
    this.serviceService.getById(this.id).subscribe({
      next: service => {
        this.service = service;
        this.bcService.set('@servicesDetailPage', service.name);
        this.galleryImages = this.defineGalleryImages();
      },
    })
  }

  private defineGalleryImages(): any[] {
    if (!this.service) return [];
    if (this.service.servicePhotos.length === 0) return [];
    const imageUrls = [];
    const photos: Photo[] = [];
    this.service.servicePhotos.forEach(x => {
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
