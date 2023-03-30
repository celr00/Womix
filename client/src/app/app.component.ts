import { Component, OnInit } from '@angular/core';
import { AccountService } from './landing/account.service';
import { Account } from './shared/models/account';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'client';

  constructor(private accountService: AccountService) {}

  ngOnInit(): void {
    this.loadCurrentUser();
  }

  loadCurrentUser() {
    const account: Account = JSON.parse(localStorage.getItem('account')!);
    this.accountService.loadCurrentUser(account.token).subscribe();
  }

}
