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
        this.socket.emit('setNickname', nickname);
        return Observable.create(observer => {
            observer.next();
            observer.complete();
        });

        // }

        // return this.http.post('/api/authenticate', JSON.stringify({ username: username, password: password }))
        //     .map((response: Response) => {
                // login successful if there's a jwt token in the response
                // let user = response.json();
                // if (user && user.token) {
                //     store user details and jwt token in local storage to keep user logged in between page refreshes
                    // localStorage.setItem('currentUser', JSON.stringify(user));
                // }
            // });
        // return Observable.create(observer => {
        //     localStorage.setItem('currentUser', username);
        //     observer.next();
        //     observer.complete();
        // });
        // localStorage.setItem('currentUser', username)
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }
}