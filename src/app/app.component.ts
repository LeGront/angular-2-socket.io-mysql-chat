import {Component} from '@angular/core';
import {IRoom, IMessage, Room, Message} from '../../models/models';
import * as io from "socket.io-client";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.less']
})
export class AppComponent {
    title = 'Лучший чат: Выберите тему';
    nickname: string;
    message: string;
    messages: IMessage[] = [];
    rooms: IRoom[];
    currentRoom: IRoom;
    chatUsers: any[];

    private host: string = window.location.protocol + "//" + window.location.hostname + ":1337";
    socket: SocketIOClient.Socket;

    constructor() {
        let socketUrl = this.host;
        this.socket = io.connect(socketUrl);
    }

    setNickname(nickname) {
        this.nickname = nickname;
        this.socket.emit('setNickname', this.nickname);
        this.getRooms();
        this.getUsers();
    }

    setCurrentRoom(room: IRoom) {
        this.currentRoom = room;
        this.title = 'Лучший чат: ' + this.currentRoom.name;
        this.socket.emit('joinRoom', this.currentRoom);
        this.getMessages();
    }

    sendMessage() {
        let message: IMessage = {
            room_id: this.currentRoom.id,
            user_id: 1,
            nickname: this.nickname,
            type: 1,
            message: this.message
        };
        this.socket.emit('sendMessage', message);
        this.message = '';
    }

    private getMessages() {
        this.socket.emit('getMessages');
        this.socket.on('setMessages', (messages: IMessage[]) => {
            this.messages = messages;
        });
    }

    private getRooms(): void {
        this.socket.emit('getRooms');
        this.socket.on('setRooms', (rooms: IRoom[]) => {
            this.rooms = rooms;
        });
    }

    private getUsers(): void {
        this.socket.emit('getUsers');
        this.socket.on('setUsers', (users) => {
            this.chatUsers = users;
        })
    }
}
//    "start": "ng serve --host 0.0.0.0",