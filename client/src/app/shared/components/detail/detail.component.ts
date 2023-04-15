import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  @Input() item: any;
  @Input() type = 'product';
  @Input() fromAccount = false;
  url: string = '';
  vendor: string = '';

  constructor() {

  }

  ngOnInit(): void {
    switch (this.type) {
      case 'product':
        this.url = `/user/${this.item.userProduct.userId}`;
        this.vendor = `${this.item.userProduct.user.firstName} ${this.item.userProduct.user.lastName}`
        break;
      case 'service':
        this.url = `/user/${this.item.userService.userId}`;
        this.vendor = `${this.item.userService.user.firstName} ${this.item.userService.user.lastName}`
        break;
      case 'job':

        break;
      default:
        break;
    }
  }


}
