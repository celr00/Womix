import { Component, OnInit } from '@angular/core';
import { AppUser } from 'src/app/shared/models/app-user';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-account-saved-profiles',
  templateUrl: './account-saved-profiles.component.html',
  styleUrls: ['./account-saved-profiles.component.scss']
})
export class AccountSavedProfilesComponent implements OnInit {
  users: AppUser[] = [];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadSavedProfiles();
  }

  loadSavedProfiles() {
    this.userService.getSavedUsers().subscribe({
      next: (res) => {
        this.users = res;
      }
    })
  }
}
