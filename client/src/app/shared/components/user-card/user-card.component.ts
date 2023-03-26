import { Component, Input } from '@angular/core';
import { AppUser } from '../../models/app-user';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent {
  @Input() user: AppUser = {} as AppUser;

  constructor() {}
}
