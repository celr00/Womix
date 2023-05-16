import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Photo } from 'src/app/shared/models/photo';
import { PhotoParams } from 'src/app/shared/models/photo-params';
import { AdminService } from '../admin.service';
import { AccountService } from 'src/app/landing/account.service';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.scss']
})
export class PhotosComponent implements OnInit {
  @ViewChild('search') searchTerm?: ElementRef;
  photos?: Photo[];
  params: PhotoParams;
  totalCount = 0;

  constructor(private adminService: AdminService) {
    this.adminService.resetParams();
    this.params = this.adminService.getParams();
  }

  ngOnInit(): void {
    this.params.pageSize = 30;
    this.adminService.setParams(this.params);
    this.loadPhotos();
  }

  loadPhotos() {
    this.adminService.getAll().subscribe({
      next: response => {
        this.photos = response.data;
        this.totalCount = response.count;
      }
    })
  }

  onPageChanged(event: any) {
    const params = this.adminService.getParams();
    if (params.pageNumber !== event) {
      params.pageNumber = event;
      this.adminService.setParams(params);
      this.params = params;
      this.loadPhotos();
    }
  }

  onVisibilityClick() {
    switch (this.params.visible) {
      case false:
        this.params.visible = true;
        this.adminService.setParams(this.params);
        break;
      case true:
        this.params.visible = false;
        this.adminService.setParams(this.params);
        break;
      default:
        this.params.visible = true;
        this.adminService.setParams(this.params);
        break;
    }
    this.loadPhotos();
  }

  onSearch() {
    const params = this.adminService.getParams();
    params.search = this.searchTerm?.nativeElement.value;
    params.pageNumber = 1;
    this.adminService.setParams(params);
    this.params = params;
    this.loadPhotos();
  }

  onReset() {
    if (this.searchTerm) this.searchTerm.nativeElement.value = '';
    this.params = new PhotoParams();
    this.params.pageSize = 12;
    this.adminService.setParams(this.params);
    this.loadPhotos();
  }

}
