import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  @Input() item: any;
  @Input() isProduct = true;
  @Input() fromAccount = false;
  url: string = '';
  vendor: string = '';

  constructor() {

  }

  ngOnInit(): void {
    if (this.isProduct) {
      this.url = `/user/${this.item.userProduct.userId}`;
      this.vendor = `${this.item.userProduct.user.firstName} ${this.item.userProduct.user.lastName}`
    }
    if (!this.isProduct) {
      this.url = `/user/${this.item.userService.userId}`;
      this.vendor = `${this.item.userService.user.firstName} ${this.item.userService.user.lastName}`
    }
  }


}
