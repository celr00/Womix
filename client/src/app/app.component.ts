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
    const accountStr = localStorage.getItem('account');
    if (!accountStr) return;
    const account: Account = JSON.parse(accountStr);
    this.accountService.setCurrentAccount(account);
  }

}
