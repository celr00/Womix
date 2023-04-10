import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MessageService } from 'src/app/_services/message.service';
import { PresenceService } from 'src/app/_services/presence.service';
import { Account } from 'src/app/shared/models/account';
import { AppUser } from 'src/app/shared/models/app-user';
import { Message } from 'src/app/shared/models/message';
import { UserService } from 'src/app/user/user.service';
import { BreadcrumbService } from 'xng-breadcrumb';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit, OnDestroy {
  @ViewChild('messageForm') messageForm?: NgForm;
  account: Account;
  recipientEmail: string;
  messageContent = '';
  loading = false;
  recipient?: AppUser;

  constructor(public messageService: MessageService, private route: ActivatedRoute,
    public presenceService: PresenceService, private bcService: BreadcrumbService, private userService: UserService,
    private toastr: ToastrService) {
    const accountString = localStorage.getItem('account');
    this.account = JSON.parse(accountString!);
    this.recipientEmail = this.route.snapshot.paramMap.get('username')!;
  }

  ngOnInit(): void {
    this.messageService.createHubConnection(this.account, this.recipientEmail);
    this.loadRecipient();
  }

  loadRecipient() {
    this.userService.getUserByEmail(this.recipientEmail).subscribe({
      next: recipient => this.recipient = recipient
    })
  }

  ngOnDestroy(): void {
    this.messageService.stopHubConnection();
  }

  sendMessage() {
    if (!this.recipientEmail) return;
    this.loading = true;
    this.messageService.sendMessage(this.recipientEmail, this.messageContent).then(() => {
      this.messageForm?.reset();
    }).finally(() => this.loading = false);
  }

  deleteMessage(messageId: number) {
    this.messageService.deleteMessage(messageId).subscribe({
      next: () => this.toastr.success('Message deleted'),
      complete: () => this.ngOnInit()
    })

  }

  isMyChat(message: Message): boolean {
    return message.recipientUsername === this.recipientEmail;
  }

}
