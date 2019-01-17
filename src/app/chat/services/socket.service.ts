import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Observer } from 'rxjs';
import { Message } from '../models/message.model';
import { Event } from '../models/event.model';

import { HttpService } from '../../services/http.service';
import { ApplicationConfig, MY_CONFIG_TOKEN } from '../../app.config';

import * as socketIo from 'socket.io-client';

// const SERVER_URL = 'http://localhost:8080';

@Injectable()
export class SocketService {
    private socket;
    private server_url;

    constructor(
        @Inject(MY_CONFIG_TOKEN) configuration: ApplicationConfig,
    ) {
      this.server_url = configuration.chatUrl;
    }

    public initSocket(): void {
        this.socket = socketIo(this.server_url);
    }

    public send(message: Message): void {
        this.socket.emit('message', message);
    }

    public onMessage(): Observable<Message> {
        return new Observable<Message>(observer => {
            this.socket.on('message', (data: Message) => observer.next(data));
        });
    }

    public onEvent(event: Event): Observable<any> {
        return new Observable<Event>(observer => {
            this.socket.on(event, () => observer.next());
        });
    }
}
