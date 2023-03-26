import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/landing/account.service';
import { AppUser } from 'src/app/shared/models/app-user';

@Component({
  selector: 'app-account-home',
  templateUrl: './account-home.component.html',
  styleUrls: ['./account-home.component.scss']
})
export class AccountHomeComponent implements OnInit {
  user: AppUser = {} as AppUser;

  constructor(private accountService: AccountService) {
  }

  ngOnInit(): void {
    this.loadUser();
  }

  loadUser() {
    this.accountService.getUser().subscribe({
      next: user => {
        this.user = user;
      }
    })
  }

}
