import { Component, OnInit } from '@angular/core';
import { AccountService } from '../landing/account.service';
import { AppUser } from '../shared/models/app-user';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
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
        console.log(user);

      }
    })
  }

}
