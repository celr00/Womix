import { Component, Input } from '@angular/core';
import { User } from '../../models/job';
import { PresenceService } from 'src/app/_services/presence.service';

@Component({
  selector: 'app-user-card-compact',
  templateUrl: './user-card-compact.component.html',
  styleUrls: ['./user-card-compact.component.scss']
})
export class UserCardCompactComponent {
  @Input() user: User = {} as User;

  constructor(public presenceService: PresenceService) {}
}
