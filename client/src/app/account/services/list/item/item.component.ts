import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions } from '@kolkov/ngx-gallery';
import { ToastrService } from 'ngx-toastr';
import { ConfirmService } from 'src/app/core/services/confirm.service';
import { ServicesService } from 'src/app/services/services.service';
import { Modal } from 'src/app/shared/models/modal';
import { Photo, Service } from 'src/app/shared/models/service';
import { BreadcrumbService } from 'xng-breadcrumb';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {
  id: number;
  service: Service = {} as Service;
  galleryOptions: NgxGalleryOptions[] = [];
  galleryImages: NgxGalleryImage[] = [];
  modal: Modal = new Modal;

  constructor(private route: ActivatedRoute, private bcService: BreadcrumbService,
    private serviceService: ServicesService, private router: Router, private toastr: ToastrService,
    private confirmService: ConfirmService) {
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
        this.bcService.set('@serviceNameTitle', service.name);
        this.galleryImages = this.defineGalleryImages();
      }
    })
  }

  delete() {
    this.modal.title = `Eliminar ${this.service.name}`;
    this.modal.message = `Confirma querer eliminar el servicio '${this.service.name}'?`;
    this.modal.btnOkText = 'Eliminar';
    this.confirmService.confirm(this.modal).subscribe({
      next: modal => {
        modal && this.serviceService.delete(this.id).subscribe({
          next: () => {
            this.router.navigateByUrl('/account/services/list');
            this.toastr.success('Servicio eliminado exitosamente');
          },
        })
      }
    })
  }

  defineGalleryImages(): any[] {
    if (this.service.servicePhotos.length === 0) return [];
    const imageUrls = [];
    const photos: Photo[] = [];
    this.service.servicePhotos.forEach(x => {
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
