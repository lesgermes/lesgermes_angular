import { Component, OnInit, ViewChildren, ViewChild, AfterViewInit, QueryList, ElementRef, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MatList, MatListItem } from '@angular/material';

import { Action } from './models/action.model';
import { Event } from './models/event.model';
import { Message } from './models/message.model';
import { User } from './models/user.model';
import { SocketService } from './services/socket.service';
// import { DialogUserComponent } from './dialog-user/dialog-user.component';
// import { DialogUserType } from './dialog-user/dialog-user-type';

import { HttpService } from '../services/http.service';
import { ApplicationConfig, MY_CONFIG_TOKEN } from '../app.config';
import { CurrentUser } from '../models/currentUser';


const AVATAR_URL = 'https://api.adorable.io/avatars/285';

@Component({
  selector: 'tcc-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, AfterViewInit {
  action = Action;
  config: ApplicationConfig;
  user: User;
  messages: Message[] = [];
  messageContent: string;
  ioConnection: any;
//   dialogRef: MatDialogRef<DialogUserComponent> | null;
//   defaultDialogUserParams: any = {
//     disableClose: true,
//     data: {
//       title: 'Welcome',
//       dialogType: DialogUserType.NEW
//     }
//   };

  // getting a reference to the overall list, which is the parent container of the list items
  @ViewChild(MatList, { read: ElementRef }) matList: ElementRef;

  // getting a reference to the items/messages within the list
  @ViewChildren(MatListItem, { read: ElementRef }) matListItems: QueryList<MatListItem>;

  constructor(
    private socketService: SocketService,
    public dialog: MatDialog,
    @Inject(MY_CONFIG_TOKEN) configuration: ApplicationConfig,
    private httpService: HttpService,
  ) {
    this.config = configuration;
   }

  ngOnInit(): void {
    this.initModel();
    // // Using timeout due to https://github.com/angular/angular/issues/14748
    // setTimeout(() => {
    //   this.openUserPopup(this.defaultDialogUserParams);
    // }, 0);
  }

  ngAfterViewInit(): void {
    // subscribing to any changes in the list of items / messages
    this.matListItems.changes.subscribe(elements => {
      this.scrollToBottom();
    });
  }

  // auto-scroll fix: inspired by this stack overflow post
  // https://stackoverflow.com/questions/35232731/angular2-scroll-to-bottom-chat-style
  private scrollToBottom(): void {
    try {
      this.matList.nativeElement.scrollTop = this.matList.nativeElement.scrollHeight;
    } catch (err) {
    }
  }

  private initModel(): void {
    this.httpService.get(this.config.apiEndpoint + "/user")
    .then(
      (data: CurrentUser) => {
        console.log(data);
        this.user = {
          id: data.id,
          avatar: data.profile_image.base_url + data.profile_image.image,
          name: data.username
        };
        this.initIoConnection();
        this.sendNotification(this.user, Action.JOINED);
      },
      // error => this.error = error.message
    );
  }

  private initIoConnection(): void {
    this.socketService.initSocket();

    this.ioConnection = this.socketService.onMessage()
      .subscribe((message: Message) => {
        this.messages.push(message);
      });


    this.socketService.onEvent(Event.CONNECT)
      .subscribe(() => {
        console.log('connected');
      });

    this.socketService.onEvent(Event.DISCONNECT)
      .subscribe(() => {
        console.log('disconnected');
      });
  }

  private getRandomId(): number {
    return Math.floor(Math.random() * (1000000)) + 1;
  }

//   public onClickUserInfo() {
//     this.openUserPopup({
//       data: {
//         username: this.user.name,
//         title: 'Edit Details',
//         dialogType: DialogUserType.EDIT
//       }
//     });
//   }

//   private openUserPopup(params): void {
//     this.dialogRef = this.dialog.open(DialogUserComponent, params);
//     this.dialogRef.afterClosed().subscribe(paramsDialog => {
//       if (!paramsDialog) {
//         return;
//       }

//       this.user.name = paramsDialog.username;
//       if (paramsDialog.dialogType === DialogUserType.NEW) {
//         this.initIoConnection();
//         this.sendNotification(paramsDialog, Action.JOINED);
//       } else if (paramsDialog.dialogType === DialogUserType.EDIT) {
//         this.sendNotification(paramsDialog, Action.RENAME);
//       }
//     });
//   }

  public sendMessage(message: string): void {
    if (!message) {
      return;
    }

    this.socketService.send({
      from: this.user,
      content: message
    });
    this.messageContent = null;
  }

  public sendNotification(params: any, action: Action): void {
    let message: Message;

    if (action === Action.JOINED) {
      message = {
        from: this.user,
        action: action
      }
    } else if (action === Action.RENAME) {
      message = {
        action: action,
        content: {
          username: this.user.name,
          previousUsername: params.previousUsername
        }
      };
    }

    this.socketService.send(message);
  }
}
