import { Component, Input } from '@angular/core';
import { Photo } from 'src/app/shared/models/photo';
import { AdminService } from '../../admin.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'photo-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  @Input() photo?: Photo;

  constructor(private adminService: AdminService, private toastr: ToastrService) {}

  onChangeVisibilityClick() {
    if (!this.photo) return;
    this.adminService.changePhotoVisibility(this.photo.id).subscribe({
      next: res => {
        this.photo = res;
        this.toastr.success('Visibilidad de la foto cambiada correctamente');
      }
    })
  }
}
