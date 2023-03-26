import { Component } from '@angular/core';
import { AccountService } from 'src/app/landing/account.service';

@Component({
  selector: 'app-account-nav',
  templateUrl: './account-nav.component.html',
  styleUrls: ['./account-nav.component.scss']
})
export class AccountNavComponent {

  constructor(public accountService: AccountService){}

}
