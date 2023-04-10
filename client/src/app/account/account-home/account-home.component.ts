import { Component, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';
import { PresenceService } from 'src/app/_services/presence.service';
import { AccountService } from 'src/app/landing/account.service';
import { AppUser } from 'src/app/shared/models/app-user';

@Component({
  selector: 'app-account-home',
  templateUrl: './account-home.component.html',
  styleUrls: ['./account-home.component.scss']
})
export class AccountHomeComponent implements OnInit {
  user: AppUser = {} as AppUser;

  constructor(private accountService: AccountService, public presenceService: PresenceService) {
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

  togglePresence() {
    getUsers(this.presenceService.onlineUsers$, this.user.email);

  }



}


async function getUsers(onlineUsers$: Observable<string[]>, email: string) {
  onlineUsers$.subscribe({
    next: users => {
      users.forEach(x => {
        if (x === email) return true;
        else return false;
      })
    }
  })
}
