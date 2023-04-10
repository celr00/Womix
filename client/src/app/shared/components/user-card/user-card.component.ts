import { Component, Input, OnInit } from '@angular/core';
import { AppUser } from '../../models/app-user';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/user/user.service';
import { PresenceService } from 'src/app/_services/presence.service';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent implements OnInit {
  @Input() user: AppUser | undefined;
  @Input() fromAccount: boolean = false;
  isSaved: boolean | undefined;

  constructor(private toastr: ToastrService, private userService: UserService, public presenceService: PresenceService) {}

  ngOnInit(): void {
    this.loadIsSaved();
  }

  loadIsSaved() {
    if(!this.user) return;
    const email = this.user.email;
    this.userService.isSaved(email).subscribe({
      next: (isSaved) => {
        this.isSaved = isSaved;
      }
    })
  }

  clickSave() {
    if(!this.user) return;
    const email = this.user.email;
    this.userService.save(email).subscribe({
      next: () => {
        this.toastr.success('User saved');
      },
      complete: () => {
        this.loadIsSaved();
      }
    })
  }

  clickUnsave() {
    if(!this.user) return;
    const email = this.user.email;
    this.userService.unsave(email).subscribe({
      next: () => {
        this.toastr.success('User unsaved');
      },
      complete: () => {
        this.loadIsSaved();
      }
    })
  }

}
