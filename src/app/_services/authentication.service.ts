import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import * as io from "socket.io-client";
import 'rxjs/add/operator/map'

@Injectable()
export class AuthenticationService {
    private host: string = window.location.protocol + "//" + window.location.hostname + ":1337";
    socket: SocketIOClient.Socket;

    constructor(private http: Http) {
        let socketUrl = this.host;
        this.socket = io.connect(socketUrl);
    }

    login(nickname: string, password: string) {
        this.socket.emit('auth user', nickname, password);
        let observable = new Observable(observer => {
            this.socket.on('auth result', (data) => {
                observer.next(data);
            });
        });
        return observable;
    }
    
    register(nickname: string, password: string){
        this.socket.emit('register new user', nickname, password);
        let observable = new Observable(observer => {
            this.socket.on('registration ok', (data) => {
                observer.next(data);
            });
        });
        return observable;
    }

    sendMessage(message){
        this.socket.emit('add-message', message);
    }

    getMessages() {
        let observable = new Observable(observer => {
            this.socket.on('message', (data) => {
                observer.next(data);
            });
            return () => {
                this.socket.disconnect();
            };
        });
        return observable;
    }


    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }
}