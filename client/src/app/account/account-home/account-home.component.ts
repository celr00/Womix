import { Component, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';
import { PresenceService } from 'src/app/_services/presence.service';
import { AccountService } from 'src/app/landing/account.service';
import { Account } from 'src/app/shared/models/account';
import { AppUser } from 'src/app/shared/models/app-user';

@Component({
  selector: 'app-account-home',
  templateUrl: './account-home.component.html',
  styleUrls: ['./account-home.component.scss']
})
export class AccountHomeComponent implements OnInit {
  user: AppUser = {} as AppUser;
  onlineUsers: string[] = [];
  account: Account = {} as Account;

  constructor(private accountService: AccountService,
    public presenceService: PresenceService) {
      const accountStr = localStorage.getItem('account')!;
      this.account = JSON.parse(accountStr);
  }

  ngOnInit(): void {
    this.loadUser();
    this.loadOnlineUsers();
  }

  loadUser() {
    this.accountService.getUser().subscribe({
      next: user => {
        this.user = user;
      }
    })
  }

  loadOnlineUsers() {
    this.presenceService.onlineUsers$.subscribe({
      next: users => {this.onlineUsers = users;
      }
    })
  }

  togglePresence() {
    if (this.onlineUsers.includes(this.user.userName)) {
      this.presenceService.stopHubConnection();
      this.onlineUsers = this.onlineUsers.filter((x) => x !== this.user.email);
    } else this.presenceService.createHubConnection(this.account);
  }
}
